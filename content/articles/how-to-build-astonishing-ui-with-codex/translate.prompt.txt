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
## 𝗚𝗣𝗧-𝟱.𝟰 𝗰𝗮𝗻 𝗯𝘂𝗶𝗹𝗱 𝗯𝗲𝗮𝘂𝘁𝗶𝗳𝘂𝗹 𝗳𝗿𝗼𝗻𝘁𝗲𝗻𝗱𝘀. 𝗕𝘂𝘁 𝗼𝗻𝗹𝘆 𝗶𝗳 𝘆𝗼𝘂 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝘁𝗼 𝗮𝘀𝗸.

Better output starts with tighter constraints, visual references, and real content.

Here's how to build intentional frontends with GPT-5.4.

## 𝗪𝗵𝘆 𝗚𝗣𝗧-𝟱.𝟰 𝗱𝗲𝗳𝗮𝘂𝗹𝘁𝘀 𝘁𝗼 𝗴𝗲𝗻𝗲𝗿𝗶𝗰

Without specific guidance, every model defaults to the most common patterns it saw during training.

Generic card grids. Weak visual hierarchies. Safe, forgettable layouts.

GPT-5.4 is significantly better at frontend work.

It generates more visually ambitious UIs, understands images natively, and can use tools like Playwright to verify and refine its own output.

But it still needs direction. The model is only as intentional as your prompt.

## 𝗦𝘁𝗮𝗿𝘁 𝗵𝗲𝗿𝗲: 𝟰 𝗳𝗼𝘂𝗻𝗱𝗮𝘁𝗶𝗼𝗻𝘀

→ Set reasoning to low or medium
Counterintuitive, but it leads to stronger results. Keeps the model fast and focused.

→ Define your design system upfront
Typography, color palette, layout rules. Before any code.

→ Provide visual references
A screenshot, a mood board, anything. The model infers rhythm, spacing, and scale from images.

→ Give it real content
Real copy, real product context. Placeholder text produces placeholder thinking.

## 𝗗𝗲𝘀𝗶𝗴𝗻 𝗿𝘂𝗹𝗲𝘀 𝘁𝗵𝗮𝘁 𝗮𝗰𝘁𝘂𝗮𝗹𝗹𝘆 𝘄𝗼𝗿𝗸

Constrain the model hard. OpenAI's own starter prompt includes rules like:

→ One composition — the first viewport must read as a single composition

→ No cards in the hero. Ever.

→ Brand first — the product name must be hero-level on branded pages

→ Full-bleed hero by default on landing pages

→ Two typefaces max. One accent color.

→ One job per section. One purpose. One takeaway.

Litmus check: if you remove the hero image and the page still works, the image was too weak.

## 𝗦𝘁𝗿𝘂𝗰𝘁𝘂𝗿𝗲 𝘁𝗵𝗲 𝗽𝗮𝗴𝗲 𝗮𝘀 𝗮 𝗻𝗮𝗿𝗿𝗮𝘁𝗶𝘃𝗲

Before you build, write three things:

→ Visual thesis — one sentence on the mood and energy

→ Content plan — hero, support, detail, final CTA

→ Interaction thesis — 2-3 motion ideas

Then follow this sequence:

1. Hero — establish identity and promise

2. Supporting imagery — show context

3. Product detail — explain the offering

4. Social proof — build credibility

5. Final CTA — convert

Each section gets one job. If a section is trying to do two things, cut one.

## 𝗔𝗽𝗽𝘀 𝘃𝘀 𝗹𝗮𝗻𝗱𝗶𝗻𝗴 𝗽𝗮𝗴𝗲𝘀

For apps and dashboards, different rules apply. Default to Linear-style restraint:

→ Calm surface hierarchy

→ Strong typography and spacing

→ Few colors

→ Dense but readable information

→ Cards only when the card IS the interaction

Avoid dashboard-card mosaics, thick borders on every region, decorative gradients, multiple competing accent colors.

Litmus check: if an operator scans only headings, labels, and numbers — can they understand the page immediately?

## 𝗠𝗼𝘁𝗶𝗼𝗻: 𝘀𝗵𝗶𝗽 𝟮-𝟯, 𝗻𝗼𝘁 𝟭𝟬

Motion creates presence and hierarchy. Not noise.

Pick three intentional motions and commit to them:

→ One entrance sequence in the hero

→ One scroll-linked or sticky effect

→ One hover, reveal, or layout transition

Framer Motion is the recommended stack. If a motion is only decorative, remove it.

## 𝗧𝗵𝗲 𝗳𝗿𝗼𝗻𝘁𝗲𝗻𝗱 𝘀𝗸𝗶𝗹𝗹

OpenAI released an open-source skill that encodes all of this into one reusable prompt layer.

Install it with:

$skill-installer frontend-skill

It forces the model to define a visual thesis, content plan, and interaction thesis before touching any code. Worth running before your next build.

## 𝗧𝗹𝗱𝗿

GPT-5.4 can generate genuinely good frontends. But only when you:

→ Constrain the layout system upfront

→ Give it visual references to work from

→ Structure the page as a narrative, not a document

→ Use real content, not placeholders

→ Keep reasoning low or medium

The model is capable. The prompt is the design brief.

What's the first thing you're building with it? 👇

Full article here:
https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4
