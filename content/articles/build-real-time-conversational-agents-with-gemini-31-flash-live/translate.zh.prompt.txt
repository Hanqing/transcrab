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
Today, we’re launching [Gemini 3.1 Flash Live](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-live) via the [Gemini Live API](https://ai.google.dev/gemini-api/docs/live) in Google AI Studio. Gemini 3.1 Flash Live helps enable developers to build real-time voice and vision agents that can not only process the world around them, but also respond at the speed of conversation.

This is a step change in latency, reliability and more natural-sounding dialogue, delivering the quality needed for the next generation of voice-first AI.

## Experience enhanced latency, reliability and quality

For real-time interactions, every millisecond of latency strips away the natural flow of the conversation that users expect. The new model better understands tone, emphasis and intent, enabling agents with key improvements:

- Higher task completion rates in noisy, real-world environments: We’ve significantly improved the model’s ability to trigger external tools and deliver information during live conversations. By better discerning relevant speech from environmental sounds like traffic or television, the model more effectively filters out background noise to remain reliable and responsive to instructions.
- Better instruction-following: Adherence to complex system instructions has been boosted significantly. Your agent will stay within its operational guardrails, even when conversations take unexpected turns.
- More natural and low-latency dialogue: The latest model improves on latency and is even more effective at recognizing acoustic nuances like pitch and pace compared to 2.5 Flash Native Audio, making real-time conversations feel a lot more fluid and natural.
- Multi-lingual capabilities: The model supports more than 90 languages for real-time multi-modal conversations.
See the Gemini Live API in action

Developers are actively building voice agents that communicate with a natural flow and pace and take actions reliably with Gemini Flash Live models. Here are a few examples of real-world apps that use the model to power their conversational interactions:

## Stitch

Using the Gemini Live API, [Stitch](https://stitch.withgoogle.com/) now enables its users to vibe design with their voice. The agent can 'see' the canvas and selected screens and give design critiques, build variations and more.

## Hey Ato

In this demo, AI companion device for older adults, [Ato](https://www.heyato.ai/), uses Gemini 3.1 Flash Live’s multilingual capabilities to turn daily conversations into real connections for its users.

## Wits End

See how the Weekend team integrates Gemini 3.1 Flash Live’s strong characterization and human-like delivery to add a unique theatrical flair to the Game Master in their RPG - [Wit’s end](https://www.weekend.com/post/wits-end).

## Build with an expanding ecosystem of integrations

The Live API is built for production environments, but real-world systems require handling of diverse inputs, from live video streams to on-demand phone calls.

For systems that require WebRTC scaling or global edge routing, we recommend exploring our partner integrations to streamline the development of real-time voice and video agents.

![](https://pbs.twimg.com/media/HEWLS5FbYAUrsi7.jpg)

Get started with the Live API

Gemini 3.1 Flash Live is available starting today via the Gemini API and in Google AI Studio. Developers can use the Gemini [Live API](https://ai.google.dev/gemini-api/docs/live) to integrate the model into their application.

Check out this [video tutorial](https://youtube.com/watch?v=XV5bhkDpL7U&feature=youtu.be) to build voice agents with Gemini 3:

Explore our developer documentation to learn how you can build real-time agents.

- Gemini [Live API documentation](https://ai.google.dev/gemini-api/docs/live?example=mic-stream): Explore features like multilingual support, tool use and function calling, session management (for managing long running conversations) and ephemeral tokens.
- Gemini [Live API examples](https://github.com/google-gemini/gemini-live-api-examples): Get inspiration for the kind of voice experiences you can build today with the model.
- [Gemini Live API Skill](https://github.com/google-gemini/gemini-skills/tree/main/skills/gemini-live-api-dev): For coding agents to learn and build with the Live API.
Get started with the [Google GenAI SDK](https://ai.google.dev/gemini-api/docs/live-api/get-started-sdk):
