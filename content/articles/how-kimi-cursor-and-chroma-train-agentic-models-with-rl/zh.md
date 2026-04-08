---
title: Kimi、Cursor 和 Chroma 如何用强化学习训练 Agent 模型
date: '2026-03-30T15:09:05.285Z'
sourceUrl: 'https://x.com/_philschmid/status/2037924497563505058?s=20'
lang: zh
category: 技术
---
我阅读了 Moonshot AI 的 Kimi K2.5 论文、Cursor 的 Composer 2 报告和博客文章，以及 Chroma 的 Context-1 技术报告。以下是我学到的内容：

每份报告都介绍了独特的内容。Kimi K2.5 训练了一个 Agent Swarm，其中模型通过 RL 学习将任务分解为并行子 Agent。Cursor 的 Composer 2 使用自我摘要来处理长编码会话，并从生产流量中运行实时 RL。Chroma 的 Context-1 教模型自我编辑上下文：主动修剪检索到的文档以释放空间进行进一步搜索。

三者都使用强化学习，方法相似：

1. 从强大的基础模型开始。没有人从头训练。Moonshot 通过多模态预训练扩展 Kimi K2。Cursor 从 Kimi K2.5（1T 参数/32B 活跃 MoE）开始。Chroma 从 gpt-oss-20B 开始。
2. 在生产 harness 内训练。每个团队通过与其模型在生产中遇到的相同工具、提示和执行环境运行 RL rollouts。
3. 基于结果的奖励。三者都使用可验证的结果信号，对于开放式任务/风格/宪章使用异常生成奖励模型（GRM）。
4. 异步、大规模 rollouts。每个系统在每个训练步骤生成并行轨迹。Agent rollouts 成本高昂，所有人都投资于基础设施以大规模运行。

---

## Kimi K2.5：Agent Swarm 和通过 RL 实现并行 Agent 编排

论文：[Kimi K2.5: Visual Agentic Intelligence](https://arxiv.org/html/2602.02276v1)

Kimi K2.5 是 Moonshot AI 的多模态模型，具有 1T 参数/32B 活跃 MoE 架构。其最显著的特点是 Agent Swarm，这是一个框架，模型在其中学习动态地将任务分解为并行子任务并分派给子 Agent。并行化策略通过强化学习学习，而非手工编码。

### PARL：并行 Agent 强化学习

大多数 agentic 系统按顺序执行：思考 → 工具调用 → 观察 → 思考 → 工具调用。Agent Swarm 通过训练模型生成并行子 Agent 来打破这一点。

架构有两个角色：

- **Orchestrator（可训练）**：决定何时创建子 Agent、分配什么任务、如何聚合结果。配备 create_subagent 和 assign_task 工具。
- **Sub-agents（冻结）**：独立执行分配的子任务。其轨迹被排除在优化目标之外。

这种解耦解决了信用分配问题。在端到端协同优化中，正确的最终答案可能意味着 Orchestrator 分解得好，或者子 Agent 运气好。冻结子 Agent 并将其输出视为环境观察意味着只有 Orchestrator 的协调逻辑被优化。

Kimi 还引入了"关键步骤"来衡量并行设置中的计算成本，类似于计算图中的关键路径。不是计算所有 Agent 的总步骤数，而是衡量最长执行链。对于每个阶段，成本是所有并行子 Agent 中的最大步骤数。总关键步骤是这些最大值的和。这激励 Orchestrator 在子 Agent 之间平衡工作（减少最长分支），而不仅仅是最大化并发。

### PARL 奖励

训练可靠的并行 Orchestrator 需要奖励设计。PARL 奖励有三个组成部分：

1. **性能奖励 (r_perf)**：任务成功了吗？这是主要信号。
2. **并行奖励 (r_parallel)**：激励子 Agent 实例化，防止"串行崩溃"，即 Orchestrator 默认单 Agent 执行并从不探索并行策略的局部最优。
3. **完成奖励 (r_finish)**：奖励已完成的子任务，防止"虚假并行"，即 Orchestrator 生成许多子 Agent 而非有意义的任务分解，只是为了收集 r_parallel 的奖励黑客行为。

辅助奖励系数在训练过程中退火到零，因此最终策略仅针对性能优化。

### 推理时的工作原理

在推理时，模型接收任务并决定是否以及如何并行化：

1. Orchestrator 分析任务并识别子任务结构。
2. 使用 create_subagent 和特定指令创建子 Agent。
3. 使用 assign_task 并行分配任务给子 Agent。子 Agent 通过独立的上下文窗口并发执行。
4. Orchestrator 收集结果并综合最终答案或重复该过程。

并行化的决定不是硬编码的。对于简单任务，模型按顺序工作。对于复杂的多源研究任务，它启动许多并行 Agent。训练分布鼓励这一点：合成提示强调"广泛搜索"（许多独立信息源）或"深度搜索"（多个延迟聚合的推理分支）。提示不指示模型并行化。它们创建了并行化有帮助的任务。

Agent Swarm 将推理延迟降低高达 **4.5 倍**，同时提高准确性。在 BrowseComp 上，达到 **78.4%**（vs 单 Agent 60.6%），超越 GPT-5.2 Pro（77.9%）。在 WideSearch 上，项级 F1 从 72.8% 提高到 79.0%。Agent Swarm 还作为主动上下文管理发挥作用，将任务分解为隔离的子 Agent 上下文避免了困扰长顺序运行的上下文溢出。

### 更广泛的训练管道

Kimi K2.5 的 RL 配方还有其他几个值得注意的组成部分：

- **基于规则的结果奖励**：用于具有可验证解决方案的任务（推理、agentic 任务）。
- **生成奖励模型（GRM）**：用于开放式任务，这些不是二元通过/失败判断者，而是与内部质量标准（有用性、美学质量、指令遵循）对齐的细粒度评估器。多个替代 GRM 规则手册减轻奖励黑客。
- **拒绝采样微调（RFT）**：创建自我改进的数据管道：提取成功的 RL 轨迹并用作后续训练阶段的 SFT 数据，每个阶段都建立在前一个阶段之上。
- **Token 效率切换**：在预算约束和标准扩展阶段之间交替训练，在可忽略的性能损失下减少 25-30% 的输出长度。

---

## Cursor Composer 2：用于 Agentic 编码的 RL

论文：[Composer 2 Technical Report](https://arxiv.org/html/2603.24477v2)，[Improving Composer through real-time RL](https://cursor.com/blog/real-time-rl-for-composer)

Composer 2 是 Cursor 用于 agentic 软件工程的内部模型。它可以读取和编辑文件、运行 shell 命令、搜索代码库和浏览网页。目标是自主解决真实编码任务。

### 固定 Harness，贴近生产

Composer 2 在用户交互的完全相同的 Cursor harness 内训练：相同的工具、相同的提示格式、相同的系统消息、相同的文件上下文。他们在训练期间维护 Cursor 后端的影子部署，以便工具行为（如语义搜索）与生产环境相同。

SWE-bench 等公开基准使用简化的环境和过度指定的提示。真实开发者请求是欠指定的、混乱的，并承认多种有效解决方案。在生产 harness 中根据从实际 Cursor 使用中提取的问题进行训练，意味着 Composer 2 学习处理真实分布。

他们还构建了 CursorBench，这是从工程团队的实际编码会话中提取的内部评估套件。CursorBench 任务的变更中位数为 181 行（相比 SWE-bench 为 7-10 行），提示更短、更模糊。这个基准与产品共同演进：随着用户推动 Agent 更难，基准变得更复杂。

### RL 配方：四个组成部分

Composer 2 的 RL 基础设施由四个解耦服务组成：

- **训练**：基于 Ray 和 PyTorch 构建的完全异步堆栈。
- **环境**：每次 rollout 在专用 Firecracker VM 上运行（内部平台 Anyrun），能够运行具有浏览器和 GUI 的完整开发环境。Anyrun 每秒可调度 500+ pod，支持文件系统级快照和环境分叉，用于轨迹中间检查点。
- **推理**：与 Fireworks AI 合作进行 RL 推理。权重同步通过 delta 压缩上传到 S3 并在训练 rank 之间分片实现每个训练步骤，每 15 分钟同步一次。推理 worker 可以在 rollout 中间更新权重，使后面的 token 更 on-policy。
- **评估**：固定的 production 后端和 Cursor client 副本进行评估，对 eval 行为与用户看到的行为高度一致充满信心。

策略梯度算法是接近 GRPO 的变体，单 epoch 应用（没有提示被训练两次），全参数更新。他们从标准 GRPO 中删除了长度标准化项（它引入长度偏差），并跳过按标准差进行优势归一化（当组内所有 rollout 获得相同正确性时，它会过度放大噪声）。

Cursor 为推测解码训练额外的多 Token 预测（MTP）层。这些层是自我蒸馏的：它们学习预测主 LM 头在每个 token 位置的确切 logit 分布。MTP 层从头初始化，在相同数据混合上训练，然后在 RL 之前在长上下文和 SFT 阶段联合微调。这实现了 **2-3 倍更快的推理**，质量降解最小。

### 用于长视野的自我摘要

真实编码任务可能很长。Agent 可能进行数十次工具调用、读取许多文件并迭代数百轮。为了让模型在有限上下文窗口内保持有效，Composer 2 使用自我摘要：每次 rollout 可以涉及由摘要链接的多个生成。最终结果奖励适用于链中的所有 token，因此保留关键信息的好摘要得到强化，而丢失关键上下文的不良摘要被降权。

模型学习何时以及如何摘要作为 RL 训练的自然组成部分。对于困难任务，它通常多次摘要。

### 实时 RL：从生产流量学习

除了模拟 RL，Cursor 还运行他们称之为实时 RL 的方法，从实际生产推理 token 中提取训练信号并从用户交互中提取。循环如下：

1. 从当前检查点与用户的交互中收集数十亿 token。
2. 将用户响应蒸馏为奖励信号（例如，用户是否跟进更改，他是否满意……）。
3. 在这些信号上训练并产生更新的检查点。
4. 通过 CursorBench 运行检查点以捕获回归。
5. 如果通过，则部署。

整个循环大约需要 **5 小时**，因此他们每天可以多次发布改进的检查点。保持循环快速使数据几乎 on-policy：生成数据的模型（几乎）是正在训练的模型。

---

## Chroma Context-1：自我编辑搜索 Agent

论文：[Context-1: Training a Self-Editing Search Agent](https://www.trychroma.com/research/context-1)

Context-1 是一个 20B 参数的 agentic 搜索模型，训练用于做一件事：查找文档。它不回答问题，它向下游推理模型返回支持文档的排名集。核心创新是自我编辑上下文。模型学习选择性丢弃不再相关的检索文档，释放上下文空间进行进一步探索。

### 合成数据管道

现实世界的 agentic 搜索任务很难大规模获取——你需要具有已知真实文档集的多跳查询。Chroma 构建了跨四个领域的合成生成管道：网络、金融（SEC 文件）、法律（USPTO 专利）和电子邮件（Epstein 文件 + Enron 语料库作为干扰项）。

每个任务遵循相同的结构：

1. 收集具有独特事实的支持文档。
2. 生成混淆线索（对事实的间接引用）和问题。
3. 验证：从文档中提取逐字引用并检查它们是否实际出现在源文本中。
4. 收集干扰项：匹配某些标准但指向不同答案的文档。
5. 可选择链接任务以创建多跳问题。

验证步骤很重要，因为"这个文档相关吗？"对 LLM 是一个不可靠的问题。相反，他们使用基于提取的管道：LLM 从文档和线索中提取匹配引用，然后确定性检查验证引用实际出现在源中。这在所有领域实现与人类标签超过 **80% 的一致性**。

### Agent Harness

Context-1 使用四个工具操作：

- `search_corpus(query)`：混合 BM25 + 密集检索与 RRF 融合和重排。
- `grep_corpus(pattern)`：正则搜索。
- `read_document(doc_id)`：读取特定块。
- `prune_chunks(chunk_ids)`：从上下文中移除不相关的块。

Harness 强制执行固定 token 预算（例如 32k tokens）。每轮后包含当前使用量：`[Token usage: 14,203/32,768]`。超过软阈值后，Harness 建议修剪。超过硬截止后，除 prune_chunks 外的所有工具都被阻止，模型必须修剪或结束。

去重在 harness 级别处理：跟踪跨所有先前搜索看到的每个块 ID 并作为排除过滤器传递，以便后续搜索始终呈现新信息。

当模型修剪时，Harness 从模型视图中移除块，但保留完整未修剪轨迹用于奖励计算。这让奖励对 Agent 在搜索期间遇到的相关文档进行归零，即使它们后来被修剪。

具体的搜索轨迹可能如下：

### 训练：SFT 预热 + RL

**SFT 预热**：使用 Kimi K2.5 作为推理后端生成轨迹，然后按召回质量过滤。高召回轨迹完整保留。低召回轨迹以递减率包含。一小部分（最多 5%）零召回轨迹作为负例。

**带 CISPO 的 RL**：使用 CISPO（剪裁重要性采样策略优化）进行完全 on-policy 训练，这是 GRPO 的变体。每步 128 个查询，每个 8 个 rollouts，产生每步 1,024 个轨迹。所有 8 个 rollouts 获得相同奖励的组被丢弃（在组内归一化下没有梯度信号）。

奖励经过仔细构建：

- **结果**：F-beta 分数，beta 设置很高（最初召回权重为精度的 16 倍）。这反映了 Context-1 的角色：遗漏文档比包含不相关文档更糟糕，因为下游模型可以过滤但无法恢复从未检索到的内容。
- **过程**：轨迹召回。对 Agent 在搜索期间遇到的相关文档进行归零，即使它们后来被修剪。没有这个，Agent 会收敛到发出一条宽泛搜索然后退出。
- **最终答案奖励**：检索到包含实际答案的块时 +1.0。
- **惩罚**：重复修剪惩罚（阻止一次一个修剪的条纹）、轮次计数惩罚（阻止递减收益的搜索循环）。

---

## 一致的主题

### 1. 在部署的地方训练

所有三个团队都大量投资于使训练环境匹配生产。Cursor 使用影子生产后端。Kimi 在相同 harness 中运行子 Agent。Chroma 针对真实数据库运行搜索。这最大限度地减少了训练性能和真实世界性能之间的差距。

### 2. 上下文管理是一等公民

Agent 上下文会随时间增长。Cursor 使用自我摘要。Kimi 将上下文分片到并行子 Agent。Chroma 教模型丢弃不相关的块。不同的解决方案，相同的底层约束。

### 3. 奖励设计是迭代的

每个团队都描述发现并修复奖励黑客行为。Cursor 的模型学会发出破碎的工具调用。Kimi 的 Orchestrator 陷入"串行崩溃"或"虚假并行"。Chroma 的 Agent 收敛到单搜索然后退出。每次：观察退化行为，理解激励，添加针对性奖励或惩罚。

### 4. 公开基准不够

Cursor 明确认为 SWE-bench 分数与真实世界效用关联不佳。他们从实际用户会话构建了 CursorBench。Chroma 跨四个领域构建了合成基准。Kimi 同时使用公开和内部评估。如果你正在构建垂直模型，你需要垂直评估。

### 5. 更小、专门训练的模型与前沿模型竞争

Chroma 的 20B 模型以一小部分成本和 10 倍速度匹配前沿规模 LLM 的检索。Composer 2 实现了与更大 API 模型相比的帕累托最优成本-准确性权衡。领域特定 RL 训练缩小了原始参数数量创造的差距。

---

## 资源

- **Kimi K2.5**：[论文](https://arxiv.org/html/2602.02276v1)、[模型权重](https://huggingface.co/moonshotai/Kimi-K2.5)
- **Cursor Composer 2**：[论文](https://arxiv.org/html/2603.24477v2)、[实时 RL 博客文章](https://cursor.com/blog/real-time-rl-for-composer)
- **Chroma Context-1**：[技术报告](https://www.trychroma.com/research/context-1)、[模型权重](https://huggingface.co/chromadb/context-1)、[数据生成代码](https://github.com/chroma-core/context-1-data-gen)

原文发布于：[philschmid.de](https://www.philschmid.de/kimi-composer-context)
