# Google AI Studio 全新全栈氛围编程体验上线

今天，我们在 [Google AI Studio](https://aistudio.google.com/) 推出了一次完全升级的氛围编程体验，旨在将你的提示变成生产就绪的应用。从多人体验、安装外部库，到保存进度和安全登录，现在你可以在完全不离开氛围编程体验的情况下构建真正可用的、AI 原生应用。

我们使用新的 [Google Antigravity](https://antigravity.google/) 编程 agent 来加速从提示到生产的过程。为了进一步支持现代可扩展应用，我们还启用了强大的后端，通过[内置 Firebase 集成](https://firebase.blog/posts/2026/03/announcing-ai-studio-integration)为你的应用带来安全存储和用户认证。

## 从原型到生产应用的体验差异

以下是新更新如何帮助你构建真正的应用：

- 构建多人体验：创建实时多人游戏、协作工作空间和可即时连接用户的共享工具。
- 添加数据库和认证：agent 现在会主动检测你的应用何时需要数据库或登录。在你批准 Firebase 集成后，它会配置 Cloud Firestore 作为数据库，并使用 Google 进行安全登录的 Firebase Authentication。
- 为现代网络创建：agent 现在使用现代网络工具的广阔生态系统。如果你想要流畅的动画或专业图标，agent 会自动找出正确的解决方案——比如安装 Framer Motion 或 Shadcn——来实现你的愿景。
- 连接到现实世界服务：通过连接你已经使用的服务，将原型变成生产级软件。你现在可以自带 API 凭证，安全地集成数据库、支付处理器或 Google 服务如 Maps。agent 检测何时需要密钥，并将其安全地存储在设置选项卡中的新密钥管理器中。
- 接着上次继续：在设备和会话之间访问你的数据。关闭浏览器标签，应用会记住你上次停在哪里，这样你准备好回来时可以继续。
- 访问更强大的 agent：用更简单的提示构建复杂应用。agent 现在对你整个项目结构和聊天历史保持更深的理解，实现更快的迭代和更精确的多步骤代码编辑。
- 用 Next.js 构建：除了 React 和 Angular，我们现在支持开箱即用的 [Next.js](https://nextjs.org/) 应用。在更新的"设置"面板中选择你的框架。

看看新 agent 在 Build 模式下的表现。以下是你现在可以构建的几个例子：

## 实时多人游戏

你现在可以从一个提示创建一个复古风格的巨型多人第一人称激光标签游戏。在时间耗尽之前，标记真实对手或打败 AI 机器人来在排行榜上得分并获胜。

在 Google AI Studio 游玩或改编 [Neon Arena](https://aistudio.google.com/apps/bundled/neon_arena_laser_tag?)。

## 实时协作

想象一下为一个"使用 3D 粒子的多人体验"发提示。agent 自动设置实时同步逻辑，导入 Three.js，并创建一个共享空间，每个人的光标产生随 curl 噪声流动的 3D 粒子。

在 Google AI Studio 游玩或改编 [Cosmic Flow](https://aistudio.google.com/apps/bundled/cosmic_flow?)。

## 物理和游戏设计

轻松创建遵循真实世界机制的复杂 3D 交互。新 agent 集成了娃娃机物理、计时器和排行榜，导入 Three.js 来实现交互式 3D 元素，只需要你提出要求。

在 Google AI Studio 游玩或改编 [Neon Claw](https://aistudio.google.com/apps/bundled/neon_claw?)。

## 连接到现实世界

在 Google AI Studio 推出全新全栈氛围编程体验，从 Google Maps 获取实时数据或向数据库发送更新，将概念变成实用工具。

在 Google AI Studio 游玩或改编 [GeoSeeker](https://ai.studio/apps/05066ca1-ceb3-4b8c-bdf1-da48f360f0ee)。

## 生成和组织你的食谱

用 Gemini 组织导入食谱或生成新食谱。与朋友和家人协作，保持你的烹饪传统。

在 Google AI Studio 尝试或改编 [Heirloom Recipes](https://aistudio.google.com/apps/bundled/heirloom_recipes)。

## 今天开始构建

过去几个月，Google AI Studio 中的这个新体验已经在内部用于构建数十万个应用。我们正在开发更多集成，比如将 Drive 和 Sheets 连接到你的应用的 Workspace，以及从 Google AI Studio 一键将应用带到 Google Antigravity 的能力。

无论你是构建你的第一个应用，还是让 agent 在你做其他事情时构建，我们希望这些更新帮助你加速从想法到已部署的生产就绪应用的道路。今天就前往 [Google AI Studio](https://aistudio.google.com/apps) 尝试新体验。
