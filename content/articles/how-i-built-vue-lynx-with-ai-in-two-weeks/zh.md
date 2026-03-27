---
title: 我如何在两周内用 AI 构建 Vue Lynx
date: '2026-03-27T23:40:18.349Z'
sourceUrl: 'https://x.com/Huxpro/status/2036993665965416601?s=20'
lang: zh
category: 技术
---
Vue 开发者多年来一直想要原生支持。那条 ["Vue + Lynx = Vue Native"](https://x.com/danielkelly_io/status/1899746975588737407) 推文获得了 1.7k 点赞。我们仓库的 [Vue 集成 issue](https://github.com/lynx-family/lynx/issues/193) 达到了 1,600 个 upvote——我们迄今为止最大的功能请求。需求很明确；问题在于带宽。

当 [Lynx](https://lynxjs.org/) 一年前开源时，[Evan You](https://x.com/youyuxi/status/1898663514581168173) 和 [Rich Harris](https://x.com/Huxpro/status/1927276405328429259) 都为之欢呼，但生产质量框架集成总是需要认真的工程带宽。然后像 [Vercel 的 web streams 重写](https://vercel.com/blog/we-ralph-wiggumed-webstreams-to-make-them-10x-faster) 和 [Cloudflare 的 ViNext](https://blog.cloudflare.com/vinext/) 这样的项目展示了配备 AI 的独立工程师如何可以交付原本需要一个团队才能完成的工作。这改变了我的算法。

Vue 已经有了基础：一个成熟的自定义渲染器 API。我花了一个周末。约 1,400 美元、37 小时的黑客松。它从一个设计探索开始："Vue 的自定义渲染器能与双线程代码分割配合使用吗，如果能，怎么做？"到周日凌晨 3 点，我正在和 Claude 调试"点击增量不工作"。到周一早上，我有了[一个可用的 TodoMVC](https://x.com/Huxpro/status/2028672358912086524)。我忍不住发了一条微妙的 subtweet，它立刻在 X 上火了。

## 介绍 Vue Lynx

接下来两周的晚上和周末都用来让它成为现实：160+ 次提交，分布在约 180 个会话中。

我可以在第一周后就发布。但如果你了解我，你知道我的原则：

当东西真正工作时，让 demos 说话。

查看 [vue.lynxjs.org](https://vue.lynxjs.org)，有 20+ 个原生运行和 Web 运行的示例应用——你可以不离开浏览器就试用它们。

我们覆盖了完整的 Composition API、`<Transition>`、`<Suspense>`，以及包括 Vue Router、Pinia、Tailwind CSS 和 TanStack Query 在内的生态系统集成。我们还移植了 Lynx 官方教程（瀑布画廊和 Swiper）来展示原生组件和主线程脚本的零延迟手势。一个 HackerNews 克隆将它们全部结合在一起。

## 今天就试试

它当然是[开源的](https://github.com/huxpro/vue-lynx)。如果它启发了你，给它一个 Star！也请多多关注 [Lynx Engine](https://github.com/lynx-family/lynx) 和 [Lynx Frontend Stack](https://github.com/lynx-family/lynx-stack)。它们是我们站在上面的肩膀。

我非常希望 Vue 和 Lynx 社区能共同构建它。欢迎 issue、PR 和反馈。

## "工具链""工程"

你得用继"AI"、"vibe"和"agentic"之后最热门的词——harness。

在这个项目制作过程中，没有人类在代码写作中受到伤害。

## 为 AI 设置架构

之前有两个社区努力。第二个来自 Vue Vine 维护者 @Shenqingchuan，做得令人印象深刻地远，[甚至让主线程脚本演示运行起来](https://x.com/Shenqingchuan/status/1996862232593129815?s=20)。但两者都将 Vue 保持在主线程上，就像 Web 一样。这在 Lynx 上可以工作，但并没有利用 Lynx 以双线程架构著称的优势：将沉重的框架重渲染卸载到后台，确保原生 UI 线程非阻塞，只在需要时才被调用（通过主线程脚本）。

这是我第一天验证的核心架构决策。在 Vue Lynx 中，整个 Vue 运行在后台。一个轻量级的 ShadowElement 链表树在内存中镜像原生元素树，每个 DOM 变更都被序列化为扁平 ops 缓冲区，每个 tick 一批发送到主线程。

为了保持 agent 与这个双线程架构一致，而不是偏离到它默认的单线程 Web 模型，我将所有[关键计划直接嵌入源树](https://github.com/Huxpro/vue-lynx/tree/main/plans)：设计讨论笔记、决策日志和实现后学习作为跨会话上下文。每个新会话从上一个停止的地方继续，继承了我们塑造代码的架构约束和推理。

## 桥接 Vue 上游测试

在任何 AI 驱动开发中，最关键的投资是反馈。理想情况下，为确保符合官方 Vue，我们会直接重用 Vue 的上游测试套件。但 Vue 的测试套件假设单线程 DOM。你如何用它来测试双线程渲染器？

幸运的是，Lynx 已经有了[双线程测试环境的基础设施](https://lynxjs.org/next/api/lynx-testing-environment/index.html#lynx-jstesting-environment)。所以我们可以重新连接测试套件，通过我们的双线程流水线运行：BG ShadowElement -> ops buffer -> syncFlush() -> MT applyOps -> PAPI -> jsdom，然后让 agent 磨，直到没有剩余可修复的失败（实际上是 [Ralph Loop](https://ghuntley.com/loop/)）。结果：949 个上游测试中有 852 个通过。每个失败都在一个[跳表](https://github.com/Huxpro/vue-lynx/blob/main/packages/upstream-tests/skiplist.json)中有记录在案的原因，事实证明都是可以忽略的。见[完整报告和跳过分析](https://github.com/Huxpro/vue-lynx/blob/main/packages/upstream-tests/README.md)。

我们还为 Lynx 特定表面添加了我们自己的测试，如 `<list>` 元素、bindtap 事件、主线程脚本 API。随着流水线的验证，我进一步推进并从官方 Vue 文档 fork 了 [7GUIs 基准](https://vue.lynxjs.org/guide/7guis)作为压力测试。

## Agent 端到端验证循环

但那些经典机械测试无法捕捉真实 UI bug，这些 bug 过去需要人类评估：不对齐的 CSS 布局、在真实设备上坏掉的交互。对于像 `<Transition>`、`<Suspense>` 这样的高级 Vue 功能，你需要看到它们运行和交互来验证行为。

通过正确的工具链，编写示例不仅仅是演示——它们同时也是 agent 可以自动评估的工作负载。我连接了两个执行环境：通过 [Lynx DevTool MCP](https://lynxjs.org/next/ai/lynx-devtool-mcp.html)/CLI/Skill 的 iOS 模拟器，以及通过 [Lynx for Web](https://lynxjs.org/next/guide/start/integrate-with-existing-apps?platform=web) 的 agent 控制的浏览器。循环很简单：在两者中运行示例，观察和验证输出，任何回归都会触发修复。循环中没有人。

我从 Vue 核心功能开始，那里的正确性定义良好：agent 读取官方文档，编写示例，并检查输出是否符合。然后我扩展到生态系统集成：Vue Router、Pinia、TanStack Query、Tailwind CSS。

对于最终考试，我尝试了一种不同的方法：一种我后来得知有名字的方法：差分评估：我让 agent 移植现有应用并验证输出与原始应用的一致性。第一个使用规范的 Vue HackerNews 实现作为 ground truth，同时在浏览器中运行 Web 版本和 vue-lynx 移植版本与 Lynx for Web 并排；第二个使用现有的 ReactLynx 演示作为参考，移植到 vue-lynx 并通过 Lynx DevTool MCP 在 iOS 模拟器上验证一致性。工具链不需要抽象地知道"正确"是什么样子。它只需要两个输出达成一致。

## 账单

数字说明了一切。输出 tokens（Claude 实际写的代码和文本）只占成本的 8%。其他 92% 是理解：重读代码库、摄入工具输出、跨 31,700 次 API 调用重新处理对话历史。这是 25 亿 tokens 阅读产生 680 万 tokens 写作——370:1 的比率。这就是"agentic"在账单层面实际看起来的样子。

$6,500 的 API 费率值得吗？（幸运地，Claude [送给了我](https://x.com/Huxpro/status/2031973188440052119?s=20) 200 美元的 Claude Max，用于[其开源计划](https://x.com/Huxpro/status/2031973188440052119?s=20)）

## 接下来是什么？

这个项目始于一个人的夜间和周末努力。我很乐意与 Vue 核心团队探索如何共同塑造 Vue 在原生上的未来。就个人而言，并代表 Lynx 团队，我们致力于支持其增长。

Vue Lynx 是 pre-alpha。架构是稳固的，但 Vue 的 API 表面很大，我们还没有验证它的每个角落。

- 像 KeepAlive 和 Teleport 这样的功能可能需要运行时适配。
- `<style scoped>` 和原生输入上的 v-model 可以解决但尚未实现。
- 主线程脚本 API 目前重用 ReactLynx 的基于指令的设计。一种更 Vue 惯用的方法（如 `<script main-thread setup>`）值得探索。
- Vue DevTools 与 Lynx DevTool 应用集成。

而在 Vue 核心之外，有一个庞大的 Vue 生态系统等待我们适配和在原生上发展。

愿景很简单：Vue 开发者应该能够像今天为 Web 构建一样自然地发布原生应用。我们还没到那一步，但基础已经到位，道路是清晰的。

如果你读到这里：[试试看](https://vue.lynxjs.org)。
构建一些东西。告诉我们缺什么。

哦，顺便说一句：
