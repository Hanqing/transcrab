---
title: 一个 GitHub Issue 标题如何导致 4000 台开发者机器被入侵
date: '2026-03-13T00:00:00.000Z'
sourceUrl: https://grith.ai/blog/clinejection-when-your-ai-tool-installs-another
lang: zh
---

从 GitHub Issue 标题到 4000 台被入侵的开发者机器，只需要五步。入口是自然语言。

2026 年 2 月 17 日，有人发布了 cline@2.3.0 到 npm。CLI 二进制文件与前一版本完全相同。唯一的更改是 package.json 中的一行：

```
"postinstall": "npm install -g openclaw@latest"
```

在接下来的八小时内，每个安装或更新 Cline 的开发者都无意中在其机器上全局安装了 OpenClaw——一个具有完全系统访问权限的独立 AI 代理。在该包被下架之前，大约有 4000 次下载。

有趣的不是有效载荷本身。攻击者首先获得 npm token 的方式才是关键：通过将提示注入 GitHub Issue 标题，一个 AI 分流机器人读取它，将其解释为指令并执行。

## 完整攻击链

这次攻击——Snyk 称之为"Clinejection"——将五个众所周知的漏洞组合成一个只需打开 GitHub Issue 就能实现的漏洞利用。

**第一步：通过 Issue 标题进行提示注入。** Cline 部署了一个使用 Anthropic 的 claude-code-action 的 AI 驱动 Issue 分流工作流。该工作流配置为 `allowed_non_write_users: "*"`，意味着任何 GitHub 用户都可以通过打开 Issue 触发它。Issue 标题通过 `${{ github.event.issue.title }}` 直接插入到 Claude 的提示中，没有进行清理。

1 月 28 日，攻击者创建了 Issue #8904，标题看似一份性能报告，但包含嵌入的指令：从特定的 GitHub 仓库安装一个包。

**第二步：AI 机器人执行任意代码。** Claude 将注入的指令解释为合法的，运行 npm install 指向攻击者的 fork——一个 typosquatted 仓库（glthub-actions/cline，注意 github 缺少 'i'）。该 fork 的 package.json 包含一个 preinstall 脚本，获取并执行远程 shell 脚本。

**第三步：缓存投毒。** shell 脚本部署了 Cacheract，一个 GitHub Actions 缓存投毒工具。它用超过 10GB 的垃圾数据冲击缓存，触发 GitHub 的 LRU 驱逐策略，驱逐合法的缓存条目。这些被污染的条目被设计为匹配 Cline 夜间发布工作流使用的缓存键模式。

**第四步：凭证窃取。** 当夜间发布工作流运行并从缓存恢复 node_modules 时，它获得了妥协版本。该发布工作流持有 NPM_RELEASE_TOKEN、VSCE_PAT（VS Code Marketplace）和 OVSX_PAT（OpenVSX）。所有三个都被窃取了。

**第五步：恶意发布。** 使用窃取的 npm token，攻击者发布了带有 OpenClaw postinstall 钩子的 cline@2.3.0。妥协版本在线上挂了八小时，然后 StepSecurity 的自动监控标记了它——大约在发布后 14 分钟。

## 搞砸的轮换让它变得更糟

安全研究员 Adnan Khan 实际上在 2025 年 12 月底发现了这个漏洞链，并于 2026 年 1 月 1 日通过 GitHub 安全咨询报告了它。他在五周内发送了多次跟进。没有收到任何回复。

当 Khan 于 2 月 9 日公开披露时，Cline 在 30 分钟内修补了它，删除了 AI 分流工作流。他们第二天开始轮换凭证。

但轮换不完整。团队删除了错误的 token，暴露的那个仍然活跃。他们在 2 月 11 日发现了错误并重新轮换。但攻击者已经窃取了凭证，而且 npm token 保持有效足够长的时间，足以在六天后发布妥协版本。

## 新模式：AI 安装 AI

具体的漏洞链有趣但并非史无前例。提示注入、缓存投毒和凭证窃取都是有据可查的攻击类别。使得 Clinejection 与众不同的是结果：一个 AI 工具在开发者机器上静默引导第二个 AI 代理。

这在供应链中创造了递归问题。开发者信任工具 A（Cline）。工具 A 被妥协安装工具 B（OpenClaw）。工具 B 有自己的功能——shell 执行、凭证访问、持久化守护进程安装——这些独立于工具 A，且对开发者最初的信任决定不可见。

OpenClaw 安装后可以从 ~/.openclaw/ 读取凭证，通过其 Gateway API 执行 shell 命令，并安装为持久化系统守护进程。严重程度有争议——Endor Labs 将有效载荷定性为更接近概念验证而非武器化攻击——但机制才是重要的。下一个有效载荷不会是概念验证。

这是供应链版的"混乱 deputy"问题：开发者授权 Cline 代表他行事，而 Cline（通过妥协）将该权力委托给一个完全独立的代理，开发者从未评估、从未配置、从未同意。

## 为什么现有控制没有发现它

npm audit：postinstall 脚本安装了一个合法的、非恶意的包（OpenClaw）。没有恶意软件可检测。

代码审查：CLI 二进制文件与前一版本完全相同。只有 package.json 改变了，只有一行。专注于二进制变化的自动差异检查会错过它。

来源证明：Cline 当时没有使用基于 OIDC 的 npm 来源证明。妥协的 token 可以在没有来源元数据的情况下发布，StepSecurity 将其标记为异常。

权限提示：安装发生在 npm install 期间的 postinstall 钩子中。没有 AI 编码工具在依赖的生命周期脚本运行之前提示用户。该操作不可见。

## Cline 之后改变了什么

Cline 的事后分析概述了几项补救步骤：

- 从凭证处理工作流中消除 GitHub Actions 缓存使用
- 采用 OIDC 来源证明进行 npm 发布，消除长期 token
- 为凭证轮换添加验证要求
- 开始制定具有 SLA 的正式漏洞披露流程
- 委托对 CI/CD 基础设施进行第三方安全审计

这些都是有意义的改进。单独的 OIDC 迁移就能阻止攻击——当来源需要来自特定 GitHub Actions 工作流的加密证明时，窃取的 token 无法发布包。

## 架构问题

Clinejection 是一次供应链攻击，但也是一个代理安全问题。入口是 GitHub Issue 标题中的自然语言。链中的第一个环节是一个 AI 机器人，它将不受信任的文本解释为指令，并以 CI 环境的权限执行它。

这与我们在 MCP 工具污染和代理技能注册表上下文中写过的相同结构模式——不受信任的输入到达代理，代理对其采取行动，没有什么评估代理用该访问做什么。

这里的区别在于代理不是开发者的本地编码助手。它是一个自动化 CI 工作流，在每个新 Issue 上运行，具有 shell 访问和缓存凭证。爆炸半径不是一台开发者机器——而是整个项目的发布管道。

每个在 CI/CD 中部署 AI 代理的团队——用于 Issue 分流、代码审查、自动化测试或任何其他工作流——都有相同的暴露。代理处理不受信任的输入（Issue、PR、评论）并可以访问秘密（token、密钥、凭证）。问题是是否有任何东西评估代理用该访问做什么。