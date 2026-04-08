你是一个翻译助手。请把下面的 Markdown 内容翻译成简体中文。
[TransCrab Translation Profile]
- mode: auto
- audience: general
- style: conversational
- auto-resolved-mode: refined
- auto-resolved-audience: general
- auto-resolved-style: conversational
- auto-reasons: 公开发布默认使用 refined 流程，优先质量与稳定性；生活叙事关键词命中较高，判定为 life；篇幅较长，refined 可降低术语漂移与结构风险
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
It's March 2026 and if you're still copy pasting code into chatgpt then we need to talk.

i've been deep in claude code for the last 2 months. not casually. daily. in the trenches. i did the courses, got certified, built projects with it, broke things, fixed them, and built more things. i've spent more time in my terminal talking to claude than talking to actual humans.

this isn't a "top 10 AI tools" fluff piece. this is everything i've learned the features nobody talks about, the workflows that actually work, the mistakes that cost me hours, and the tricks that saved me days.

bookmark this. you're going to need it more than once.

W𝗵𝗮𝘁 𝗰𝗹𝗮𝘂𝗱𝗲 𝗰𝗼𝗱𝗲 𝗮𝗰𝘁𝘂𝗮𝗹𝗹𝘆 𝗶𝘀

let me kill the biggest misconception first. claude code is not copilot. it's not a chatbot you paste code into. it's not autocomplete on steroids.

it's an 𝗮𝗴𝗲𝗻𝘁. an actual autonomous agent that:

- reads your entire codebase
- plans an approach
- edits files across your whole project
- runs your tests
- sees failures and fixes them
- iterates until the job is done
the key word is 𝗮𝗴𝗲𝗻𝘁𝗶𝗰. it operates in a loop gather context, take action, verify results, repeat. you tell it what you want, it figures out how to get there. you're not writing code together. you're delegating to something that actually understands what it's reading.

it lives in your terminal. that's not a limitation that's the point. your terminal is the most powerful interface on your machine. claude code meets you there.

![](https://pbs.twimg.com/media/HEhFCPJa8AAcvf-.jpg)

W𝗵𝗲𝗿𝗲 𝗶𝘁 𝗿𝘂𝗻𝘀:

Claude code isn't just a CLI tool anymore. it's everywhere:

- 𝘁𝗲𝗿𝗺𝗶𝗻𝗮𝗹: the OG. full power. fastest. this is where the magic happens.
- 𝗩𝗦 𝗖𝗼𝗱𝗲 𝗲𝘅𝘁𝗲𝗻𝘀𝗶𝗼𝗻: inline diffs, @-mentions, sidebar conversations. for people who live in their editor.
- 𝗝𝗲𝘁𝗕𝗿𝗮𝗶𝗻𝘀 𝗽𝗹𝘂𝗴𝗶𝗻: same deal, for the IntelliJ crew.
- 𝗱𝗲𝘀𝗸𝘁𝗼𝗽 𝗮𝗽𝗽 (𝗰𝗹𝗮𝘂𝗱𝗲 𝗰𝗼𝘄𝗼𝗿𝗸): visual diff review, multiple sessions, scheduled tasks. no terminal needed. the "i don't do command lines" option.
- 𝘄𝗲𝗯 𝗮𝗽𝗽 (𝗰𝗹𝗮𝘂𝗱𝗲.𝗮𝗶/𝗰𝗼𝗱𝗲): no local setup needed. run long tasks from anywhere. open a browser and go.
- 𝗺𝗼𝗯𝗶𝗹𝗲 𝘃𝗶𝗮 𝗿𝗲𝗺𝗼𝘁𝗲 𝗰𝗼𝗻𝘁𝗿𝗼𝗹: start a session on your laptop, control it from your phone.
- 𝘀𝗹𝗮𝗰𝗸: mention @Claude in your workspace, turn issues into PRs from chat.
- 𝗴𝗶𝘁𝗵𝘂𝗯 𝗮𝗰𝘁𝗶𝗼𝗻𝘀: @claude in a PR comment and it responds with actual code changes.
- G𝗶𝘁𝗹𝗮𝗯 𝗖𝗜/𝗖𝗗: same concept for gitlab teams.
the remote control feature is underrated and nobody talks about it. you're at lunch, get a slack message about a bug, pull out your phone, tell claude to fix it. it runs on your machine at home. you review the diff on your phone. approve. done. the future is now lads.

𝗴𝗲𝘁𝘁𝗶𝗻𝗴 𝘀𝘁𝗮𝗿𝘁𝗲𝗱

𝗶𝗻𝘀𝘁𝗮𝗹𝗹:

𝘁𝗵𝗲𝗻:

that's it. no config files. no setup wizard. no 47 extensions to install. no yaml hell. just cd into your project and type claude.

𝗳𝗶𝗿𝘀𝘁 𝘁𝗵𝗶𝗻𝗴 𝘆𝗼𝘂 𝘀𝗵𝗼𝘂𝗹𝗱 𝗱𝗼:

watch it explore your codebase, read your files, understand your architecture, and give you a summary. that moment when it correctly summarizes a 20,000+ line repo for the first time that's when it clicks. that's the moment you realize this isn't autocomplete.

T𝗵𝗲 𝗺𝗼𝗱𝗲𝗹𝘀

claude code runs on anthropic's claude model family. knowing which to use and when is half the game:

- 𝗰𝗹𝗮𝘂𝗱𝗲 𝗼𝗽𝘂𝘀 𝟰.𝟲: the big brain. best reasoning. use for complex architecture decisions, tricky debugging, large refactors that touch 10+ files. when you need it to actually think.
- 𝗰𝗹𝗮𝘂𝗱𝗲 𝘀𝗼𝗻𝗻𝗲𝘁 𝟰.𝟲: the workhorse. default model. best balance of speed, cost, and quality for everyday coding. this is your daily driver.
- 𝗰𝗹𝗮𝘂𝗱𝗲 𝗵𝗮𝗶𝗸𝘂: the speedster. cheap and fast. great for simple tasks and subagents. don't sleep on this for quick questions.
𝘀𝘄𝗶𝘁𝗰𝗵 𝗺𝗼𝗱𝗲𝗹𝘀 𝗮𝗻𝘆𝘁𝗶𝗺𝗲:

here's what i learned the hard way: 𝗺𝗮𝘁𝗰𝗵 𝗲𝗳𝗳𝗼𝗿𝘁 𝘁𝗼 𝘁𝗵𝗲 𝗽𝗿𝗼𝗯𝗹𝗲𝗺. don't burn opus tokens on renaming a variable. don't use haiku for redesigning your auth system. i wasted probably $200 in my first week using opus for everything because it "felt smarter." sonnet handles 90% of tasks identically.

𝘆𝗼𝘂 𝗰𝗮𝗻 𝗮𝗹𝘀𝗼 𝗰𝗼𝗻𝘁𝗿𝗼𝗹 𝘁𝗵𝗶𝗻𝗸𝗶𝗻𝗴 𝗱𝗲𝗽𝘁𝗵 𝗶𝗻𝗱𝗲𝗽𝗲𝗻𝗱𝗲𝗻𝘁𝗹𝘆 𝗼𝗳 𝘁𝗵𝗲 𝗺𝗼𝗱𝗲𝗹:

𝗽𝗿𝗶𝗰𝗶𝗻𝗴 (𝘁𝗵𝗲 𝗿𝗲𝗮𝗹 𝘁𝗮𝗹𝗸)

𝗹𝗲𝘁'𝘀 𝗯𝗲 𝗵𝗼𝗻𝗲𝘀𝘁 𝗮𝗯𝗼𝘂𝘁 𝗺𝗼𝗻𝗲𝘆 𝗯𝗲𝗰𝗮𝘂𝘀𝗲 𝗻𝗼𝗯𝗼𝗱𝘆 𝗲𝗹𝘀𝗲 𝗶𝘀:

Real world numbers from anthropic themselves: average developer spends about $𝟲/𝗱𝗮𝘆. 90% of users are under $12/day.

here's the wild stat that sold me: one developer tracked 10 billion tokens over 8 months. on API pricing that would've been ~$15,000. on the max plan? $800. if you're using it daily (and you should be), max pays for itself by week 2.

when you hit your limits on max, you can enable "extra usage" billed at API rates. no hard cutoff. no "sorry, come back tomorrow."

𝗰𝗼𝘀𝘁 𝗺𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝘁𝗶𝗽𝘀 𝗶 𝘄𝗶𝘀𝗵 𝗶 𝗸𝗻𝗲𝘄 𝗱𝗮𝘆 𝟭:

𝘁𝗵𝗲 .𝗰𝗹𝗮𝘂𝗱𝗲 𝗳𝗼𝗹𝗱𝗲𝗿 𝘆𝗼𝘂𝗿 𝗽𝗿𝗼𝗷𝗲𝗰𝘁'𝘀 𝗰𝗼𝗻𝘁𝗿𝗼𝗹 𝗰𝗲𝗻𝘁𝗲𝗿

this is where most people leave 80% of the value on the table. the .claude folder is not a black box. it's the control center for how claude behaves in your project.

and here's what most people don't realize: 𝘁𝗵𝗲𝗿𝗲 𝗮𝗿𝗲 𝘁𝘄𝗼 .𝗰𝗹𝗮𝘂𝗱𝗲 𝗱𝗶𝗿𝗲𝗰𝘁𝗼𝗿𝗶𝗲𝘀, 𝗻𝗼𝘁 𝗼𝗻𝗲.

the first lives inside your project (committed to git, shared with your team). the second lives at ~/.claude/ (personal preferences, machine-local state, session history).

![](https://pbs.twimg.com/media/HEhJCr5bwAEQynR.jpg)

𝗖𝗟𝗔𝗨𝗗𝗘.𝗺𝗱: 𝘁𝗵𝗲 𝘀𝗶𝗻𝗴𝗹𝗲 𝗺𝗼𝘀𝘁 𝗶𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁 𝗳𝗶𝗹𝗲

when you start a claude code session, the first thing it reads is CLAUDE.md. it loads it straight into the system prompt. everything in there, claude follows. every session. consistently.

if you tell claude to always write tests before implementation, it will. if you say "never use console.log, use the custom logger," it will respect that every time.

𝘄𝗵𝗮𝘁 𝘁𝗼 𝘄𝗿𝗶𝘁𝗲:

- build, test, and lint commands (npm run test, make build)
- key architectural decisions ("we use a monorepo with turborepo")
- non-obvious gotchas ("typescript strict mode is on, unused variables are errors")
- import conventions, naming patterns, error handling styles
- file and folder structure for the main modules
𝘄𝗵𝗮𝘁 𝗡𝗢𝗧 𝘁𝗼 𝘄𝗿𝗶𝘁𝗲:

- anything that belongs in a linter or formatter config (prettier handles that, not CLAUDE.md)
- full documentation you can already link to
- long paragraphs explaining theory
𝗸𝗲𝗲𝗽 𝗶𝘁 𝘂𝗻𝗱𝗲𝗿 𝟮𝟬𝟬 𝗹𝗶𝗻𝗲𝘀. files longer than that start eating too much context, and claude's instruction adherence actually drops. i learned this the hard way when my 400-line CLAUDE.md was getting half-ignored. cut it to 150 lines, everything got better.

𝗵𝗲𝗿𝗲'𝘀 𝘄𝗵𝗮𝘁 𝗮 𝘀𝗼𝗹𝗶𝗱 𝗖𝗟𝗔𝗨𝗗𝗘.𝗺𝗱 𝗹𝗼𝗼𝗸𝘀 𝗹𝗶𝗸𝗲:

that's 20 lines. it gives claude everything it needs to work productively in this codebase without constant clarification.

𝗖𝗟𝗔𝗨𝗗𝗘.𝗹𝗼𝗰𝗮𝗹.𝗺𝗱: 𝘆𝗼𝘂𝗿 𝗽𝗲𝗿𝘀𝗼𝗻𝗮𝗹 𝗼𝘃𝗲𝗿𝗿𝗶𝗱𝗲𝘀

sometimes you have preferences that are just yours, not the team's. maybe you prefer a different test runner. maybe you want claude to always open files in a specific pattern.

create CLAUDE.local.md in your project root. claude reads it alongside the main CLAUDE.md, and it's automatically gitignored so your personal tweaks never land in the repo.

𝘁𝗵𝗲 𝗿𝘂𝗹𝗲𝘀/ 𝗳𝗼𝗹𝗱𝗲𝗿 𝗺𝗼𝗱𝘂𝗹𝗮𝗿 𝗶𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 𝘁𝗵𝗮𝘁 𝘀𝗰𝗮𝗹𝗲

CLAUDE.md works great for a single project. but once your team grows, you end up with a 300-line CLAUDE.md that nobody maintains and everyone ignores.

the rules/ folder solves that.

every markdown file inside .claude/rules/ gets loaded alongside your CLAUDE.md automatically:

each file stays focused. the person who owns API conventions edits api-conventions.md. the person who owns testing standards edits testing.md. nobody stomps on each other.

the real power comes from 𝗽𝗮𝘁𝗵-𝘀𝗰𝗼𝗽𝗲𝗱 𝗿𝘂𝗹𝗲𝘀. add YAML frontmatter and the rule only activates when claude is working with matching files:

𝗔𝗣𝗜 𝗗𝗲𝘀𝗶𝗴𝗻 𝗥𝘂𝗹𝗲𝘀

- All handlers return { data, error } shape
- Use zod for request body validation
- Never expose internal error details to clients
claude won't even load this when it's editing a React component. it only kicks in when working inside src/api/ or src/handlers/. clean, focused, efficient.

![](https://pbs.twimg.com/media/HEhJjYmawAAtz3M.jpg)

𝘁𝗵𝗲 𝗳𝗲𝗮𝘁𝘂𝗿𝗲𝘀 𝘁𝗵𝗮𝘁 𝗰𝗵𝗮𝗻𝗴𝗲𝗱 𝗵𝗼𝘄 𝗶 𝘄𝗼𝗿𝗸

𝗺𝘂𝗹𝘁𝗶-𝗳𝗶𝗹𝗲 𝗲𝗱𝗶𝘁𝗶𝗻𝗴

this is where claude code leaves everything else in the dust. this is the feature that made me stop using anything else for serious work.

it will:

- find every file touching auth
- update the middleware
- modify the routes
- change the tests
- update the config
- fix the imports
across 15+ files in one session. shows you diffs for review before applying. you approve, reject, or ask for changes on each file.

i refactored an entire express app from callbacks to async/await in one session. 23 files. every one correct. try doing that with tab completion.

𝗴𝗶𝘁 𝗶𝗻𝘁𝗲𝗴𝗿𝗮𝘁𝗶𝗼𝗻

claude code speaks git natively and it's better at commit messages than most humans i've worked with:

it writes proper commit messages not "fixed stuff" but actual descriptions of what changed and why. it creates PRs with summaries and test plans. it handles merge conflicts by actually understanding the code on both sides, not just picking a side and hoping.

𝘁𝗵𝗲 𝗮𝗴𝗲𝗻𝘁𝗶𝗰 𝗹𝗼𝗼𝗽 𝘄𝗿𝗶𝘁𝗲, 𝘁𝗲𝘀𝘁, 𝗳𝗶𝘅, 𝗿𝗲𝗽𝗲𝗮𝘁

claude doesn't just write code it runs it:

this loop is the whole point. it's not "here's some code, good luck." it's "i wrote it, tested it, fixed the edge case you didn't think of, and it passes." i've watched it catch bugs in its own code that i wouldn't have spotted for hours.

𝘀𝘂𝗯𝗮𝗴𝗲𝗻𝘁𝘀 𝘁𝗵𝗲 𝗴𝗮𝗺𝗲 𝗰𝗵𝗮𝗻𝗴𝗲𝗿 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁

this one took me 3 weeks to start using properly and i regret every day i wasted not using them.

claude can spawn specialized sub-agents to handle specific tasks in isolation:

- 𝗲𝘅𝗽𝗹𝗼𝗿𝗲 𝗮𝗴𝗲𝗻𝘁 read-only research, fast, uses haiku. perfect for "go understand how this module works."
- 𝗽𝗹𝗮𝗻 𝗮𝗴𝗲𝗻𝘁  analyzes before implementing. the "think before you code" enforcer.
- 𝗴𝗲𝗻𝗲𝗿𝗮𝗹 𝗮𝗴𝗲𝗻𝘁 complex multi-step tasks in a clean context.
why this matters: when you ask claude to run your full test suite, that output hundreds of lines of pass/fail.. floods your context window. your main conversation gets polluted with noise. subagents handle it in isolation. they do the messy work, compress the findings, and send back a clean summary.

![](https://pbs.twimg.com/media/HEhKSyUaYAABZ1O.jpg)

you can also create custom agents for your specific workflows:

now claude automatically delegates security reviews to your custom agent when relevant. or you can call it explicitly: type /security-reviewer and it spins up.

the tools field is intentional.. a security auditor only needs Read, Grep, and Glob. it has no business writing files. the model field lets you use haiku for cheap read-only tasks and save opus for the ones that actually need deep reasoning.

personal agents go in ~/.claude/agents/ and are available across all your projects.

𝗠𝗖𝗣 𝗺𝗼𝗱𝗲𝗹 𝗰𝗼𝗻𝘁𝗲𝘅𝘁 𝗽𝗿𝗼𝘁𝗼𝗰𝗼𝗹 (𝘁𝗵𝗲 𝘀𝗲𝗰𝗿𝗲𝘁 𝘄𝗲𝗮𝗽𝗼𝗻)

this is where claude code goes from "good coding assistant" to "orchestration layer for my entire workflow."

𝗠𝗖𝗣 𝗹𝗲𝘁𝘀 𝗰𝗹𝗮𝘂𝗱𝗲 𝗰𝗼𝗻𝗻𝗲𝗰𝘁 𝘁𝗼 𝗲𝘅𝘁𝗲𝗿𝗻𝗮𝗹 𝘁𝗼𝗼𝗹𝘀 𝗮𝗻𝗱 𝘀𝗲𝗿𝘃𝗶𝗰𝗲𝘀:

- 𝗴𝗶𝘁𝗵𝘂𝗯: search repos, read issues, manage PRs, review code
- 𝘀𝗹𝗮𝗰𝗸: read channels, post messages, respond to threads
- 𝗽𝗼𝘀𝘁𝗴𝗿𝗲𝘀/𝗺𝘆𝘀𝗾𝗹: query your database directly
- 𝗷𝗶𝗿𝗮: update tickets, change statuses
- 𝗳𝗶𝗴𝗺𝗮: read designs (yes, really)
- 𝗽𝘂𝗽𝗽𝗲𝘁𝗲𝗲𝗿/𝗽𝗹𝗮𝘆𝘄𝗿𝗶𝗴𝗵𝘁: browser automation
- 𝘀𝗲𝗻𝘁𝗿𝘆: error monitoring
- 𝗻𝗼𝘁𝗶𝗼𝗻: read and write docs
𝗰𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗲 𝗶𝘁 𝗶𝗻 .𝗺𝗰𝗽.𝗷𝘀𝗼𝗻 𝗮𝘁 𝘆𝗼𝘂𝗿 𝗽𝗿𝗼𝗷𝗲𝗰𝘁 𝗿𝗼𝗼𝘁:

𝗻𝗼𝘄 𝘆𝗼𝘂 𝗰𝗮𝗻 𝗱𝗼 𝘁𝗵𝗶𝗻𝗴𝘀 𝗹𝗶𝗸𝗲:

one tool, connected to everything. i have claude pulling github issues, reading my database, and posting summaries to slack in one conversation. no switching tabs. no context switching. no copy-pasting between tools.

![](https://pbs.twimg.com/media/HEhKlfybAAABPdZ.jpg)

𝗵𝗼𝗼𝗸𝘀: 𝗱𝗲𝘁𝗲𝗿𝗺𝗶𝗻𝗶𝘀𝘁𝗶𝗰 𝗮𝘂𝘁𝗼𝗺𝗮𝘁𝗶𝗼𝗻

here's the thing about CLAUDE.md instructions, they're suggestions. claude follows them most of the time, not all of the time. you can't rely on a language model to always run your linter. always format your code. always check for dangerous commands.

hooks make these behaviors 𝗱𝗲𝘁𝗲𝗿𝗺𝗶𝗻𝗶𝘀𝘁𝗶𝗰. they're event handlers that fire automatically at specific points in claude's workflow. your shell script runs every time, no exceptions.

𝘁𝗵𝗲 𝗲𝘃𝗲𝗻𝘁𝘀 𝘆𝗼𝘂'𝗹𝗹 𝘂𝘀𝗲 𝗺𝗼𝘀𝘁:

- 𝗣𝗿𝗲𝗧𝗼𝗼𝗹𝗨𝘀𝗲: fires before any tool runs. your security gate. block dangerous commands here.
- 𝗣𝗼𝘀𝘁𝗧𝗼𝗼𝗹𝗨𝘀𝗲: fires after a tool succeeds. auto-format, auto-lint, auto-validate.
- 𝗦𝘁𝗼𝗽: fires when claude finishes a task. quality gate. "tests must pass before you're done."
- 𝗨𝘀𝗲𝗿𝗣𝗿𝗼𝗺𝗽𝘁𝗦𝘂𝗯𝗺𝗶𝘁: fires when you press enter. prompt validation.
- 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻: desktop alerts when claude needs your attention.
here's a real hooks config that auto-formats every file claude touches and blocks dangerous bash commands:

the bash firewall script reads the command from stdin, checks it against dangerous patterns (rm -rf, git push --force, DROP TABLE), and exits with code 2 to block it. exit 0 = let it through. exit 1 = warn but continue. exit 2 = block completely.

a Stop hook that runs npm test and exits with code 2 on failure will prevent claude from declaring "done" until the suite is green. no more "i'm done!" when 3 tests are failing.

hooks don't hot-reload mid-session, restart if you change them. and they run with your full user permissions, so quote your shell variables and validate your JSON input.

![](https://pbs.twimg.com/media/HEhWKv_aoAAloE3.jpg)

𝘀𝗸𝗶𝗹𝗹𝘀: 𝗿𝗲𝘂𝘀𝗮𝗯𝗹𝗲 𝘄𝗼𝗿𝗸𝗳𝗹𝗼𝘄𝘀 𝗼𝗻 𝗱𝗲𝗺𝗮𝗻𝗱

skills are the feature that made me realize how deep this rabbit hole goes.

a skill is a workflow that claude can invoke on its own based on context, or that you can trigger with a slash command. skills watch the conversation and act when the moment is right.

𝗲𝗮𝗰𝗵 𝘀𝗸𝗶𝗹𝗹 𝗹𝗶𝘃𝗲𝘀 𝗶𝗻 𝗶𝘁𝘀 𝗼𝘄𝗻 𝘀𝘂𝗯𝗱𝗶𝗿𝗲𝗰𝘁𝗼𝗿𝘆 𝘄𝗶𝘁𝗵 𝗮 𝗦𝗞𝗜𝗟𝗟.𝗺𝗱 𝗳𝗶𝗹𝗲:

𝘁𝗵𝗲 𝗦𝗞𝗜𝗟𝗟.𝗺𝗱 𝘂𝘀𝗲𝘀 𝗬𝗔𝗠𝗟 𝗳𝗿𝗼𝗻𝘁𝗺𝗮𝘁𝘁𝗲𝗿 𝘁𝗼 𝗱𝗲𝘀𝗰𝗿𝗶𝗯𝗲 𝘄𝗵𝗲𝗻 𝘁𝗼 𝗮𝗰𝘁𝗶𝘃𝗮𝘁𝗲:

## name: security-review
description: Comprehensive security audit. Use when reviewing code for
vulnerabilities, before deployments, or when the user mentions security.
allowed-tools: Read, Grep, Glob

Analyze the codebase for security vulnerabilities:

1. SQL injection and XSS risks
2. Exposed credentials or secrets
3. Insecure configurations
4. Authentication and authorization gaps
Report findings with severity ratings and specific remediation steps.
Reference @DETAILED_GUIDE.md for our security standards.

when you say "review this PR for security issues," claude reads the description, recognizes it matches, and invokes the skill automatically. or you call it directly: /security-review.

the key difference from commands: 𝘀𝗸𝗶𝗹𝗹𝘀 𝗰𝗮𝗻 𝗯𝘂𝗻𝗱𝗹𝗲 𝘀𝘂𝗽𝗽𝗼𝗿𝘁𝗶𝗻𝗴 𝗳𝗶𝗹𝗲𝘀 𝗮𝗹𝗼𝗻𝗴𝘀𝗶𝗱𝗲 𝘁𝗵𝗲𝗺. the @DETAILED_GUIDE.md reference pulls in a detailed document that lives right next to SKILL.md. commands are single files. skills are packages.

the /last30days skill that went viral on X is a perfect example, someone built a skill that scans Reddit and X from the last 30 days on any topic, synthesizes what the community has figured out, and writes you ready-to-use prompts. type /last30days prompting techniques for legal questions and it returns frameworks real lawyers and power users are actually using. that's the kind of thing you can build with skills.

personal skills go in ~/.claude/skills/ and are available across all your projects.

𝗽𝗹𝗮𝗻 𝗺𝗼𝗱𝗲: 𝘁𝗵𝗶𝗻𝗸 𝗯𝗲𝗳𝗼𝗿𝗲 𝘆𝗼𝘂 𝗯𝘂𝗶𝗹𝗱

this one saved me from myself more times than i can count.

𝗯𝗲𝗳𝗼𝗿𝗲 𝘆𝗼𝘂 𝗹𝗲𝘁 𝗰𝗹𝗮𝘂𝗱𝗲 𝗹𝗼𝗼𝘀𝗲 𝗼𝗻 𝗮 𝗯𝗶𝗴 𝗿𝗲𝗳𝗮𝗰𝘁𝗼𝗿:

claude explores your codebase, reads the relevant files, analyzes the architecture then presents a plan. no changes made. nothing modified. just analysis and a proposed approach.

you review it. adjust it. ask questions. poke holes. then when you're confident, approve and let it implement.

this prevents the "claude rewrote my entire project and i didn't ask for that" moment. trust me, that moment is not fun. plan first, build second. always.

𝗺𝗲𝗺𝗼𝗿𝘆 𝘀𝘆𝘀𝘁𝗲𝗺: 𝗶𝘁 𝗴𝗲𝘁𝘀 𝘀𝗺𝗮𝗿𝘁𝗲𝗿 𝘁𝗵𝗲 𝗺𝗼𝗿𝗲 𝘆𝗼𝘂 𝘂𝘀𝗲 𝗶𝘁

claude remembers things across sessions. automatically.

correct it once "don't use class components in this project, we use hooks" and it saves that preference. next session, it already knows. you don't repeat yourself.

manage it with /memory. stored at ~/.claude/projects/<project>/memory/.

the combination of CLAUDE.md (team knowledge) + auto memory (personal learning) means 𝗰𝗹𝗮𝘂𝗱𝗲 𝗰𝗼𝗺𝗽𝗼𝘂𝗻𝗱𝘀. it gets better the more you use it. week 1 claude and week 8 claude on the same project are different animals.

𝗰𝗼𝗺𝗽𝘂𝘁𝗲𝗿 𝘂𝘀𝗲

this one dropped in march 2026 and it's wild.

claude can now control your computer directly:

- open applications
- navigate browsers
- fill out spreadsheets
- interact with any GUI
- take screenshots and react to what it sees
no setup required. works from your phone via remote control.

i haven't gone deep on this one yet still experimenting. but the implications are insane. imagine telling claude to "open figma, screenshot the latest design, then implement it in react." we're getting there.

𝗽𝗼𝘄𝗲𝗿 𝘂𝘀𝗲𝗿 𝘄𝗼𝗿𝗸𝗳𝗹𝗼𝘄𝘀

these are the patterns that took me from "using claude code" to "being dangerous with claude code." none of this is in the docs.

𝘁𝗵𝗲 "𝗶𝗻𝘁𝗲𝗿𝘃𝗶𝗲𝘄 𝗺𝗲" 𝘁𝗲𝗰𝗵𝗻𝗶𝗾𝘂𝗲

starting a complex project? don't write a massive prompt. don't try to think of everything upfront. just say:

let claude ask YOU the questions. it'll ask about tech stack, requirements, edge cases, existing code, deployment targets, user types things you'd forget to mention in a prompt. 10 minutes of back-and-forth gives claude better context than a 500-word prompt ever could.

i use this for every new feature now. every single one.

𝘁𝗵𝗲 𝗿𝗲𝘀𝗲𝗮𝗿𝗰𝗵 → 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝘀𝗽𝗹𝗶𝘁

never let claude implement something it doesn't understand first.

the quality difference between "just build it" and "understand it first, then build it" is night and day. especially on legacy codebases where nothing is where you'd expect it.

𝗽𝗮𝗿𝗮𝗹𝗹𝗲𝗹 𝘄𝗼𝗿𝗸 𝘄𝗶𝘁𝗵 𝘄𝗼𝗿𝗸𝘁𝗿𝗲𝗲𝘀

each gets an isolated git branch. two features developed simultaneously by two separate claude sessions. merge when ready.

i run 3 worktrees sometimes. auth feature in terminal 1, API endpoint in terminal 2, test suite in terminal 3. all running in parallel. all isolated. it's obscene productivity.

𝘁𝗵𝗲 𝗰𝗼𝗻𝘁𝗲𝘅𝘁 𝗺𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝗴𝗮𝗺𝗲

𝘁𝗵𝗶𝘀 𝗶𝘀 𝘁𝗵𝗲 #𝟭 𝘀𝗸𝗶𝗹𝗹 𝘁𝗵𝗮𝘁 𝘀𝗲𝗽𝗮𝗿𝗮𝘁𝗲𝘀 𝗴𝗼𝗼𝗱 𝗰𝗹𝗮𝘂𝗱𝗲 𝗰𝗼𝗱𝗲 𝘂𝘀𝗲𝗿𝘀 𝗳𝗿𝗼𝗺 𝗴𝗿𝗲𝗮𝘁 𝗼𝗻𝗲𝘀.

the context window is ~200K tokens. sounds like a lot. it's not when you're deep in a session. as it fills up:

- older tool outputs get cleared first
- conversation gets auto-summarized
- early instructions may be lost
𝗺𝗮𝗻𝗮𝗴𝗲 𝗶𝘁 𝗮𝗰𝘁𝗶𝘃𝗲𝗹𝘆:

𝘁𝗵𝗲 𝗴𝗼𝗹𝗱𝗲𝗻 𝗿𝘂𝗹𝗲: after two failed attempts at something, stop. don't keep going. /clear and write a better initial prompt from scratch. a fresh context with a clear prompt almost always works better than a polluted context full of failed approaches. i learned this at the cost of about 6 hours of wasted time.

𝘁𝗵𝗲 ! 𝗽𝗿𝗲𝗳𝗶𝘅 𝘁𝗿𝗶𝗰𝗸

𝘁𝘆𝗽𝗲 ! 𝗯𝗲𝗳𝗼𝗿𝗲 𝗮𝗻𝘆 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝘁𝗼 𝗿𝘂𝗻 𝗶𝘁 𝗱𝗶𝗿𝗲𝗰𝘁𝗹𝘆 𝗶𝗻 𝘆𝗼𝘂𝗿 𝘀𝗵𝗲𝗹𝗹 𝘄𝗶𝘁𝗵𝗼𝘂𝘁 𝗰𝗹𝗮𝘂𝗱𝗲:

the output gets added to claude's context automatically. great for quickly showing claude what's happening without asking it to run the command and waiting for permission prompts.

𝗲𝘅𝘁𝗲𝗿𝗻𝗮𝗹 𝗲𝗱𝗶𝘁𝗼𝗿 𝗳𝗼𝗿 𝗹𝗼𝗻𝗴 𝗽𝗿𝗼𝗺𝗽𝘁𝘀

Ctrl+G opens your system editor (vim, VS Code, whatever you have set). write complex multi-line prompts with syntax highlighting. save and close it sends to claude.

way better than typing a paragraph into a single-line terminal input. i use this for every prompt longer than 2 sentences now.

𝘁𝗵𝗲 𝗱𝗼𝘂𝗯𝗹𝗲-𝗲𝘀𝗰𝗮𝗽𝗲 𝗿𝗲𝘄𝗶𝗻𝗱

this one's clutch and nobody mentions it.

claude went the wrong direction? double-tap Escape, and you get a rewind menu. you can undo the last action, go back further, or "summarize from here" which compresses the failed attempt while keeping the useful context. way better than /clear because you don't lose everything, just the mistake.

![](https://pbs.twimg.com/media/HEg-Ti7boAAo3sV.png)

print this table. tape it to your monitor. seriously.

𝗽𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗺𝗼𝗱𝗲𝘀

claude code has different levels of autonomy. knowing when to use each is important:

![](https://pbs.twimg.com/media/HEg-kfBbIAA7L7s.png)

start with default. move to acceptEdits once you trust it (took me about a week). use plan for exploration before big refactors.

𝘆𝗼𝘂 𝗰𝗮𝗻 𝗮𝗹𝘀𝗼 𝘄𝗵𝗶𝘁𝗲𝗹𝗶𝘀𝘁 𝗮𝗻𝗱 𝗯𝗹𝗮𝗰𝗸𝗹𝗶𝘀𝘁 𝘀𝗽𝗲𝗰𝗶𝗳𝗶𝗰 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗶𝗻 .𝗰𝗹𝗮𝘂𝗱𝗲/𝘀𝗲𝘁𝘁𝗶𝗻𝗴𝘀.𝗷𝘀𝗼𝗻:

the allow list runs without asking. the deny list is blocked entirely. anything not in either list claude asks first. that middle ground is intentional. safety net without micromanaging every command.

𝗰𝗹𝗮𝘂𝗱𝗲 𝗰𝗼𝗱𝗲 𝘃𝘀 𝗰𝘂𝗿𝘀𝗼𝗿 𝘃𝘀 𝗰𝗼𝗽𝗶𝗹𝗼𝘁

𝘁𝗵𝗲 𝗵𝗼𝗻𝗲𝘀𝘁 𝗰𝗼𝗺𝗽𝗮𝗿𝗶𝘀𝗼𝗻. 𝗻𝗼 𝗳𝗮𝗻𝗯𝗼𝘆 𝗲𝗻𝗲𝗿𝗴𝘆. 𝗷𝘂𝘀𝘁 𝘄𝗵𝗮𝘁 𝗶'𝘃𝗲 𝗲𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗲𝗱:

𝗰𝗹𝗮𝘂𝗱𝗲 𝗰𝗼𝗱𝗲: terminal-native, truly agentic. reads your entire codebase. autonomous multi-file changes. best for: complex refactors, architecture decisions, codebase-wide changes, debugging gnarly issues, anything touching more than 3 files. feels like a calm senior engineer who never gets tired and never judges your code.

𝗰𝘂𝗿𝘀𝗼𝗿 IDE-native (VS Code fork). best daily driver for tab completions and inline suggestions. tighter feedback loop in the editor. less autonomous but faster for small changes. best for: quick edits, inline completions, staying in flow while writing code.

𝗴𝗶𝘁𝗵𝘂𝗯 𝗰𝗼𝗽𝗶𝗹𝗼𝘁: plugin approach. best free tier ($10/mo). safest corporate choice. agentic capabilities are improving but still lag behind both claude code and cursor.

here's what most people don't realize: 𝘆𝗼𝘂 𝗱𝗼𝗻'𝘁 𝗵𝗮𝘃𝗲 𝘁𝗼 𝗽𝗶𝗰𝗸 𝗼𝗻𝗲.

the combo strategy is real and it's what most power users actually do. cursor for daily tab completions and inline edits. claude code for the heavy lifting refactors, new features, debugging, architecture decisions.

the data backs this up: experienced developers use 𝟮.𝟯 𝗔𝗜 𝗰𝗼𝗱𝗶𝗻𝗴 𝘁𝗼𝗼𝗹𝘀 on average. it's not about replacing one with the other. it's about using the right tool for the right job.

claude code went from zero to the #𝟭 𝗺𝗼𝘀𝘁 𝗹𝗼𝘃𝗲𝗱 𝗔𝗜 𝗰𝗼𝗱𝗶𝗻𝗴 𝘁𝗼𝗼𝗹 in under a year. 46% of developers rated it their favorite in early 2026 surveys. 95% of developers now use AI tools weekly. 75% use AI for more than half their coding.

the game has changed. permanently. the question isn't whether to use AI coding tools. it's how fast you can get good at them.

𝘁𝗵𝗲 𝗰𝗹𝗮𝘂𝗱𝗲 𝗰𝗼𝗱𝗲 𝗲𝗰𝗼𝘀𝘆𝘀𝘁𝗲𝗺

the community has built an insane amount of tooling on top of claude code. here are the ones worth knowing:

𝘀𝘂𝗽𝗲𝗿𝗽𝗼𝘄𝗲𝗿𝘀 (obra/superpowers): a full development methodology for AI coding agents. 117K+ stars on github. it changes how your agent writes code forces it to brainstorm first, create detailed implementation plans, launch subagent-driven development, and do two-stage code review before declaring done. if you feel like claude code produces "spaghetti" sometimes, this is the fix.

𝗚𝗦𝗗 𝗴𝗲𝘁 𝘀𝗵𝗶𝘁 𝗱𝗼𝗻𝗲 (gsd-build/get-shit-done) a meta-prompting and context management system for claude code. lightweight but powerful. solves the context degradation problem.

𝗮𝘄𝗲𝘀𝗼𝗺𝗲-𝗰𝗹𝗮𝘂𝗱𝗲-𝗰𝗼𝗱𝗲 community-curated collection of the best resources, skills, agents, and MCP servers. your starting point for discovering what's out there.

/𝗹𝗮𝘀𝘁𝟯𝟬𝗱𝗮𝘆𝘀 𝘀𝗸𝗶𝗹𝗹 the one that went viral. scans Reddit, X, YouTube, Hacker News, and the web from the last 30 days on any topic you give it. synthesizes community knowledge into ready-to-use prompts. type /last30days cold email frameworks and it finds the 3 Ps framework, ADA, intention-based triggers stuff you'd never find on your own. then writes you ready-to-use prompts based on what actually works. open source, MIT license.

𝗰𝗹𝗮𝘂𝗱𝗲 𝗵𝗼𝘄-𝘁𝗼 visual, example-driven guide to mastering claude code. best resource for visual learners who want structured tutorials.

𝗰𝗹𝗮𝘂𝗱𝗲 𝗺𝗲𝗺 persistent memory layer. if the built-in memory system isn't enough for your workflow.

𝗨𝗜 𝗨𝗫 𝗽𝗿𝗼 𝗺𝗮𝘅 design-focused tooling for claude code. for when you want claude to care about how things look, not just how they work.

𝗻𝟴𝗻-𝗠𝗖𝗣 connects claude code to n8n workflow automation. if you're already using n8n, this is a no-brainer integration.

the ecosystem is growing fast. new tools every week. these are the ones i've actually used or seen produce real results. not a curated list of everything just the ones that matter right now.

𝗰𝗼𝗺𝗺𝗼𝗻 𝗺𝗶𝘀𝘁𝗮𝗸𝗲𝘀 (𝗶 𝗺𝗮𝗱𝗲 𝗮𝗹𝗹 𝗼𝗳 𝘁𝗵𝗲𝘀𝗲)

𝟭. 𝘄𝗿𝗶𝘁𝗶𝗻𝗴 𝗮 𝗻𝗼𝘃𝗲𝗹 𝗶𝗻 𝗖𝗟𝗔𝗨𝗗𝗘.𝗺𝗱
keep it under 200 lines. specific. actionable. if claude's ignoring your instructions, your CLAUDE.md is probably too long. i had a 400-line one that was basically a manifesto. cut it to 150, everything improved.

𝟮. 𝗻𝗼𝘁 𝘂𝘀𝗶𝗻𝗴 /𝗰𝗹𝗲𝗮𝗿 𝗯𝗲𝘁𝘄𝗲𝗲𝗻 𝘁𝗮𝘀𝗸𝘀
a conversation about fixing a CSS bug has zero useful context for implementing a new API endpoint. the leftover context actively hurts performance. clear it. start fresh. every time.

𝟯. 𝗳𝗶𝗴𝗵𝘁𝗶𝗻𝗴 𝗶𝘁 𝗶𝗻𝘀𝘁𝗲𝗮𝗱 𝗼𝗳 𝗿𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴
after two failed attempts, the context is polluted with wrong approaches. claude starts referencing its own mistakes. /clear and write a better prompt. the fresh context almost always nails it. i wasted 6 hours once before learning this.

𝟰. 𝗻𝗼𝘁 𝘂𝘀𝗶𝗻𝗴 𝘀𝘂𝗯𝗮𝗴𝗲𝗻𝘁𝘀
running a full test suite in your main conversation floods the context with hundreds of lines of output. delegate to a subagent. keep your main conversation clean and focused on the actual work.

𝟱. 𝘂𝘀𝗶𝗻𝗴 𝗼𝗽𝘂𝘀 𝗳𝗼𝗿 𝗲𝘃𝗲𝗿𝘆𝘁𝗵𝗶𝗻𝗴
sonnet handles 90% of tasks perfectly. opus is for the 10% that actually needs deep reasoning complex architecture, tricky debugging, subtle logic errors. your wallet will thank you. mine did.

𝟲. 𝗶𝗴𝗻𝗼𝗿𝗶𝗻𝗴 𝗽𝗹𝗮𝗻 𝗺𝗼𝗱𝗲 𝗳𝗼𝗿 𝗯𝗶𝗴 𝗰𝗵𝗮𝗻𝗴𝗲𝘀
always plan first on anything touching more than 3 files. always. the 5 minutes you spend reviewing a plan saves you 2 hours of cleanup when claude goes in the wrong direction.

𝟳. 𝗻𝗼𝘁 𝗺𝗮𝗻𝗮𝗴𝗶𝗻𝗴 𝗰𝗼𝗻𝘁𝗲𝘅𝘁 𝗮𝗰𝘁𝗶𝘃𝗲𝗹𝘆
the context window is a resource. treat it like one. /compact when it's getting long. subagents for verbose operations. CLAUDE.md for instructions instead of repeating them every session. the people who manage context well get dramatically better results than those who don't.

𝘁𝗵𝗲 𝗯𝗼𝘁𝘁𝗼𝗺 𝗹𝗶𝗻𝗲

claude code isn't a tool. it's a teammate.

one that reads your entire codebase, follows your coding standards, runs your tests, creates your PRs, remembers your preferences, connects to all your tools, and gets better the more you use it.

i've been at this for 2 months. i've done the courses, got the certs, built projects daily. and i can tell you with absolute confidence the developers who learn to work WITH claude code, not just paste code at it, are shipping at a pace that would've been unthinkable a year ago.

it's 2026. you have access to an AI agent that can autonomously navigate a 50,000-line codebase, make surgical multi-file changes, run your tests, fix its own bugs, and create pull requests with documentation. your ancestors would have dreamed of this.

stop bookmarking articles about AI. start building with it.

if this helped you, share it with someone who's still copy-pasting into chatgpt. they need this more than you do.

find me → @axel_bitblaze69
