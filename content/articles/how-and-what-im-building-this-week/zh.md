---
title: 这周我在做什么以及怎么做的
date: '2026-03-19T23:28:57.859Z'
sourceUrl: 'https://www.bensbites.com/p/how-and-what-im-building-this-week'
lang: zh
---
我正在测试一种"建造者日志"，我会聊聊这周做的东西，哪些管用、哪些不管用，给你们一些周末可以捣鼓的东西。

我好几周前就想这么做了，但我喜欢在真正开始之前"看到"最终产出长什么样。

但这就是拖延而已。

所以我告诉自己，不把这篇文章发出去就不能打开我的新 MacBook 🥹。

如果你喜欢这种邮件风格，以及你用它做了什么，欢迎反馈！

* * *

## 这周我做了什么？

### 1. 成为建造者

上周我办的个工作坊有 1300 人报名 [我会再办]。但 Codex 在过程中崩溃了（所以才买了新 MacBook）。我想整理一份食谱来涵盖所有内容。

结果做成了分步教程。太无聊了。你会看一个屏幕然后切换到工具上操作吗？也许不会。

相反，我一直在做一个交互式食谱，你交给你的 agent，它会在你构建的过程中"教你"。

最后，你会在构建过程中掌握所有新概念，然后部署你自己的网站。

这个食谱很难做对，所以就算它是 alpha0.1 吧。请告诉我你用起来怎么样，你的网站长什么样，哪里做得不够好，我会改进。

怎么做：

- 打开 Codex/Claude Code 桌面应用
- 创建一个新项目文件夹
- 在那个文件夹里打开一个聊天会话
- 把这个链接（使用说明）复制给你的 agent，按回车：

> `https://gists.sh/bentossell/a4e5e7048e8a355ec56cf3db86169ae2`

- 如果你感觉舒服，可以在 Codex 上选"完全访问"，在 Claude 上选"绕过权限"（这个项目只是为你创建一个新网站）。或者也可以一路接受权限。

我强烈建议读一下 agent 的输出，看看它在你的提示之间在想什么。

用任何你不懂的概念填满你的网站，然后[分享出来](https://x.com/bentossell)，我很想看看。

*免责声明：Codex 产出的设计可能比 Claude 丑。*

### 2. Visualise skill

上面那个食谱的一个问题是可视化。我认为在学习代码系统时这个真的很有帮助。

我之前所有的尝试都做得像💩，然后 Claude 昨天上线了他们的可视化功能。时机完美。

于是我逆向工程了一下，做成了一个 skill，你可以加到任何 agent 上。Codex 的设计品味仍然很差，但有这个 skill 比没有好多了，相信我！

这是我第一个超过 200 星星的 GitHub 项目！

只要把链接给你的 agent，说"安装这个 skill"就行。

[我把它做成了一个 skill](https://x.com/bentossell/status/2032212463735701803?s=20) · [github.com/bentossell/vis…](https://github.com/bentossell/visualise)

Claude 现在可以直接在聊天中构建交互式图表和图表。今天在所有计划（包括免费版）上推出测试版。试试看：https://t.co/tHPAZRgQkn

### 3. Ben's Bites Cookbook 网站

又一次重设计了。

之前的 cookbook 网站有很多旧版本的负担，所以我想重新开始。

毕竟现在代码基本免费了！

肯定还没完成，但已经到了一个不错的状态。这是我想上传一堆帮助文档的地方，帮助你构建东西，以及看我如何构建东西的分解。

还是进行中！还没上线。还需要一轮设计——对比度首先就不对。

* * *

## 我栈里有什么——工具、skill、指令、模型

**模型。** 我总是混着用。

- GPT 5.4 XHigh 用于所有"正经代码"——新功能、新想法等
- Opus 4.6——用于规划、研究、非技术性任务、设计（总是用它）

**CLI（终端工具）**

- [Droid](https://factory.ai)——当我想认真做东西时用（他们的新任务功能太疯了，可以跑好几个小时，端到端实现东西）——我是这家公司的投资者
- [Pi](https://pi.dev) 是我的另一个新宠。它非常快，而且轻量，所以你的指令比其它工具更能引导它

两个都能让你在一个对话里切换 GPT ←→ Claude 模型（或 gemini 等）。

我只在终端里用这些。我以前用 [Ghostty](https://ghostty.org/) 作为终端应用，但现在用 [Cmux](https://www.cmux.dev/)，它里面集成了 Ghostty，只是有一个不错的侧边栏来组织聊天、可拖拽面板和一个内置浏览器。我还是希望能有一个简单的方法看我的文件——在那之前，我用 [Zed](https://zed.dev/) 来看文件。

**Agent 应用** 或者我们叫这些三面板 agent 接口的东西：

- [Codex app](https://openai.com/codex/)——用户体验非常好，非常平易近人
- [Claude Code/Cowork](https://claude.com/download) 在桌面应用上——我很少用这些，但这周测试用了不少。我还没被说服。
- [T3 Code](https://t3.codes/)——这个不错，轻快，会支持多个 agent，但目前只有 Codex。在它支持其他 agent 之前，我用 Codex 做 GPT 工作。

*我看了 Theo 的视频"泄露"了一个获取早期版本的命令。我不知道发布时会开源，我就安装了，让 gpt 5.4 xhigh 逆向工程它——它没问题！*

**Skills**

- 来自 Anthropic 的 `frontend-design` [[链接](https://skills.sh/anthropics/skills/frontend-design)]
  - 它做得不错，但我读提示时不觉得它应该这么好用 😅。我在等 [ui.sh skill](https://ui.sh/) 发布，这样我就可以用那个了（Tailwind 的人做的）。
- 来自 Vercel 的 `json-render` [[链接](https://skills.sh/vercel-labs/json-render)`
  - 这是一个很棒的"生成式 UI"skill，可以超快地搭建界面。我用它为我的 Mac-Mini 上设置的 zapier/n8n 自动化做画布。团队几乎每天都在推送更新。我需要多玩一下。

- 来自 Vercel 的 `agent-browser`
  - 我最常用的 agent skill。启动一个 Chrome 浏览器，看我的网站、截屏、导航、点击、录屏等等——基本上像人一样用浏览器。有一个"dogfood"标签会抓取所有错误，写报告来修复。我发现它无法绕过有 Cloudflare"机器人检测"的网站——比如 OpenAI。讽刺的是这没逃过我的眼睛。
- 来自 Aiden 的 `react-doctor` [[链接](我的 GitHub)](https://github.com/millionco/react-doctor)
  - 当我的 agent 使用 React 时（经常用到），确保我用最佳实践很有帮助。它在东西构建完成、测试/检查发生时介入，几乎总能抓住一些要修的东西。

> **Skill 提示注入怎么办？**
> 可能发生。我没遇到过。用可信来源比如 [Skills.sh](https://skills.sh/)（来自 Vercel），或者让你的 agent 重新创建 skill 并检查安全问题。Codex app 有一个 `create-skill` skill——直接问 agent 就行。

**其他工具**

- **[exe](https://exe.dev/)** 让你可以非常容易地启动虚拟服务器，内置一个 agent 在你卡住时帮忙。总体让我对服务器感到非常舒服——之前我可不舒服。
  - *如果你的自动化或 agent 想"一直运行"，你会想要另一个服务器。在你电脑上的话，合上盖子就不会跑了！*
- **[here.now](https://here.now/)** —— 我总是为随机想法甚至只是为了更好地展示信息而启动网站，这样我可以在手机上查看。这是一个免费工具，让你快速给网站一个自定义 URL。
  - *我喜欢这个，创始人也是，所以我这周投资了！*
- **Vercel**。Vercel 和 Cloudflare 在 X 上是死敌。我两边各有一半部署的网站和域名。我只想选一个默认的，Vercel 稍微领先，因为我用了很多他们的工具和 skills。但说真的明天可能就变了。
- **[gists.sh](https://gists.sh/)** —— 我喜欢这种小工具。GitHub 有"gists"，是一种快速把文件放到可以分享或保密的 URL 上、agent 很容易读取的方式。但很丑。这个工具让分享变得很漂亮——这就是为什么我把交互式食谱放进去。

待捣鼓的工具列表：

- [Context7 CLI](https://x.com/enesakar/status/2031887459085377887) - 文档
- [Browserbase Fetch API](https://www.browserbase.com/blog/fetch-api) - 抓取网站。得看看 browserbase vs agent-browser
- [Ramp agent card](https://agents.ramp.com/cards) - 给 agent 用的信用卡
- [Replit Agent 4](https://blog.replit.com/introducing-agent-4-built-for-creativity) - 要不要我做氛围编程工具的头对头对比？
- [Web to Design](https://www.magicpath.ai/documentation/features/web-to-design) - 把任何网站变成可编辑的 UI。

* * *

## 我的 AGENTS.md 里有什么

> *AGENTS.md 是一个 markdown 文件，包含 agent 在每个会话开始时加载到上下文中的指令。
> 
> Claude 特别会找 CLAUDE.md——但我只是把它们互相符号链接——也就是说如果你看 claude.md 会显示 agents.md 文件。让你的 agent 帮你设置，或者用 [dotagents](https://github.com/iannuttall/dotagents)。
> 
> 你也可以把这些粘贴到 Codex/Claude 桌面应用中。*

这是我加的构建"循环"。

我用的任何 agent 都遵循它（斜体是给你的提示——不包含在文件中）：

- **创建 /spec/ 文件夹。**
  - *一个把所有规划文件组织在一个地方的简单方法*
- **编号的 00_spec1.md 等等。**
  - *有助于实现排序*
- **创建一个 progress.md 文件来记录你完成 specs 的进度。**
  - *如果发生压缩，我需要新会话，或者 agent 会失去跟踪——这帮助它理解我们在哪里。*
- **在给我发测试链接之前，用 agent-browser 加上 dogfood 跑一下。**
  - *功能做好后，它会启动一个浏览器检查网站有没有 bug 或错误——我以前手动做这个，把错误复制给 agent，但现在它自己完成这个循环。它抓不到每一个 bug，但我尽量让我的 agent 像真实用户一样用我的网站。有时这些循环要跑很久，取决于你在测试什么。*
- **写好的、高效的、快速的、覆盖全面的测试。**
  - *我还不够懂测试。这是我瞎摸索的，但 agent 很擅长测试。还在找一个 help 我的 skill 或东西。*
- **最佳实践、高效、简化代码、避免反模式。**
  - *以防万一，确保 agent 用正确的方式做事！老实说不知道这有没有帮助。*
- **对于你用的代码/依赖/库等，确保参考它们的文档。**
  - *Agent 经常先用自己的知识，然后才查文档。所以只是推动它看文档。Context7 CLI 刚发布（获取任何工具文档的简单工具），所以我从今天起会把它放进去——下周汇报。*
- **第一条消息："feel the rhythm, feel the rhyme, get on up, it's bobsled time."**
  - *我也有这个 😂。来自 Cool Runnings 的台词——蠢，但也能让我知道我的指令确实加载到会话中了。*

* * *

你的 agents.md 里有什么？我应该加什么或去掉什么？

还想知道我什么或看我什么？

周末愉快！

* * *

- 在 [X](https://x.com/bentossell/)、[Linkedin](https://www.linkedin.com/in/ben-tossell-70453537/) 或 [YouTube](https://www.youtube.com/@bentossell694) 找到我
- 阅读[关于我](https://bensbites.substack.com/about)和 Ben's Bites
