你是一个翻译助手。请把下面的 Markdown 内容翻译成简体中文。
[TransCrab Translation Profile]
- mode: auto
- audience: general
- style: conversational
- auto-resolved-mode: refined
- auto-resolved-audience: general
- auto-resolved-style: conversational
- auto-reasons: 公开发布默认使用 refined 流程，优先质量与稳定性；生活叙事关键词命中较高，判定为 life
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
## The Lobster Everyone Knows

[OpenClaw](https://github.com/openclaw/openclaw) has north of 100K GitHub stars. It also has [three names](https://en.wikipedia.org/wiki/OpenClaw). Started as ClawdBot, became MoltBot after Anthropic sent a trademark complaint in January 2026, then settled on OpenClaw. During one of those renames, [crypto scammers hijacked the old accounts in about ten seconds](https://dev.to/sivarampg/from-clawdbot-to-moltbot-how-a-cd-crypto-scammers-and-10-seconds-of-chaos-took-down-the-4eck) and pumped a fake token to $16 million. It has a Wikipedia page now. The whole thing is wild.

[Peter Steinberger](https://github.com/openclaw/openclaw) built it. A proactive AI assistant that talks to you on WhatsApp, Telegram, Slack, Discord, iMessage, whatever. People kept posting “I told it to do X and a few hours later it was done.” Someone claimed Claude called them on the phone. Whether or not that’s exaggerated, the project is impressive and Peter knows his shit far more than I do.

One thing stuck with me though. Peter seemed to have built or used his own harness instead of Claude Code. His own browser automation too, not Playwright as an MCP. I dug into the GitHub and found [the engine underneath OpenClaw is a coding agent called Pi](https://lucumr.pocoo.org/2026/1/31/pi/), built by [Mario Zechner](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/). The guy who made libGDX. Peter and Mario know each other. Everyone’s talking about the lobster. I want to talk about the engine.

## Every Tool I’ve Tried

To explain why Pi matters to me, I need to give you the timeline. It’s long.

I started like most people. Copying and pasting code blocks into [ChatGPT](https://chatgpt.com/). Then moved to [Claude](https://claude.ai/). Then started pasting entire codebases using tools like [PasteMax](https://github.com/kleneway/pastemax) by [Kevin Leanway](https://www.youtube.com/watch?v=YV-pZSDNnPo). I watched his [videos about planning workflows](https://www.youtube.com/watch?v=gXmakVsIbF0) and learned a lot from them. Then came some VS Code extensions that let you talk to the model inside the IDE. [Copilot](https://github.com/features/copilot) completions never clicked for me until one day they did. Side story.

Then [Cursor](https://cursor.com/). I used [Augment](https://www.augmentcode.com/) for a few months too. I thought Augment was superior during the window I was on it. My monthly spend across these tools with overages hit $100-$150. That’s when [Claude Code](https://claude.ai/code) entered the picture. It was API-only at first, so I saved it for things the other tools couldn’t handle. When Claude Plans launched, I jumped the same day. I was already using it more than anything else.

I also tried [Kilo Code](https://kilocode.ai/), [Windsurf](https://windsurf.com/), [ChatLLM](https://chatllm.abacus.ai/) (underrated), [Roo Code](https://github.com/RooVetGit/Roo-Code), and more IDE plugins than I can list. I liked how Kilo Code handled the planning phase with when/then statements. [Gravity](https://gravity.dev/) showed up more recently and is worth watching. But Claude Code felt like the answer. I had a rhythm. Rough estimations for how long things would take. Greenfield, brownfield, whatever. With enough hand-holding and context management it was getting shit done. Infinitely more than the old days. I was happy.

The more I built, the more I wanted to build. That feedback loop is its own subject.

## The Context Window Problem

Claude Code eats context. Or I eat context. Someone could say “that’s on you, you’re not feeding it the right stuff.” Fair enough, sometimes. But I’d start a session, have it read some files, and 50% of my context window was gone before I’d asked it to do anything. The system prompts, the MCPs, whatever Claude injects before you type a single character. I’ve [written about this frustration before](https://www.onuruzunismail.com/blog/ralphio-while-loops-and-context). My personal rule: once I hit 70K tokens, I’m in the yellow zone. Over 100K, time to wrap up and start fresh.

I kept trying to fix this. [Gemini CLI](https://github.com/google-gemini/gemini-cli) became a thing and I tried it. People loved 2.5 Pro for coding, then lost their shit when 3 Pro dropped. I used the CLI before Gemini 3 and it made some sense for lighter tasks, but it was never a replacement. I use Gemini Pro daily for plenty of things, but coding isn’t one of them. Maybe I’m too tuned to how Claude thinks.

[OpenCode](https://opencode.ai/) was around. Its pitch is any model, any provider. But anything other than Claude felt off to me, and if I’m going to use Claude anyway, why learn a new tool’s feel when Claude’s own tool works well enough? Then GLM showed up. GLM is the RC Cola of Claude. Somewhat dependable. Can do some tasks better than Gemini Pro but not as good as Claude. I think that’s their own claim too. Off-brand Claude, and I love it for that.

Then I found [Oh My OpenCode](https://github.com/code-yeongyu/oh-my-opencode). A plugin for OpenCode that splits work across specialized agents: Sisyphus, Prometheus, Atlas, Hephaestus. Each agent has its own role with strict guardrails, not just prompt-based but hard-coded hooks. I liked how they thought about the problem. Atlas in particular seemed to handle context compaction. Sessions could run long without the context window blowing up. That was interesting.

Then Anthropic restricted OAuth access and [cited Oh My OpenCode as justification for blocking OpenCode](https://github.com/code-yeongyu/oh-my-opencode). The tool you pay for and depend on gets to set arbitrary-feeling rules that you follow or you’re out. That felt weird.

Meanwhile, when Claude Code was maxed out for the day, I felt like a fish out of water. That dependency bothered me.

## The Engine Nobody Talks About

Back to Peter and OpenClaw. His mention of a custom harness sent me digging. That’s when I found [Pi](https://github.com/badlogic/pi-mono/tree/main).

Mario Zechner built it. He went through a similar path to mine. Copying and pasting into ChatGPT, then Copilot, then Cursor, then Claude Code. Unlike me, he could build the tool he wanted. His philosophy: strip away all the bloat. [Four tools. Read, Write, Edit, Bash.](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) System prompt under 1,000 tokens. That’s it. All the AI needs is to read files, write files, edit files, and run commands. Everything else is noise.

I was skeptical. Another coding TUI. What could be different. I installed it on a VPS with GLM to have access from wherever. I’ve been [tinkering with running AI outside the usual channels](https://www.onuruzunismail.com/blog/local-ai-tools) for a while now. For some reason I’m still afraid to put Claude on a VPS. I know there’s no reason for that fear but it’s there.

As [Armin Ronacher wrote](https://lucumr.pocoo.org/2026/1/31/pi/) (Armin is a friend of Mario’s, and it’s interesting that these guys who deliver awesome shit tend to be friends with each other. I wish I had friends like that), Pi is interesting because of its tiny core and its extension system. It makes up for having almost nothing built in by letting extensions persist state into sessions. The agent can extend itself. You don’t download a plugin. You tell the agent to build one. [The repo has 11K+ stars](https://github.com/badlogic/pi-mono/tree/main), which sounds like a lot until you compare it to OpenClaw. The lobster gets the attention. The engine gets quietly forked into production.

## The Context Surprise

I started using Pi more. Then I noticed the token counts.

I had it read a pile of documents. It completed multiple tasks. I looked at the context usage and I was not at 50%. What the fuck is happening.

With Claude Code, that same workload would have put me deep into the yellow zone. With Pi, the context was barely warm. The output was cleaner, and it seemed to understand the codebase better with less to chew on.

This is the thing that got me. Context efficiency is something everyone talks about, and Claude Code’s token usage gets treated as the normal baseline. I accepted it too. But Pi showed me that baseline is bloated. The question becomes: what are Claude Code and OpenCode stuffing into the context that Pi doesn’t? MCPs eat tokens, sure. But the gap is too big to explain with MCPs alone. There’s a pile of system prompts and tool definitions and injected instructions that you never see and never asked for.

Mario’s bet was that most of it is unnecessary. Four tools and a short prompt. The model is smart enough to figure out the rest. Based on my experience, he was right.

## One Person’s Project

Pi is one person’s work. Mario could walk away tomorrow. That’s the risk with any project like this. OpenClaw’s rebrand chaos showed what happens when governance is thin and things move fast. Crypto scammers don’t wait for your community decision-making process.

But the code is open. You can fork it. You own it. And maybe that’s the future anyway. [Small tools, built for you](https://www.onuruzunismail.com/blog/the-interfaceless-interface), maintained by you. Your agent extending itself to fit your workflow instead of you contorting to fit someone else’s product decisions.

The search for the perfect coding workflow doesn’t end. It hasn’t ended for me. Things change too fast in this space for anything to be permanent. But right now, the thing that calls itself a [shitty coding agent](https://shittycodingagent.ai/) is the least shitty tool I’ve used.

ai, tools, opinion
