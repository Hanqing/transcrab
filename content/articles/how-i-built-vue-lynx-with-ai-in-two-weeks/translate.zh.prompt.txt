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
Vue developers have wanted native for years. The ["Vue + Lynx = Vue Native"](https://x.com/danielkelly_io/status/1899746975588737407) tweet pulled 1.7k likes. The [Vue integration issue](https://github.com/lynx-family/lynx/issues/193) on our repo hit 1,600 upvotes -- our biggest feature request ever. The demand was clear; the question was bandwidth.

When [Lynx](https://lynxjs.org/) open-sourced a year ago, [Evan You](https://x.com/youyuxi/status/1898663514581168173) and [Rich Harris](https://x.com/Huxpro/status/1927276405328429259) both shouted it out, but production-quality framework integration has always demanded serious engineering bandwidth. Then projects like [Vercel's web streams rewrite](https://vercel.com/blog/we-ralph-wiggumed-webstreams-to-make-them-10x-faster) and [Cloudflare's ViNext](https://blog.cloudflare.com/vinext/) showed how solo engineers, armed with AI, can ship what used to take a team. That changed the math for me.

Vue already has the foundation: a mature Custom Renderer API. I spent a weekend on it. One ~$1,400, 37-hour hackathon. It started with a design exploration: "Can Vue's Custom Renderer even work with dual-thread code splitting, and how?" By 3am Sunday I was debugging "Tap to increment doesn't work" with Claude. By Monday morning, I had [a working TodoMVC](https://x.com/Huxpro/status/2028672358912086524). I couldn't resist dropping a subtle subtweet, and it immediately took off on X.

Introducing Vue Lynx

The next two weeks of evenings and weekends went into making it real: 160+ commits across ~180 sessions.

I could have shipped after week one. But if you know me, you know my principle:

When things actually work, you let the demos do the talking.

Check vue.lynxjs.org for 20+ example apps running natively and on the web -- you can try them without leaving your browser.

We cover the full Composition API, <Transition>, <Suspense>, and ecosystem integrations including Vue Router, Pinia, Tailwind CSS, and TanStack Query. We also ported Lynx's official tutorial (Waterfall Gallery and Swiper) to showcase native components and Main Thread Script for zero-latency gestures. A HackerNews clone brings them all together.

## Try It Today

It's [open source](https://github.com/huxpro/vue-lynx), of course. If it sparked something, give it a Star! And give some love to the [Lynx Engine](https://github.com/lynx-family/lynx) and [Lynx Frontend Stack](https://github.com/lynx-family/lynx-stack) too. They are the shoulders we're standing on.

I'd love for the Vue and Lynx communities to build on it together. Issues, PRs, and feedback are all welcome.

["Harness"](https://openai.com/index/harness-engineering/) [Engineering](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

You gotta use the hottest word after "AI", "vibe", and "agentic" — harness.

No humans were harmed to write code in the making of this project.

## Setting Up the Architecture for AI

There were two prior community efforts. The second, from the Vue Vine maintainer @Shenqingchuan, went impressively far, [even getting Main Thread Script demos running](https://x.com/Shenqingchuan/status/1996862232593129815?s=20). But both kept Vue on the main thread just like the Web. This works on Lynx, but it's not taking advantage of the [dual-thread architecture](https://lynxjs.org/blog/lynx-unlock-native-for-more#use-the-main-thread-responsibly-for-interactivity) Lynx is known for: offload the heavy framework re-rendering on background and ensuring the native UI thread non-blocking and only tapped in when needed (with Main Thread Scripts).

This was the core architectural decision I validated on Day 1. In Vue Lynx, the entire Vue runs on the Background. A lightweight ShadowElement linked-list tree mirrors the native element tree in memory, and every DOM mutation gets serialized into a flat ops buffer shipped to the Main Thread in one batch per tick:

To keep the agent aligned with this dual-threaded architecture and not drift towards the single-threaded Web model it defaults to, I embedded all [critical plans directly in the source tree](https://github.com/Huxpro/vue-lynx/tree/main/plans) : design discussion notes, decision logs and post-implementation learning as cross-session context. Each new session picks up where the last left off, inheriting our architectural constraints and reasoning that shaped the code.

## Bridging the Vue Upstream Tests

The most critical investment in any AI-driven development is feedback. Ideally, to ensure conformance with official Vue, we'd reuse Vue's upstream test suite directly. But Vue's test suite assumes a single-thread DOM. How do you run it to test a dual-thread renderer?

Fortunately, Lynx already has the infra for [dual-threaded testing environments](https://lynxjs.org/next/api/lynx-testing-environment/index.html#lynx-jstesting-environment). So we can rewire the suite to run through our dual-thread pipeline: BG ShadowElement -> ops buffer -> syncFlush() -> MT applyOps -> PAPI -> jsdom, then let the agent grind until no remaining failures were fixable (effectively [Ralph Loop](https://ghuntley.com/loop/)). The result: 852 passed out of 949 upstream tests. Every failure is accounted for in a [skiplist](https://github.com/Huxpro/vue-lynx/blob/main/packages/upstream-tests/skiplist.json)  with documented reasons, and all turned out to be negligible. See the [full report and skip analysis](https://github.com/Huxpro/vue-lynx/blob/main/packages/upstream-tests/README.md).

We also added our own tests for Lynx-specific surface area such as <list> elements, bindtap events, Main Thread Scripting APIs. With the pipeline proven, I pushed further and forked the [7GUIs benchmark](https://vue.lynxjs.org/guide/7guis) from the official Vue docs as a stress test.

## Agentic E2E Verification Loop

But those classic machinery tests can't catch real UI bugs that used to require human evaluation: a misaligned CSS layout, an interaction broken on a real device. For advanced Vue features like <Transition>, <Suspense>, you need to see them run and interact to verify the behavior.

With the right harnessing, writing examples isn't just demoing -- they double as workloads that the agent can evaluate automatically. I wired up two execution environments: iOS simulator via [Lynx DevTool MCP](https://lynxjs.org/next/ai/lynx-devtool-mcp.html)/CLI/Skill, and agent-controlled browser via [Lynx for Web](https://lynxjs.org/next/guide/start/integrate-with-existing-apps?platform=web). The loop is simple: run an example in both, observe and verify the output, and any regression triggers a fix. No human in the loop.

I started with Vue core features, where correctness is well-defined: the agent reads the official docs, writes an example, and checks whether the output conforms. Then I expanded scope to ecosystem integrations: Vue Router, Pinia, TanStack Query, Tailwind CSS.

For the final exams, I tried a different approach: one I'd later learn has a name: differential evaluation: I let the agent port existing applications and verify the output against the originals. The first used the canonical Vue HackerNews implementation as ground truth, running both the Web version and the vue-lynx port with Lynx for Web side-by-side in the browser; the second used existing ReactLynx demos as reference, porting them to vue-lynx and verifying parity on the iOS Simulator via Lynx DevTool MCP. The harness doesn't need to know what "correct" looks like in the abstract. It just needs the two outputs to agree.

## The Bill

The numbers tell a story. Output tokens (the code and text Claude actually wrote) account for just 8% of the cost. The other 92% is comprehension: re-reading the codebase, ingesting tool outputs, re-processing conversation history across 31,700 API turns. That's 2.5 billion tokens of reading to produce 6.8 million tokens of writing -- a 370:1 ratio. This is what "agentic" actually looks like at the billing level.

Was the "$6,500" API rate worth it? (Claude [gifted me](https://x.com/Huxpro/status/2031973188440052119?s=20) the 200$ Claude Max for [its Open Source program](https://x.com/Huxpro/status/2031973188440052119?s=20), thankfully)

What's Next?

This project started as one person's nights-and-weekends effort. I'd love to explore with Vue core team how we can shape the future of Vue on native together. Personally, and on behalf of the Lynx team, we're committed to supporting its growth.

Vue Lynx is pre-alpha. The architecture is solid, but Vue's API surface is large, and we haven't verified every corner of it.

- Features like KeepAlive and Teleport likely need runtime adaptations.
- <style scoped> and v-model on native inputs are solvable but not yet implemented.
- The Main Thread Script API currently reuses ReactLynx's directive-based design. A more Vue-idiomatic approach (like <script main-thread setup>) is worth exploring.
- Vue DevTools integration with Lynx DevTool app.
And beyond Vue core, there's a massive Vue ecosystem waiting for us to adapt and grow on native.

The vision is simple: Vue developers should be able to ship native apps as naturally as they ship for the web today. We're not there yet, but the foundation is in place, and the path is clear.

If you've read this far: [try it](https://vue.lynxjs.org). 
Build something. Tell us what's missing.

Oh, and Btw:
