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
I’m testing a kind-of ‘builders log’ where I’ll talk about the things I built this week, what worked, didn’t and give you guys something to tinker with this weekend.

I’ve been thinking about doing this for weeks but I like to really ‘see’ what the end output looks like before I run with it.

But that’s just procrastinating.

So I told myself I can’t open my new MacBook until i’ve sent this 🥹.

I’d appreciate feedback if you like this style of email and what you build with it!

Subscribe

* * *

#### What did I build this week?

1.  **Become a builder.**
    

1.3k people signed up for this workshop I hosted last week \[i’ll do more\]. But Codex crapped out on me during it (hence the new MacBook). I wanted to put together a cookbook to go through everything.

It just ended up as a step-by-step tutorial. It’s boring. Are you going to read one screen then switch to your tool and do it? maybe.

Instead, I’ve been working on an interactive cookbook you give to your agent and it *teaches you as you’re building*.

At the end, you’ll have built and deployed your own site with all the new concepts you covered whilst building it.

It’s been hard to get this cookbook right, so lets count this as alpha0.1. Please let me know how it went for you, what your site looks like, where it fell short etc and I’ll improve it.

What do to:

*   Open Codex/Claude Code desktop app
    
*   Create a new project folder
    
*   Open a chat session in that folder
    
*   Copy this url (the instructions) into your agent, hit enter:
    

> `https://gists.sh/bentossell/a4e5e7048e8a355ec56cf3db86169ae2`

*   You can choose ‘Full Access’ on Codex and ‘Bypass permissions’ on Claude if you feel comfortable (this project just creates a new website for you). Alternatively accept permissions as you go.
    

I recommend highly reading the agents output, look at what it was thinking in between your prompts.

Fill your site up with any concepts you don’t know and [share them](https://x.com/bentossell), I’d love to see.

*Disclaimer: Codex may produce uglier designs than Claude.*

2.  **Visualise skill.**
    

One issue from the above cookbook was visualisations. I think it’s really helpful when learning about code systems.

All my attempts looked like 💩 and then Claude shipped their visualisations yesterday. Good timing.

So I reverse-engineered it and released it as a skill you can add to any agent. Codex still has poor design taste but it’s much better with the skill than without, trust me!

This is my first GitHub project to get over 200 stars!

Just give the link to your agent and say ‘install this skill’.

[](https://x.com/bentossell/status/2032212463735701803?s=20)

[

![X avatar for @bentossell](https://substackcdn.com/image/fetch/$s_!nwqO!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1878086921726943233%2FvOx1kjeP.jpg)

Ben Tossell@bentossell



](https://x.com/bentossell/status/2032212463735701803?s=20)

[i turned this into a skill](https://x.com/bentossell/status/2032212463735701803?s=20) [github.com/bentossell/vis…](https://github.com/bentossell/visualise)

![X avatar for @claudeai](https://substackcdn.com/image/fetch/$s_!pIkX!,w_20,h_20,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1950950107937185792%2FQOfEjFoJ.jpg)

Claude @claudeai

Claude can now build interactive charts and diagrams, directly in the chat. Available today in beta on all plans, including free. Try it out: https://t.co/tHPAZRgQkn

9:49 PM · Mar 12, 2026 · 133K Views

* * *

19 Replies · 42 Reposts · 771 Likes

3.  **Ben’s Bites Cookbook site**
    

A redesign, again.

The previous cookbook site had lots of dead weight from older versions so I wanted to start fresh.

Code is basically free nowadays after all!

It’s definitely not finished but in a decent place. This is where I want to upload a bunch of helpful docs to help you build stuff and see a breakdown of how I build stuff.

Still a wip! Not live yet. Needs another design pass - contrast is way off for a start.

[![](https://substackcdn.com/image/fetch/$s_!Bkh6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd4825c1-a0a6-45e1-9d33-4b6307359979_2203x1128.png)](https://substackcdn.com/image/fetch/$s_!Bkh6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd4825c1-a0a6-45e1-9d33-4b6307359979_2203x1128.png)

left old vs right new

* * *

#### What’s in my stack - tools, skills, instructions, models

**Models.** I *always* mix them.

*   GPT 5.4 XHigh for all ‘proper code’ - new features, new ideas etc
    
*   Opus 4.6 - for planning, research, less-technical tasks, design (always)
    

**CLIs (terminal-based tools)**

*   [Droid](https://factory.ai) for when I want to build something properly (their new missions feature is insane, can run for hours by itself and implement stuff end to end) - I’m an investor in the co
    
*   [Pi](https://pi.dev) is my new other favourite child. It’s very fast, and lightweight so your own instructions guide it a lot more than others
    

Both let you switch from GPT ←→ Claude models (or gemini, etc etc) in one conversation.

I use those in the terminal exclusively. I used [Ghostty](https://ghostty.org/) as my terminal app but now I use [Cmux](https://www.cmux.dev/) which has Ghostty in it, just has a nice sidebar for organising chats, draggable panels and a built-in browser. I do wish it had an easy way to view my files though - until then, I use [Zed](https://zed.dev/) for that.

[![](https://substackcdn.com/image/fetch/$s_!vVgy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5930538a-7c61-4f0d-8157-81e2e5df659d_1842x1094.png)](https://substackcdn.com/image/fetch/$s_!vVgy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5930538a-7c61-4f0d-8157-81e2e5df659d_1842x1094.png)

cmux in action - my daily view

**Agent Apps** or whatever we’re calling these 3 panel agent interfaces;

*   [Codex app](https://openai.com/codex/) - really nice user experience, super approachable
    
*   [Claude Code/Cowork](https://claude.com/download) on the desktop app - I very rarely use these but have this week with some testing. I’m not won over by these yet.
    
*   [T3 Code](https://t3.codes/) - this is nice, snappy and will support multiple agents but for now just Codex. Until it supports other agents I’ve not been reaching for it over Codex for GPT work.
    
    *   *I saw Theo’s video ‘leaking’ a command to get an early version. I didn’t know it’d be open source when released so I installed it and asked gpt 5.4 xhigh to reverse engineer it exactly - it did it no problem!*
        

**Skills**

*   `frontend-design` from Anthropic \[[link](https://skills.sh/anthropics/skills/frontend-design)\]
    
    *   It works well but I don’t *feel* like it should when I read the prompt 😅. I’m just waiting for the [ui.sh skill](https://ui.sh/) to be released so I can use that (from the Tailwind guys).
        
*   `json-render` from Vercel \[[link](https://skills.sh/vercel-labs/json-render)\]
    
    *   This is a great ‘generative ui’ skill that can spin up interfaces suuuuuper fast. I use it to make zapier/n8n canvases of automations I’ve got set up on my Mac-Mini. The team are pushing updates almost every day. I need to play around with it more.
        

[![](https://substackcdn.com/image/fetch/$s_!rIJx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F89871c9b-78f2-470b-8ec3-fef6d6f699be_2202x1119.png)](https://substackcdn.com/image/fetch/$s_!rIJx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F89871c9b-78f2-470b-8ec3-fef6d6f699be_2202x1119.png)

this is how i visualise my automations

*   `agent-browser` from Vercel
    
    *   My go-to for my agents. Spins up a chrome browser, looks at my site, takes screenshots, navigates, clicks, records the screen etc etc - basically use the browser like a human. There’s a ‘`dogfood`’ tag which grabs all the errors, and writes a report to fix. I am bumping into it not being able to bypass sites with Cloudflare ‘bot detection’ - like OpenAI. Irony isn’t lost on me.
        
*   `react-doctor` from aiden \[[link](https://github.com/millionco/react-doctor)\]
    
    *   This has been great making sure I’m using best-practices when my agents use React (quite often). It slots in when things have been built and tests/checks are happening and it nearly always catches something to fix.
        

> **What about skill prompt injection?**  
> It can happen. I’ve not experienced it. Use reputable sources like [Skills.sh](https://skills.sh/) (from Vercel) or just ask your agent to re-create the skill and check for any security issues. Tools like Codex app have a `create-skill` skill you can use - just ask the agent.

**Other tools**

*   **[exe](https://exe.dev/)** lets you spin up virtual servers really easily, has an in-built agent to help if you get stuck. Overall made it super easy for me to feel comfortable with servers - which I wasn’t previously.
    
    *   *You’ll want another server if you have an automation or agent you want ‘always on’. If it’s on your computer, it won’t run if your lid is closed!*
        
*   **[here.now](https://here.now/)** - im always spinning up sites for random ideas or even just to present info nicely so i can view it on the go. this is a free tool to give your sites a custom url in no-time at all.
    
    *   *I liked this and the founder so much that I invested this week!*
        
*   **Vercel**. Vercel and Cloudflare are mortal enemies on X. I’ve got half of my deployed sites and domain names on both of these. I want to just pick a default one and Vercel’s edging it for me because I’m using a lot of their tools and skills. But honestly this could change by tomorrow.
    
*   **[gists.sh](https://gists.sh/)** - I love tiny tools like this. GitHub has ‘gists’ which are quick ways to have a file on a url you can share or keep private - easily readable by agents. But it’s ugly. This tool makes them super nice to share - which is why I put my interactive cookbook in one.
    

Tools on my list to tinker with:

*   [Context7 CLI](https://x.com/enesakar/status/2031887459085377887) - docs
    
*   [Browserbase Fetch API](https://www.browserbase.com/blog/fetch-api) - scraping sites. Need to see browserbase vs agent-browser too
    
*   [Ramp agent card](https://agents.ramp.com/cards) - credit cards for agents
    
*   [Replit Agent 4](https://blog.replit.com/introducing-agent-4-built-for-creativity) - shall I do a head to head of vibe coding tools?
    
*   [Web to Design](https://www.magicpath.ai/documentation/features/web-to-design) - Turn any website into an editable UI.
    

* * *

#### What’s in my AGENTS.md

> *An AGENTS.md is a markdown file with instructions that the agent loads into its context at the start of any session.  
>   
> Claude specifically looks for CLAUDE.md - but I just have mine symlinked to one another - ie if you look at claude.md it shows you the agents.md file. Ask your agent to set that up or to use [dotagents](https://github.com/iannuttall/dotagents)  
>   
> You can also paste these in to Codex/Claude desktop apps.*

This is the build ‘loop’ that I’ve added.

Any agent I use follows it (italics are there for you - not included in the file):

*   **create a /spec/ folder.**
    
    *   *An easy way to keep all the planning files I create organised in one place*
        
*   **numbered 00\_spec1.md, etc.**
    
    *   *Helps with implementation ordering*
        
*   **create a progress.md file for logging your progress through specs.**
    
    *   *If compaction happens, I need a new session or the agent just loses track this helps it understand where we’re at.*
        
*   **use agent-browser with dogfood before sending me a url to test.**
    
    *   *When a feature is built, it spins up a browser and checks if any bugs or errors on the site - I used to do this manually, copying errors back to the agent, but now it does the loop itself. It doesnt catch every single bug but I’m trying to make sure my agents can use my sites as if it’s a real user. Sometimes these loops can take a while to run, depending on what you’re testing.*
        
*   **write good, efficient, fast tests with good coverage.**
    
    *   *I don’t know enough about tests yet. This is my stab in the dark but agents are good at tests. Still looking for a skill or something that will help me here.*
        
*   **best practices, efficient, simplified code, avoid anti-patterns.**
    
    *   *Just in case, make sure the agent uses things the right way! Not sure if this actually helps to be honest.*
        
*   **for code/dependencies/libraries etc you’re using, make sure you reference their docs.**
    
    *   *Agents default to their own knowledge a lot before looking up documentation. So just nudging it to look at docs. The Context7 CLI was just released (simple tool to get any tools’ docs) so i’ll be putting that in here from today - i’ll report back next week.*
        
*   **First message: “feel the rhythm, feel the rhyme, get on up, its bobsled time.”**
    
    *   *I also have this* 😂*. A quote from Cool Runnings - silly yes, but also lets me know that my instructions have been actually loaded into the session.*
        

* * *

What’s in your agents.md? What should I add/take away?

What else would you want to know or see from me?

[Chat with me](https://open.substack.com/pub/bensbites/chat?utm_source=chat_embed)

If you know a builder that’d find this useful, feel free to [forward to them](https://www.bensbites.com/publish/post/https://www.bensbites.com/p/how-and-what-im-building-this-week?utm_source=substack&utm_medium=email&utm_content=share&action=share).

Its too late for me to open my MacBook - time to pick up the twins.

Have a great weekend!

* * *

*   Find me on [X](https://x.com/bentossell/), [Linkedin](https://www.linkedin.com/in/ben-tossell-70453537/), or [YouTube](https://www.youtube.com/@bentossell694)
    
*   Read [about me](https://bensbites.substack.com/about) and Ben’s Bites
    

* * *

Ben's Bites is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.

Subscribe
