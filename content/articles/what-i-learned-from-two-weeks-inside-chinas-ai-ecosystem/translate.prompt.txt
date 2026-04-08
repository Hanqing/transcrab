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
Spent two weeks in China meeting founders, VCs, and public company CEOs across the AI ecosystem. Went in bullish on the ecosystem, expecting to find world-class AI talent building at a fraction of Western valuations. 

I left with a more nuanced perspective: more bullish on hardware than I expected, more bearish on software, and with some views on Chinese founders that surprised me.

The Founder Question

The great founders I've backed share a recognizable fingerprint: independent thinking, rebelliousness, intensity, obsessiveness. They don't do as they're told. They ask "why" constantly and refuse borrowed wisdom. They make decisions that look baffling to outsiders but obvious to themselves. And they have a visceral, relentless intensity that tends to manifest in a history of obsession and excellence. Their lives have a spikiness to them that stands out immediately from the sea of highly intelligent people you meet as a VC.

Many of the Chinese founders I met were a different archetype — and it surprised me.

They're extraordinarily talented — top universities, stints at Bytedance or DJI, Nature publications, multiple patents. The achievements that only the very top echelon of Western technical talent has, here they're table stakes. They're also harder working than almost anyone I've encountered. We had meetings at all hours, on weekends, across cities. One founder came to meet us the day his wife gave birth!

But the independent thinking, the rebelliousness, the zero-to-one vision — it's harder to find. The backgrounds are similar across founders, the pitches more risk-averse, the ideas more often impressive V2s of things that already exist rather than genuinely original bets. Given the sheer volume of technical talent China produces, I expected to meet more people with ideas I'd never heard before.

My read is that China's educational system produces excellence but doesn't leave enough space for deviation. The output is founders who are exceptional executors of known problems, rather than the kind of people who show up with a problem nobody knew existed.

VCs Are Reinforcing the Pattern

What makes this more interesting is that local investors are actively compounding it.

Many Chinese funds have built their entire theses around backing the best alumni from Bytedance or DJI — pedigree over spikiness, credential over conviction. The VC profiles mirror this: most come from big company or consulting and banking backgrounds, similar to European VC a decade ago.

The irony is that historically the best Chinese founders — the ones who actually built generational companies — never worked at big companies at all. Jack Ma was an English teacher who failed his university entrance exam twice. Ren Zhengfei founded Huawei at 43 after leaving the military. Richard Liu started JD.com selling goods from a market stall. Wang Xing dropped out of a PhD and started founding companies from day one. Most recently, Liang Wenfeng built DeepSeek having never worked anywhere but his own firms. These were the outliers, the uncredentialed ones — exactly the profiles the current system would pass on.

There is real alpha in finding those profiles, and it seems to me very few are looking there right now.

Shenzhen and the hardware ecosystem

The most mind-blowing thing I saw in China wasn't a startup pitch.

It was Shenzhen's hardware underground — workshops where engineers had systematically acquired high-end Western products and were tearing them apart component by component, reverse engineering everything with methodical precision. I left genuinely uncertain whether most Western hardware founders understand what they're competing with. The network effects here are not theoretical. They are physical, dense, and decades in the making.

Entrepreneurs we met reinforced this point with data: more than 70% of hardware inputs sourced from the Greater Bay Area, close to 100% from China itself — enabling iteration cycles that Western hardware companies simply can't match.

Most founders I met were using the DJI playbook: build consumer hardware in a niche — electric wheelchairs, lawnmower robots, next-gen exercise equipment — scale it to eight or nine figures of revenue, then expand into adjacent categories leveraging either the customer base or the underlying tech. Some of these businesses are already far larger than you'd expect. The most impressive company I came across was Bambu, a 3D printing company most Westerners haven't heard of, allegedly doing $500M in annual profit and doubling every year.

Bearish on Chinese Software

I left more skeptical of the Chinese software opportunity than I arrived.

At the model layer, Chinese open source is genuinely impressive — but the closed models remain significantly behind the best Western ones, and the gap is likely to widen. The CapEx delta is enormous. GPU access remains constrained. Western labs are increasingly moving to crack down on distillation. And the revenue numbers tell the story clearly: Anthropic reportedly did $6B in February alone. The best Chinese models are in the tens of millions of ARR.

On the software startup side, the dominant profile is ex-Bytedance PMs and researchers building versions of agentic or ambient consumer software targeting Western markets. The talent is real, but many of these products sit squarely in the remit of what the large labs will ship natively — one release away from being made redundant. I was also struck by the absence of large, fast-growing private software companies more broadly. In the West, alongside the model companies, there are multiple startups already printing nine and ten-figure ARRs at extraordinary growth rates — Cursor, Loveable, ElevenLabs, Harvey, Glean. That tier of breakout private software company largely doesn't exist in China — and the few exceptions, like HeyGen, Manus, and GenSpark, ended up leaving once they did find it.

The Valuation Bubble

Despite the software picture, the froth is real — at both early and late stages.

At the early stage, while the very top talent coming out of Bytedance, DeepSeek, and Moonshot is still meaningfully cheaper than equivalent US talent, median valuations have converged. Pre-product consumer startups at $100-200M are common. Pre-seed rounds above $30M are unremarkable.

At the late stage, the numbers are harder to defend. Minimax is trading on public markets at roughly $40B on under $100M ARR — around 400x revenue. Zhipu at approximately $25B on $50M revenue. For context, OpenAI's peak fundraising rounds were priced at roughly 66x ARR. Anthropic's at roughly 61x.

![](https://pbs.twimg.com/media/HEQYU9abgAA1Gyn.jpg)

Private model companies like Moonshot are using these public comps to raise at $6B, $10B, and $18B in the span of a few months. Crypto investors will recognise the dynamic. Investors are comparing private valuations against a pre-unlocks public mark. In addition, part of what's holding Zhipu and Minimax at these levels is that they're currently the only way to get exposure to the Chinese AI narrative, which commands its own premium. That changes as more companies come to market and dilute it. Finally, IPO windows have a habit of closing quickly and without warning — there's no certainty you'll be able to close the arb before the mark you're comparing against has already moved.

The humanoid space is in a similar place. Roughly 200 humanoid companies in China, around 20 having raised more than $100M, several in the billions — nearly all pre-revenue, most planning HK IPOs in 2026 or 2027. If this market is real, Chinese hardware dominance makes the long-run outcome fairly legible. But commercial traction is likely to take longer than the current fundraising cadence implies, and I'm skeptical HK markets can sustain the number of multi-billion dollar humanoid companies currently in the pipeline. I'm staying out for now.

The Asymmetry Worth Paying Attention To

One thing I didn't expect: almost every founder I met is building for the global market before the Chinese one. They use Claude Code. They watch Dwarkesh. They know the SF startup landscape in detail, often better than Western investors who haven't been paying close attention.

The West is considerably more hostile toward China than China is toward the West. Chinese founders see no contradiction in combining Chinese engineering execution and hardware depth with Western go-to-market and product vision. That combination, when it comes together in the right founding team, will produce some genuinely remarkable companies.

Finding those founders — the ones who don't fit the credentialed mold the local VC ecosystem has optimised for — is what we’re focused on.

Special thank you to @woutergort for extending his amazing China network to us, to @PonderingDurian for organising the trip, and to Claude for patiently editing my plane ramblings
