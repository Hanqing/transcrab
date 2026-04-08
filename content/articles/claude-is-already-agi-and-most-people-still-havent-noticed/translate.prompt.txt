你是一个翻译助手。请把下面的 Markdown 内容翻译成简体中文。
[TransCrab Translation Profile]
- mode: auto
- audience: business
- style: business
- auto-resolved-mode: refined
- auto-resolved-audience: business
- auto-resolved-style: business
- auto-reasons: 公开发布默认使用 refined 流程，优先质量与稳定性；商业关键词命中较高，判定为 business
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
there's a scene in avatar where they plug themselves into the tree of souls.

instantly, they're connected. every ancestor. every piece of knowledge the forest has ever accumulated. the entire intelligence of their world, accessible in a single moment.

i keep coming back to that scene when people argue about AGI.

because the debate is always framed wrong. people imagine AGI as a terminator. a robot that wakes up and decides to do something. something dramatic and obvious.

but what if agi is a portal, not a robot?

wikipedia defines artificial general intelligence as a machine that can perform any intellectual task that a human can.

![](https://pbs.twimg.com/media/HEg2_-pWcAAQmcc.jpg)

but when i'm sitting there talking to claude working through a problem i've never solved before, pulling on knowledge across biology, law, math, history, whatever i need — it doesn't feel like using a tool. it feels like plugging in. access to more intelligence than any single human brain could hold in a lifetime, available instantly.

I also made a post that went a little viral, hence decided to write the full article as well:

that's my definition of agi. and by that definition, we're already there.

so i asked claude to help me outline 10 reasons it's already there. here's what we came up with:

## 1. it passed the hardest reasoning test ever built, then they built a harder one

arc-agi was designed specifically to test general intelligence. not knowledge, not memorization. fluid reasoning: look at a pattern you've never seen, figure it out from scratch.

when arc-agi-1 launched, best ai systems scored near zero. humans scored near 100%.

claude opus 4.6 scored 93%. human average.

so they built arc-agi-2. harder, more abstract. frontier models started at 0-5%. claude reached 68.8%.

the benchmark creators launched arc-agi-3 on march 25, 2026. no ai scores above 1% yet. it requires real-time interactive reasoning inside video-game environments.

the pattern is clear. claude hits ceilings that were supposed to be impossible, so new ceilings get built.

"if you just eyeball the rate at which these capabilities are increasing, it does make you think that we'll get there by 2026 or 2027." @DarioAmodei, @lexfridman podcast

## 2. it runs software teams on its own

claude code, anthropic's agentic coding tool, surpassed $2.5 billion in annualized revenue in early 2026. not a benchmark. the market voting with money.

claude opus 4.6 operates inside codebases with millions of lines of code. it plans, breaks tasks into subtasks, runs parallel subagents, catches its own mistakes, and ships production-ready code that senior engineers can sign off on with minimal review.

on swe-bench, the gold-standard software engineering benchmark, claude opus 4.5 hit 80.9%. leading across 7 out of 8 programming languages.

one agi definition has always been: can it do economically valuable cognitive work better than a human? at scale, in production, for the world's most demanding engineering teams: yes.

## 3. it holds a million tokens in memory and actually recalls them

1 million token context window went generally available with claude opus 4.6 in february 2026.

that's 750,000 words. the entire lord of the rings trilogy. three years of daily emails. a complete legal discovery file.

not just processed: retained. on anthropic's mrcr v2 1m eight-needle test, claude achieves a mean match ratio above 78%. it finds and connects needles buried across a million tokens of noise.

no human can do this. one of the oldest definitions of general intelligence is the ability to hold and integrate large amounts of information when solving problems. human working memory is a sticky note compared to this.

## 4. it hallucinates less than you do

Dario Amodei at anthropic's code with claude event in may 2025: "i suspect that ai models probably hallucinate less than humans, but they hallucinate in more surprising ways."

not a marketing line. a documented observation.

humans confabulate constantly. we misremember. we fill gaps with plausible-sounding fiction and call it memory. we're wrong with total confidence, especially in medicine and law.

claude hallucinates differently. but at lower rates on measured tasks.

the hallucination argument against agi is gone.

## 5. it improves itself

claude opus 4.5 demonstrated autonomous self-improvement through iteration at scale.

in agentic automation tests, claude agents refined their own capabilities across runs: reaching peak performance in 4 iterations while comparable models couldn't match that quality after 10. they stored insights from one run and applied them to the next.

an agent that improves its own performance without human-directed fine-tuning is doing something qualitatively different. we're not at recursive self-improvement yet. but claude is at procedural self-optimization in production. the gap between those two things is smaller than it looks.

## 6. expert-level reasoning is already real

dario amodei's definition of "powerful ai": "intellectual capabilities matching or exceeding that of nobel prize winners across most disciplines, including biology, computer science, mathematics, and engineering."

he says this arrives by late 2026 or early 2027.

but look at what's documented right now. gpqa diamond is expert-level science designed to stump phd researchers. claude opus 4.6 scores over 91%. on math and aime benchmarks, claude reaches competition-level performance. on swe-bench, 80.9%.

"powerful ai will have intellectual capabilities matching or exceeding that of nobel prize winners across most disciplines." — dario amodei, machines of loving grace

"nobel prize level" is a frame. the performance is already real.

![](https://pbs.twimg.com/media/HEg614uWwAAsdIT.jpg)

## 7. the people building the competition are saying it's here

@sama in december 2025: "we built agis."

jensen huang in march 2026: "i think it's now. i think we've achieved agi."

dario amodei at davos 2026: ai replaces software engineers in 6-12 months, 50% of white-collar jobs gone in 1-5 years.

these aren't outside observers. these are the ceos of the three most important ai labs and the most important ai hardware company on earth.

worth noting: altman's openai contract with microsoft has an agi trigger clause. once agi gets declared, microsoft's licensing terms change dramatically. he's not saying "we built agi" for the headline.

## 8. the skeptics' best arguments have mostly collapsed

@ylecun, the most credentialed agi skeptic in the field, has argued llms can't achieve agi because they lack a "world model" and can't reason about physical causality.

he's not wrong about the architecture gap.

but his timeline: "agi is not coming in this decade" was made about systems from two years ago. what's being demonstrated in 2026 is not those systems.

his deeper argument: "we're never going to get to human-level intelligence by training llms or by training on text only. we need the real world." may be correct for the final version of agi.

it doesn't explain away 93% on arc-agi-1, 80.9% on swe-bench, or self-optimizing agentic loops that improve without human intervention.

it's a definition argument, not a capability argument.

![](https://pbs.twimg.com/media/HEg5gbgaoAAsWb3.jpg)

## 9. $380 billion is not the price of a search engine

anthropic is reportedly approaching an ipo at a $380 billion valuation.

markets aren't sentimental. institutional investors don't price a company at $380 billion on vibes. they price it there because they think the underlying technology is going to restructure how most of the economy works.

claude code at $2.5b annualized. claude api across the enterprise stack. claude integrated into amazon, google, and microsoft's workflows at scale.

agi doesn't arrive as a headline. it arrives as a line item in q1 earnings calls.

## 10. the definition problem is the tell

every time claude clears a bar, the bar moves. that's the tell.

lecun's version requires a physical world model. altman's requires scientific discoveries humans can't make independently. amodei's requires nobel-level intellect across all disciplines. huang's: can it run a $1b company?

they're describing different ceilings. claude is approaching all of them at the same time.

"we are rapidly running out of truly convincing blockers, truly compelling reasons why this will not happen in the next few years." — @DarioAmodei , @lexfridman podcast

## the 3 strongest arguments against

fair to include them. here's what the skeptics get right.

no persistent memory or identity. every conversation starts from zero. a human mind has 30 years of accumulated context, relationships, lived experience. claude gets a context window, then resets. that's a real gap.

it predicts, it doesn't understand. there's no model of the world inside. just statistical patterns over text. whether that distinction matters functionally is an open debate. but it's a legitimate critique and nobody has fully answered it.

it can't act in the physical world. no embodiment. no sensorimotor experience. no ability to build a world model from physical interaction. the tree of souls metaphor cuts both ways here: you plug in and access intelligence. but you still have to unplug and do things. claude can't. not yet.

## so where does that leave us

back to avatar.

they didn't debate whether the tree of souls counted as "real" intelligence by some academic definition. they plugged in. they accessed something larger than themselves. and they used it.

that's the only question worth asking right now.

not: is claude agi by the technically correct definition? but: when you plug in, do you have access to more intelligence than any human has ever had before?

yes. clearly yes.

whether you call that agi doesn't change what it does to your industry, your team, your competitors who are already using it while you're still waiting for the official announcement.

this is why I am going all in on @EspressioAI to build AI agent systems for marketing and BD teams.
