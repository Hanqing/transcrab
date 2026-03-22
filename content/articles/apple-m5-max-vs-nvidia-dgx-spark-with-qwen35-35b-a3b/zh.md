---
title: "Apple M5 Max vs Nvidia DGX Spark：Qwen3.5-35B-A3B 对比测试 \U0001F525"
date: '2026-03-22T14:39:11.358Z'
sourceUrl: 'https://x.com/ivanfioravanti/status/2035623919252578344?s=20'
lang: zh
category: 技术
---
M5 Max 发布时，我的第一个目标是检验神经加速器的能力。预填充一直是之前 Apple Silicon 世代最大的问题。

那么 M5 Max 和 Nvidia DGX Spark 之间的对比测试如何？让我们先做一个有局限性的初步测试，学点新东西。

背景：

- DGX Spark 数据来自 [Spark Arena](https://spark-arena.com/leaderboard)，使用相同的基准测试工具 [llama-benchy](https://github.com/eugr/llama-benchy)。感谢 @spark_arena

我们并非在做 100% 的苹果对苹果比较，因为：

- DGX 使用了疯狂优化的 vllm（很快！），M5 使用 mlx_lm.server
- DGX 使用 fp8，M5 使用 q8 int 量化
- DGX 使用 fp8 KV 缓存，M5 使用 bf16
- 我无法在 M5 Max 上测试 100K 上下文长度下 10 个并发请求的批次，因为统一内存的一部分无法被 GPU 使用（我不得不使用我的 [mlx_memory 脚本](https://gist.github.com/ivanfioravanti/44b4284be930b3c340cc1696d60c6143)手动分配更多给它）
- 测试的批次大小：2K、4K、8K、16K、32K、100K，并发请求数 1、2、5、10

## 总结

以下是一个总结图表，清楚地显示 M5 Max 在解码上获胜，而 DGX 在预填充上获胜。

尽管与 Apple M4 及之后的版本相比，得益于神经加速器有了很大改进，但仍有差距需要填补。40 个 GPU 核心无法与 DGX 的 192 个张量核心竞争。

结果比率总结：

## 预填充

以下是详细的预填充对比：

## 解码

以下是解码结果。请记住，如果你计划将 M5 Max 机器用于编程助手、聊天等，c1 或 c2 才是有意义的数据。批量推理是你应该在 Mac Studio 上做的事情。

即使在 TTFT（首 token 时间）方面，Apple 这边也有了大幅改进，但 DGX 在这里是明显的赢家。但请记住，在单用户的标准使用中，M5 Max 的性能在现实生活中是完美的。通常你不会在批次中排队大量请求。

## 最终评论与致谢

Apple 这边仍有改进空间，尤其是在软件方面。我将在接下来几天尝试额外的推理服务器，包括 vllm-metal，以查看项目状态并评估改进。早期我在运行它时遇到了一些问题。

M5 Max 非常适合无需批量多个请求的单用户使用，在这种场景下它是真正的猛兽，快速而猛烈。

我要感谢 @opencode 和 @Zai_org 提供的 glm-5-turbo。我使用这个组合从 @spark_arena 收集数据，并使用 Chrome 开发工具创建了一个包含结果和相关截图的精彩交互式网站。

我们生活在多么不可思议的时代啊？🚀
