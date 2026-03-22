你是一个翻译助手。请把下面的 Markdown 内容翻译成简体中文。
[TransCrab Translation Profile]
- mode: auto
- audience: technical
- style: technical
- auto-resolved-mode: refined
- auto-resolved-audience: technical
- auto-resolved-style: technical
- auto-reasons: 公开发布默认使用 refined 流程，优先质量与稳定性；主题信号不明显，回退到 technology
- pipeline: analyze -> translate -> review -> revise
- 执行策略：自动判断（auto）。
- 发布流程固定按 refined 质量标准执行。
- 你需要根据主题（technology/business/life）自动选择最合适的翻译风格与语气。
要求：
- 保留 Markdown 结构（标题/列表/引用/表格/链接）。
- 代码块、命令、URL、文件路径保持原样，不要翻译。
- **必须同时翻译标题**：请先输出一行 Markdown 一级标题（以 "# " 开头），作为译文标题。
- 然后空一行，再输出译文正文（不要再重复标题）。
- 只输出翻译结果本身，不要附加解释、不要加前后缀。
---
We've published a new Claude Code plugin called playground that helps Claude generate HTML playgrounds. These are standalone HTML files that let you visualize a problem with Claude, interact with it and give you an output prompt to paste back into Claude Code.

I've found this can be really good interacting with the model in ways that are not well suited for text, for example to:

- Visualize the architecture of the codebase
- Adjust the design of a component
- Brainstorm layouting and design
- Tweak the balance of a game
To get started, install the plugin in Claude code by running the following commands:
/plugin marketplace update claude-plugins-official 
/plugin install playground@claude-plugins-official

Here are some of my favorite playgrounds I've made:

Changing the design of the AskUserQuestion Tool in Claude Code
prompt: "Use the playground skill to create an playground that helps me explore new layout changes to the AskUserQuestion Tool"

Critiquing your writing and getting a response 
prompt: "Use the playground skill to review my [SKILL.MD](https://skill.md/) and give me inline suggestions I can approve, reject or comment"

Tweaking a Remotion Video Intro
prompt: "Use the playground skill to tweak my intro screen to be more interesting and delightful"

Viewing an Architecture Diagram and letting the user comment
prompt: "Use the playground skill to show how this email agent codebase works and let me comment on particular nodes in the architecture to ask questions, make edits, etc"

Balancing the Superhero Rogue-like game I'm making
prompt: "Use the playground skill to help me balance the 'Inferno' hero's deck"

Excited to see how you all explore this! 

My tip for creating an interesting playground- think of a unique way of interacting with the model and then ask it to express that.  I think you might find it surprising. 

If you make something cool, please share it!
