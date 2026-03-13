---
title: 我们如何在一周内用 AI 重建 Next.js
date: '2026-02-24T00:00:00.000Z'
sourceUrl: https://blog.cloudflare.com/vinext/
lang: zh
---

上周，一个工程师和一个 AI 模型从零开始重建了最流行的前端框架。结果 vinext（发音"vee-next"）是 Next.js 的直接替代品，构建在 Vite 之上，可以一键部署到 Cloudflare Workers。早期基准测试显示，它构建生产应用的速度快达 4 倍，客户端打包体积小 57%。而且已经有客户在生产环境中运行它。

整个过程花费约 1,100 美元的 token。

## Next.js 部署问题

Next.js 是最流行的 React 框架。数百万开发者使用它。它为生产网络的很大一部分提供动力，而且理由充分。开发者体验是一流的。

但在更广泛的 serverless 生态系统中使用时，Next.js 存在部署问题。工具完全是定制的：Next.js 在 Turbopack 上投入了大量资金，但如果要将其部署到 Cloudflare、Netlify 或 AWS Lambda，你需要获取构建输出并将其重塑为目标平台可以实际运行的东西。

如果你在想："OpenNext 不就是做这个的吗？"你是对的。这正是 OpenNext 要解决的问题。包括 Cloudflare 在内的多家提供商在 OpenNext 上投入了大量工程精力。它有效，但很快就会受到限制，变成打地鼠游戏。

建立在 Next.js 输出之上已被证明是一种困难和脆弱的方法。因为 OpenNext 需要对 Next.js 的构建输出进行反向工程，这导致版本之间不可预测的变化，需要大量工作来纠正。

Next.js 一直在开发一级适配器 API，我们一直在与他们合作。这仍然是早期工作，但即使有适配器，你仍然建立在定制的 Turbopack 工具链之上。适配器只覆盖构建和部署。在开发过程中，next dev 专门在 Node.js 中运行，没有办法插入不同的运行时。如果你的应用使用平台特定的 API（如 Durable Objects、KV 或 AI 绑定，你不能在开发中测试该代码，需要变通方法。

## 介绍 vinext

如果我们不是适配 Next.js 输出，而是在 Vite 上直接重新实现 Next.js API 表面？Vite 是 Next.js 之外大多数前端生态系统使用的构建工具，为 Astro、SvelteKit、Nuxt 和 Remix 等框架提供动力。一个干净的重新实现，而不仅仅是包装器或适配器。我们说实话没想到会成功。但现在是 2026 年，构建软件的成本已经完全改变了。

我们取得的进展比预期的要多得多。

```bash
npm install vinext
```

在脚本中将 `next` 替换为 `vinext`，其他一切保持不变。你现有的 `app/`、`pages/` 和 `next.config.js` 照常工作。

```bash
vinext dev # 带 HMR 的开发服务器
vinext build # 生产构建
vinext build && vinext deploy # 构建并部署到 Cloudflare Workers
```

这不是围绕 Next.js 和 Turbopack 输出的包装器。它是 API 表面的替代实现：路由、服务器渲染、React Server 组件、服务器操作、缓存、中间件。所有这些都构建在 Vite 之上作为插件。最重要的是，由于 Vite Environment API，Vite 输出可以在任何平台上运行。

## 数字

早期基准测试很有希望。我们将 vinext 与使用共享 33 路由 App Router 应用的 Next.js 16 进行比较。两个框架做相同的工作：编译、打包和准备服务器渲染路由。我们在 Next.js 构建中禁用了 TypeScript 类型检查和 ESLint（Vite 在构建期间不运行这些），并使用 force-dynamic 以便 Next.js 不会在预渲染静态路由上花费额外时间，这会不公平地减慢它的数字。目标只测量打包器和编译速度，其他没有。基准测试在 GitHub CI 上每次合并到 main 时运行。

**生产构建时间：**

| 框架 | 平均值 | 与 Next.js 对比 |
|------|--------|-----------------|
| Next.js 16.1.6 (Turbopack) | 7.38s | 基准 |
| vinext (Vite 7 / Rollup) | 4.64s | 1.6 倍快 |
| vinext (Vite 8 / Rolldown) | 1.67s | 4.4 倍快 |

**客户端打包大小（gzipped）：**

| 框架 | Gzipped | 与 Next.js 对比 |
|------|---------|-----------------|
| Next.js 16.1.6 | 168.9 KB | 基准 |
| vinext (Rollup) | 74.0 KB | 小 56% |
| vinext (Rolldown) | 72.9 KB | 小 57% |

## 部署到 Cloudflare Workers

vinext 以 Cloudflare Workers 为第一个部署目标。一个命令让你从源代码到运行中的 Worker：

```bash
vinext deploy
```

这处理一切：构建应用、自动生成 Worker 配置并部署。App Router 和 Pages Router 都能在 Workers 上运行，具有完整的客户端 hydration、交互式组件、客户端导航、React 状态。

对于生产缓存，vinext 包含一个 Cloudflare KV 缓存处理程序，为你提供开箱即用的 ISR（增量静态再生成）：

```javascript
import { KVCacheHandler } from "vinext/cloudflare";
import { setCacheHandler } from "next/cache";
setCacheHandler(new KVCacheHandler(env.MY_KV_NAMESPACE));
```

## 状态：实验性

我们要明确：vinext 是实验性的。它甚至不到一周，还没有在有意义的规模上进行实战测试。如果你在评估它用于生产应用，请谨慎行事。

也就是说，测试套件很广泛：超过 1,700 个 Vitest 测试和 380 个 Playwright E2E 测试，包括直接从 Next.js 测试套件和 OpenNext 的 Cloudflare 一致性套件移植的测试。我们已经验证了它针对 Next.js App Router Playground。覆盖率是 Next.js 16 API 表面的 94%。来自真实世界客户的早期结果令人鼓舞。我们一直在与 National Design Studio 合作，他们是旨在实现每个政府界面现代化的团队，他们的一个测试站点 CIO.gov 已经在生产中运行 vinefix，在构建时间和打包大小方面有意义的改进。

## 接受 Next.js 挑战，但这次用 AI

这样的项目通常需要一组工程师几个月甚至几年。各公司的多个团队曾尝试过，范围只是巨大。我们在 Cloudflare 尝试过一次！两个路由器、33+ 个模块垫片、服务器渲染管道、RSC 流式传输、文件系统路由、中间件、缓存、静态导出。有一个原因是没有人成功。

这次我们一周内完成了。一个工程师（技术上说是工程经理）指挥 AI。

第一个提交在 2 月 13 日落地。到那天晚上结束时，Pages Router 和 App Router 都有了基本的 SSR，以及中间件、服务器操作和流式传输。到第二天下午，App Router Playground 渲染了 11 条路线中的 10 条。到第三天，vinext deploy 可以将应用运送到具有完整客户端 hydration 的 Cloudflare RSS。剩下的周末是强化：修复边缘情况、扩展测试套件、将 API 覆盖率带到 94%。

与之前的尝试有什么不同？AI 变得更好了。好得多。

## 为什么这个问题是为 AI 量身定做的

不是每个项目都会这样。这个项目这样做是因为几件事在正确的时间恰好对齐。

**Next.js 规范完善。** 它有广泛的文档、庞大的用户群，以及多年的 Stack Overflow 答案和教程。API 表面遍布训练数据。当要求 Claude 实现 getServerSideProps 或解释 useRouter 如何工作时，它不会幻觉。它知道 Next 是如何工作的。

**Next.js 有详细的测试套件。** Next.js 仓库包含数千个 E2E 测试，涵盖每个功能 和边缘情况。我们直接从他们的套件移植测试（你可以在代码中看到归属）。这给了我们一个可以机械验证的规范。

**Vite 是优秀的基础。** Vite 处理前端工具的硬部分：快速 HMR、原生 ESM、干净的插件 API、生产打包。我们不需要构建打包器。我们只需要教它说 Next.js。@vitejs/plugin-rsc 仍然为时过早，但它给了我们 React Server 组件支持，而不必从头构建 RSC 实现。

**模型跟上了。** 我们不认为这在几个月前甚至可能。早期的模型无法在如此规模的代码库上保持连贯性。新模型可以将整个架构保存在上下文中，推理模块如何交互，并经常产生正确的代码以保持势头。

所有这些必须同时为真。文档完善的目标 API、全面的测试套件、坚实的构建基础，以及一个实际上可以处理复杂性的模型。拿走其中任何一个，效果就不会这么好。

## 我们实际上是如何构建它的

vinext 中的几乎每一行代码都是 AI 写的。但这里有更重要的一点：每一行都通过了与人类编写代码相同的质量门。该项目有 1,700+ 个 Vitest 测试、380 个 Playwright E2E 测试，通过 tsgo 进行完整的 TypeScript 类型检查，以及通过 oxlint 进行 linting。持续集成在每个拉取请求上运行所有这些。建立一组好的护栏对于让 AI 在代码库中高效工作至关重要。

这个过程始于一个计划。我花了几个小时在 OpenCode 中与 Claude 来回定义架构：先构建什么、以什么顺序、使用哪些抽象。那个计划成为了北极星。从那里，工作流程很简单：

1. 定义一个任务（"实现 next/navigation 垫片，包含 usePathname、useSearchParams、useRouter"）
2. 让 AI 编写实现和测试
3. 运行测试套件
4. 如果测试通过，合并。如果没有，给 AI 错误输出并让它迭代
5. 重复

我们还为代码审查连接了 AI 代理。当打开拉取请求时，一个代理审查它。当审查评论回来时，另一个代理解决它们。反馈循环大部分是自动化的。

并不总是完美地工作。有些拉取请求就是错的。AI 会自信地实现看起来正确但不符合实际 Next.js 行为的东西。我必须定期纠正方向。架构决策、优先级、知道 AI 什么时候走进死胡同：这些都是我。当给 AI 好的方向、好的上下文和好的护栏时，它可以非常高效。但人类仍然必须掌舵。

## 这对软件意味着什么

为什么我们在堆栈中有这么多层？这个项目迫使我深入思考这个问题。并考虑 AI 如何影响答案。

软件中的大多数抽象存在是因为人类需要帮助。我们无法将整个系统保存在脑海中，所以我们构建层来为我们管理复杂性。每一层使下一个人的工作更容易。这就是你最终得到层层叠加的框架、包装库和数千行粘合代码的方式。

AI 没有同样的限制。它可以将整个系统保存在上下文中，只编写代码。它不需要中间框架来保持组织。它只需要一个规范和一个基础。

目前还不清楚哪些抽象是真正基础的，哪些只是人类认知的拐杖。这条线在接下来几年会改变很多。但 vinext 是一个数据点。我们获取了一个 API 契约、一个构建工具和一个 AI 模型，AI 写了中间的一切。不需要中间框架。我们认为这种模式会在很多软件中重复。多年来我们建立的层不会都存活下来。