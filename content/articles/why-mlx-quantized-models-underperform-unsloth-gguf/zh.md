---
title: 为什么 MLX 量化模型表现不如 Unsloth GGUF
date: '2026-03-27T23:43:26.396Z'
sourceUrl: 'https://x.com/Brooooook_lyn/status/2037532299382882794?s=20'
lang: zh
category: 技术
---
## 问题：并非所有层都是平等的

如果你下载了社区的 MLX 量化模型，并注意到它在工具调用上吃力、产生不连贯的长输出、或者比 GGUF 版本产生更多幻觉——你没有看错。

根本原因是均匀量化。大多数 MLX 量化工具对模型中的每个权重张量应用相同的位宽。对于标准 transformer 架构，这没问题。但 Qwen3.5 是一个混合模型——它在完整自注意力层和 GatedDeltaNet（线性注意力/SSM）层之间交替。

Unsloth 在 150+ KL 散度基准测试中的研究揭示了损害：

linear_attn.out_proj 张量——GatedDeltaNet 层特有的——比 lm_head 敏感 120 倍。将其量化到 4 位就像将 JPEG 最关键的部分压缩到 1% 质量，同时将背景保持在 95%。

均匀量化浪费了不需要它们的张量的 bits，摧毁了无法承受精度损失的张量。

## 修复：在重要的地方花费 bits

解决方案是按张量混合位量化——根据每个权重张量的实际敏感性分配精度级别。这就是 Unsloth 的 Dynamic 2.0 配方为 GGUF 做的，也是我们已经移植到 MLX 的。

在默认的 3 位基础上，分配如下：

关键洞察：o_proj 和 out_proj 没有前面的 norm 层，所以 AWQ 无法纠正它们。在 Unsloth 的 GGUF 流水线中，这些张量仍然使用 imatrix 重要性加权量化到 Q5_K——一种不需要前面 norm 的技术。但没有 AWQ 纠正的 MLX 仿射量化将产生比带 imatrix 的 GGUF k-quants 更差的结果，所以安全回退是将它们保持在 bf16。这花费额外的磁盘空间，但防止了使朴素量化对工具调用和结构化输出无法使用的质量损失。

## Unsloth 的开源 imatrix：基础

整个配方取决于知道每个张量中哪些通道最重要。这来自 [Unsloth 的开源 imatrix 数据](https://huggingface.co/unsloth/Qwen3.5-35B-A3B-GGUF/tree/main)——来自 121 个量化配置上 150 多个 KLD 基准测试的每通道重要性分数。

使 Unsloth 的 imatrix 特别的是校准数据集：高质量的对话、编程和工具调用示例——明显优于大多数社区量化器使用的基于维基百科的校准。这很重要，因为重要性分数只和它们校准的数据一样好。基于维基百科校准的 imatrix 将低估对代码生成和工具调用至关重要的通道。

imatrix 有两个用途：

1. AWQ 预缩放——告诉我们要在量化前放大哪些权重通道
2. 敏感性分析——KLD 基准测试，决定每个张量的位分配

我将 imatrix 应用到我们的量化 Qwen 模型上。

## 自己试试

Huggingface 集合：https://huggingface.co/collections/Brooooooklyn/qwen-35-unsloth-mlx

## 基准测试

我们使用 [ToolCall-15](https://github.com/stevibe/ToolCall-15) 进行测试，这是一个开源基准测试，评估 LLM 工具调用能力，涵盖 5 个类别中的 15 个确定性场景：

- 工具选择——选择正确的函数
- 参数精度——提供正确的参数
- 多步链——执行依赖的工具调用序列
- 克制与拒绝——当没有工具适用时拒绝
- 错误恢复——优雅地处理工具失败

所有测试以温度 0 运行，使用模拟的工具输出，使结果完全可复现。

我们所有的量化模型都与 Unsloth UD-Q3_K_XL 模型表现相同。

有关完整的技术深度探讨——包括 AWQ 缩放公式、从 CLI 到 safetensors 输出的完整控制流，以及混合位模型在运行时如何执行——请阅读 [Unsloth MLX：将 Dynamic 2.0 按张量量化带到 Apple Silicon](https://lyn.one/unsloth-quantize-recipe)。
