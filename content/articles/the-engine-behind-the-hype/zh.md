---
title: 炒作背后的引擎
date: '2026-03-20T13:23:26.916Z'
sourceUrl: 'https://www.onuruzunismail.com/blog/the-engine-behind-the-hype'
lang: zh
---
## 人人都知道的龙虾

[OpenClaw](https://github.com/openclaw/openclaw) 在 GitHub 上有超过 10 万颗星。它还有[三个名字](https://en.wikipedia.org/wiki/OpenClaw)。最初叫 ClawdBot，2026 年 1 月 Anthropic 发来商标投诉后改成 MoltBot，最后定为 OpenClaw。在一次更名期间，[加密货币骗子在十秒内劫持了旧账号](https://dev.to/sivarampg/from-clawdbot-to-moltbot-how-a-cd-crypto-scammers-and-10-seconds-of-chaos-took-down-the-4eck)，把假代币炒到 1600 万美元。现在它有自己的维基百科页面了。整件事都很疯狂。

[Peter Steinberger](https://github.com/openclaw/openclaw) 创建了它。一个主动的 AI 助手，在 WhatsApp、Telegram、Slack、Discord、iMessage 等各种平台上跟你对话。人们不断发帖说"我让它做 X，几小时后它就做完了"。有人声称 Claude 给他们打了电话。不管这是不是夸大，这个项目令人印象深刻，Peter 比我懂的多得多。

但有一点让我印象深刻。Peter 似乎自己构建或使用了某种工具，而不是 Claude Code。他自己的浏览器自动化，也不是用 Playwright 作为 MCP。我深入 GitHub 发现[OpenClaw 底层的引擎是一个叫 Pi 的编程 agent](https://lucumr.pocoo.org/2026/1/31/pi/)，由 [Mario Zechner](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) 构建。就是那个做 libGDX 的人。Peter 和 Mario 互相认识。人人都在谈论龙虾。我想谈谈引擎。

## 我试过的每个工具

要解释为什么 Pi 对我很重要，我需要给你时间线。很长。

我像大多数人一样开始。把代码块复制粘贴到 [ChatGPT](https://chatgpt.com/)。然后转到 [Claude](https://claude.ai/)。然后开始用 [Kevin Leanway](https://www.youtube.com/watch?v=YV-pZSDNnPo) 的 [PasteMax](https://github.com/kleneway/pastemax) 这样的工具粘贴整个代码库。我看了他[关于规划工作流的视频](https://www.youtube.com/watch?v=gXmakVsIbF0)，从中学到了很多。然后是一些 VS Code 扩展，让你在 IDE 里跟模型对话。[Copilot](https://github.com/features/copilot) 自动补全我一直没感觉，直到有一天突然有了。支线故事。

然后是 [Cursor](https://cursor.com/)。我也用了几个月 [Augment](https://www.augmentcode.com/)。那段时间我觉得 Augment 更优秀。这些工具的月费加超额费用达到 100-150 美元。就在那时 [Claude Code](https://claude.ai/code) 出现了。最初只有 API，所以我只把它留给其他工具搞不定的事情。Claude Plans 推出时，我当天就跳槽了。我已经比其他任何东西都用得多了。

我还试过 [Kilo Code](https://kilocode.ai/)、[Windsurf](https://windsurf.com/)、[ChatLLM](https://chatllm.abacus.ai/)（被低估了）、[Roo Code](https://github.com/RooVetGit/Roo-Code)，以及更多 IDE 插件，列都列不完。我喜欢 Kilo Code 用 when/then 语句处理规划阶段的方式。[Gravity](https://gravity.dev/) 最近出现，值得关注。但 Claude Code 感觉像是答案。我有了节奏。对事情需要多长时间的粗略估计。Greenfield、brownfield，随便什么。只要给够引导和上下文管理，它就能把事情做完。比过去强无限倍。我很满意。

我构建得越多，就越想构建。那个反馈循环本身就是个话题。

## 上下文窗口问题

Claude Code 吃掉上下文。或者我吃掉上下文。有人会说"那是你的问题，你没喂它正确的东西"。有时候是。但我会开始一个会话，让它读一些文件，在我让它做任何事之前，50% 的上下文窗口就没了。系统提示、MCP、Claude 在你打第一个字之前注入的任何东西。我[之前写过这种挫败感](https://www.onuruzunismail.com/blog/ralphio-while-loops-and-context)。我的个人规则：一旦达到 70K token，我就进入黄区。超过 100K，该收尾重新开始。

我一直试图解决这个问题。[Gemini CLI](https://github.com/google-gemini/gemini-cli) 出现了，我试了。人们喜欢 2.5 Pro 编程，然后 3 Pro 发布时他们疯了。我在 Gemini 3 之前用过 CLI，对轻量任务有些意义，但从来不是替代品。我每天用 Gemini Pro 做很多事情，但编程不是其中之一。也许我太习惯 Claude 的思考方式了。

[OpenCode](https://opencode.ai/) 也在。它的卖点是任何模型、任何提供商。但除了 Claude 之外的任何东西对我来说都感觉不对，如果我反正要用 Claude，为什么要学一个新工具的感觉，而 Claude 自己的工具已经够好了？然后 GLM 出现了。GLM 是 Claude 的 RC 可乐。有点可靠。有些任务比 Gemini Pro 做得好，但不如 Claude。我觉得这也是他们自己的说法。山寨 Claude，我因此喜欢它。

然后我发现了 [Oh My OpenCode](https://github.com/code-yeongyu/oh-my-opencode)。OpenCode 的一个插件，把工作分给专门的 agent：Sisyphus、Prometheus、Atlas、Hephaestus。每个 agent 有自己的角色和严格的护栏，不只是基于提示，而是硬编码的钩子。我喜欢他们对这个问题的思考方式。Atlas 特别似乎能处理上下文压缩。会话可以运行很长时间而不会让上下文窗口爆炸。这很有趣。

然后 Anthropic 限制 OAuth 访问，[把 Oh My OpenCode 作为阻止 OpenCode 的理由](https://github.com/code-yeongyu/oh-my-opencode)。你付费依赖的工具可以制定任意感觉的规矩，你要么遵守，要么出局。感觉很奇怪。

与此同时，当 Claude Code 当天用满时，我感觉像离开水的鱼。那种依赖让我困扰。

## 没人谈论的引擎

回到 Peter 和 OpenClaw。他提到自定义工具让我开始挖掘。那时我发现了 [Pi](https://github.com/badlogic/pi-mono/tree/main)。

Mario Zechner 构建了它。他经历了跟我类似的路径。复制粘贴到 ChatGPT，然后 Copilot，然后 Cursor，然后 Claude Code。跟我不一样的是，他能构建自己想要的工具。他的理念：剥离所有臃肿。[四个工具。读、写、编辑、Bash。](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) 系统提示不到 1000 个 token。就这些。AI 只需要读取文件、写入文件、编辑文件和运行命令。其他都是噪音。

我持怀疑态度。又一个编程 TUI。能有什么不同。我在 VPS 上安装了它，用 GLM，这样可以从任何地方访问。我一直在[尝试在常规渠道之外运行 AI](https://www.onuruzunismail.com/blog/local-ai-tools)。出于某种原因，我还是不敢把 Claude 放在 VPS 上。我知道没有理由害怕，但恐惧就在那里。

正如 [Armin Ronacher 写的](https://lucumr.pocoo.org/2026/1/31/pi/)（Armin 是 Mario 的朋友，有趣的是这些做出牛逼东西的人往往是朋友。我希望我也有那样的朋友），Pi 有趣是因为它微小的核心和扩展系统。它通过让扩展把状态持久化到会话来弥补几乎什么都没有的内置功能。Agent 可以扩展自己。你不是下载插件。你告诉 agent 构建一个。[这个仓库有 11000+ 星](https://github.com/badlogic/pi-mono/tree/main)，听起来很多，直到你跟 OpenClaw 比较。龙虾得到关注。引擎被悄悄 fork 进生产环境。

## 上下文惊喜

我开始更多地使用 Pi。然后我注意到 token 数量。

我让它读了一堆文档。它完成了多个任务。我看上下文使用量，还没到 50%。搞什么鬼。

用 Claude Code，同样的工作量会让我深入黄区。用 Pi，上下文只是微温。输出更干净，而且它似乎用更少的东西就能更好地理解代码库。

这就是让我震惊的地方。上下文效率是每个人都在谈论的东西，Claude Code 的 token 使用被当作正常基线。我也接受了。但 Pi 向我展示那个基线是臃肿的。问题变成：Claude Code 和 OpenCode 往上下文里塞了什么而 Pi 没有？MCP 吃 token，当然。但差距太大，不能用 MCP 单独解释。有一堆系统提示、工具定义和注入的指令，你从未见过，也从未要求过。

Mario 的赌注是大部分都不必要。四个工具，一个短提示。模型足够聪明，能自己搞清楚。根据我的经验，他是对的。

## 一个人的项目

Pi 是一个人的作品。Mario 明天可能就走。这是这种项目的风险。OpenClaw 的更名混乱展示了治理薄弱、事情快速移动时会发生什么。加密货币骗子不会等你社区决策流程。

但代码是开放的。你可以 fork。你拥有它。也许这就是未来。[为你构建的小工具](https://www.onuruzunismail.com/blog/the-interfaceless-interface)，由你维护。你的 agent 扩展自己来适应你的工作流，而不是你扭曲自己去适应别人的产品决策。

寻找完美编程工作流永远不会结束。对我来说还没有结束。这个领域变化太快，任何东西都不可能永久。但现在，那个自称[屎一样的编程 agent](https://shittycodingagent.ai/) 的东西是我用过最不屎的工具。

ai, tools, opinion
