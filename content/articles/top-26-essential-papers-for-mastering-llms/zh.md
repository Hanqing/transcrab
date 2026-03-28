# 突发：Elon Musk 背书我的掌握 LLM 和 Transformer 必读 26 篇论文

实现这些，你就掌握了现代 LLM 约 90% 的 alpha。

其他一切都是装饰。

这份列表将 Transformer 基础与推理、MoE 和 Agent 转变连接起来。

## 推荐阅读顺序

1. **Attention Is All You Need** (Vaswani et al., 2017)
   > 原始 Transformer 论文。涵盖自注意力、多头注意力和编码器-解码器结构
   > （尽管大多数现代 LLM 是仅解码器架构）

2. **The Illustrated Transformer** (Jay Alammar, 2018)
   > 很好的直觉构建器，在深入实现之前理解注意力和张量流

3. **BERT: Pre-training of Deep Bidirectional Transformers** (Devlin et al., 2018)
   > 编码器端基础、掩码语言建模和仍塑造现代架构的表示学习

4. **Language Models are Few-Shot Learners (GPT-3)** (Brown et al., 2020)
   > 确立了上下文学习作为真正的能力，改变了提示的理解方式

5. **Scaling Laws for Neural Language Models** (Kaplan et al., 2020)
   > 首个清晰的参数、数据和计算的经验缩放框架
   > 与 Chinchilla 一起阅读，理解为什么大多数模型训练不足

6. **Training Compute-Optimal Large Language Models (Chinchilla)** (Hoffmann et al., 2022)
   > 证明在固定计算预算下，token 数量比参数数量更重要

7. **LLaMA: Open and Efficient Foundation Language Models** (Touvron et al., 2023)
   > 触发开源权重时代的论文
   > 引入了 RMSNorm、SwiGLU 和 RoPE 作为标准实践的架构默认

8. **RoFormer: Rotary Position Embedding** (Su et al., 2021)
   > 成为长上下文 LLM 现代默认的位置编码

9. **FlashAttention** (Dao et al., 2022)
   > 内存高效注意力，通过优化 GPU 内存访问实现长上下文窗口和高吞吐推理

10. **Retrieval-Augmented Generation (RAG)** (Lewis et al., 2020)
    > 将参数化模型与外部知识源结合
    > 企业系统的基础

11. **Training Language Models to Follow Instructions with Human Feedback (InstructGPT)** (Ouyang et al., 2022)
    > 现代后训练和对齐蓝图，指令微调模型遵循

12. **Direct Preference Optimization (DPO)** (Rafailov et al., 2023)
    > 比 PPO-based RLHF 更简单、更稳定的替代方案
    > 通过损失函数进行偏好对齐

13. **Chain-of-Thought Prompting Elicits Reasoning in Large Language Models** (Wei et al., 2022)
    > 证明推理可以仅通过提示激发
    > 为后来的推理专注训练奠定基础

14. **ReAct: Reasoning and Acting** (Yao et al., 2022 / ICLR 2023)
    > Agent 系统的基础
    > 将推理痕迹与工具使用和环境交互结合

15. **DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning** (Guo et al., 2025)
    > R1 论文。证明大规模强化学习无需监督数据
    > 就能诱导自验证和结构化推理行为

16. **Qwen3 Technical Report** (Yang et al., 2025)
    > 现代架构轻量级概述
    > 引入统一 MoE，具有思考模式和非思考模式动态权衡成本和推理深度

17. **Outrageously Large Neural Networks: Sparsely-Gated Mixture of Experts** (Shazeer et al., 2017)
    > 现代 MoE 点火点
    > 大规模条件计算

18. **Switch Transformers** (Fedus et al., 2021)
    > 使用单专家激活的简化 MoE 路由
    > 稳定万亿参数训练的关键

19. **Mixtral of Experts** (Mistral AI, 2024)
    > 开源权重 MoE，证明稀疏模型可以匹配稠密质量
    > 同时以小模型推理成本运行

20. **Sparse Upcycling: Training Mixture-of-Experts from Dense Checkpoints** (Komatsuzaki et al., 2022 / ICLR 2023)
    > 将稠密检查点转换为 MoE 模型的实用技术
    > 对计算复用和迭代缩放至关重要

21. **The Platonic Representation Hypothesis** (Huh et al., 2024)
    > 证据表明缩放模型跨模态收敛到共享的内部表示

22. **Textbooks Are All You Need** (Gunasekar et al., 2023)
    > 证明高质量合成数据让小模型可以超越大模型

23. **Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet** (Templeton et al., 2024)
    > 机械可解释性的最大飞跃
    > 将神经网络分解为数百万可解释特征

24. **PaLM: Scaling Language Modeling with Pathways** (Chowdhery et al., 2022)
    > 大规模训练的大师课
    > 跨数千加速器的编排

25. **GLaM: Generalist Language Model** (Du et al., 2022)
    > 用大量总参数但小活动参数数验证 MoE 缩放经济学

26. **The Smol Training Playbook** (Hugging Face, 2025)
    > 高效训练语言模型的实用端到端手册

## 补充材料

- T5: Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer (Raffel et al., 2019)
- Toolformer (Schick et al., 2023)
- GShard (Lepikhin et al., 2020)
- Adaptive Mixtures of Local Experts (Jacobs et al., 1991)
- Hierarchical Mixtures of Experts (Jordan and Jacobs, 1994)

---

如果你深入理解这些基础 — Transformer 核心、缩放定律、FlashAttention、指令微调、R1 风格推理和 MoE 升级 — 你已经比大多数人更好地理解了 LLM。

是时候锁定了，祝你好运！
