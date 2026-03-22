---
title: "Apple M5 Max vs Nvidia DGX Spark with Qwen3.5-35B-A3B \U0001F525"
date: '2026-03-22T14:39:11.358Z'
sourceUrl: 'https://x.com/ivanfioravanti/status/2035623919252578344?s=20'
lang: source
---
When M5 Max was released, my first goal was to check the power of the Neural Accelerators. Prefill, it was the biggest issue with the previous Apple Silicon generations.

So what about a test comparison between a M5 Max and an Nvidia DGX Spark?  Let's try a first test with its own limitations, just to learn something new.

Context:

- DGX Spark data are retrieved from [Spark Arena](https://spark-arena.com/leaderboard) using same benchmarking tool [llama-benchy](https://github.com/eugr/llama-benchy). Thanks @spark_arena
We are not comparing 100% apples with apples because:

- DGX used vllm optimized like crazy (fast!), M5 mlx_lm.server
- DGX used fp8, M5 q8 int quantization
- DGX used fp8 KV Cache, M5 used bf16
- I was not able to test batch of 10 concurrent requests at 100K context length on M5 Max, because part of the Unified Memory couldn't be used by GPU (I had to assign more manually to it using my [mlx_memory script](https://gist.github.com/ivanfioravanti/44b4284be930b3c340cc1696d60c6143))
- Batch sizes tested 2K,4K,8K,16K,32K,100K with 1,2,5,10 concurrent requests.
Results

## Summary

Here follows a summary chart that shows clearly that M5 Max wins on decode, while DGX on prefill.

Even if there has been a big improvements versus Apple M4 and beyond tthanks to Neural Accelerators, there is still a gap to be filled. 40 GPU cores can't compete with  192 Tensor cores of DGX.

![](https://pbs.twimg.com/media/HD_5gwCbwAE7L1w.jpg)

A ratio summary of the results:

![](https://pbs.twimg.com/media/HD_6SsaWYAAaNvb.png)

## Prefill

Here detailed prefill comparison:

![](https://pbs.twimg.com/media/HD_51m8WUAAiXhA.png)

## Decode

Here decode. Keep in mind that c1 or c2 are the meaningful data here if you plan to use your M5 Max machine for coding assistant, chat, etc. Batch inference is something that you should do on a Mac Studio.

![](https://pbs.twimg.com/media/HD_54g-akAEuDEg.png)

Even on TTFT side, things improved drastically on Apple side, but DGX is a clear winner here. But keep in mind that in standad use by a single user, M5 Max performance are perfect in real life. You don't queue tons of requests in a batch usually.

![](https://pbs.twimg.com/media/HD_6NiiX0AEQnxU.jpg)

## Final comments and acknoledgments

There is still room for improvements on Apple side especially on software. I will try additional inference server in next days, including vllm-metal to see the status of the project and evaluate improvements. In the early days I had some issues running it.

M5 Max is perfect for single user use without batching of multiple requests, in this scenario is a real beast, fast and furious.

I have to thank @opencode and @Zai_org for glm-5-turbo. I have used this combo to gather data from @spark_arena  and create an amazing interactive website with results and relative screenshots using Chrome Dev Tools.

What incredible era are we living in? 🚀
