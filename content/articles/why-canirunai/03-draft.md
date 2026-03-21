# 为什么这样做 — CanIRun.ai

## 工作原理

CanIRun.ai 完全在你的浏览器中运行。访问网站时，我们会使用浏览器 API 检测你的 GPU、CPU 和内存，然后计算哪些 AI 模型可以在你的硬件上运行，以及大致速度。不会有任何数据发送到服务器，所有计算都在客户端完成。

重要提示：所有结果都是**估算值**。浏览器 API 提供的硬件信息有限，GPU 名称可能不够精确，RAM 数值是近似值，带宽数据来自规格参数而非真实测量。实际性能还取决于许多浏览器无法测到的因素：热降频、后台进程、驱动版本、操作系统内存压力等。请把分数当作总体参考，而不是绝对保证。

检测

匹配 GPU

评分

S

等级

## 硬件检测

我们使用三个浏览器 API 来识别你的硬件特征，不需要插件或安装额外软件。

### WebGL — GPU 识别

我们创建一个隐藏的 WebGL 画布，并查询 `WEBGL_debug_renderer_info` 扩展来获取 GPU 名称和厂商信息。这能告诉我们你使用的是哪块 GPU。

```
// 获取 GPU 渲染器字符串
const canvas = document.createElement("canvas");
const gl = canvas.getContext("webgl2");
const ext = gl.getExtension("WEBGL_debug_renderer_info");
const gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
// → "ANGLE (NVIDIA, NVIDIA GeForce RTX 4090, ...)"
// → "Apple M4 Pro GPU"
```

### WebGPU — 架构信息

如果浏览器支持 WebGPU，我们会请求一个 adapter 以获取额外的设备和架构细节。

```
const adapter = await navigator.gpu.requestAdapter();
const info = adapter.info;
// info.device → "nvidia geforce rtx 4090"
// info.architecture → "ampere"
```

### Navigator — CPU 与 RAM

我们使用 `navigator.hardwareConcurrency` 获取 CPU 核心数，使用 `navigator.deviceMemory` 获取近似内存容量。我们还会运行一个简短的 CPU 基准测试（约 30ms）来估算单核性能。

```
const cores = navigator.hardwareConcurrency; // → 16
const ram = navigator.deviceMemory;         // → 8 (GB, approximate)
```

## GPU 数据库

识别出你的 GPU 后，我们会在内置数据库中查找（约 40 款 GPU，覆盖 NVIDIA、AMD、Intel，以及约 12 款 Apple Silicon 芯片）。每条记录包含显存容量和内存带宽，这两个指标对本地运行 AI 模型最关键。

```
// GPU 数据库示例
const GPU_DB = {
  "RTX 4090":    { vram: 24,  bw: 1008 }, // GB/s
  "RTX 4060":    { vram: 8,   bw: 272  },
  "RX 7900 XTX": { vram: 24,  bw: 960  },
};

const APPLE_DB = {
  "m4 max":   { ram: 36,  bw: 546 },
  "m4 pro":   { ram: 24,  bw: 273 },
  "m4":       { ram: 16,  bw: 120 },
};
```

## 显存需求

我们数据库里的每个模型，都为每种量化级别预先计算了显存需求。公式很直接：

显存（GB）= 参数量 × 每个权重位数 ÷ 8 ÷ 1024³ + 开销

例如，70B 模型在 Q4\_K\_M（4-bit）下，大约需要 70 × 4 ÷ 8 = 35 GB，再加上约 1–2 GB 的 KV cache 和运行时缓冲区开销。

```
// 为每种量化计算显存占用
function makeQuants(paramsBillions) {
  const base = paramsBillions;
  return [
    { name: "Q2_K",   vram: round(base * 0.35) },
    { name: "Q4_K_M", vram: round(base * 0.55) },
    { name: "Q6_K",   vram: round(base * 0.75) },
    { name: "Q8_0",   vram: round(base * 0.95) },
    { name: "F16",    vram: round(base * 1.85) },
  ];
}
```

## 评分算法

评分（0–100）综合三个因素，用来回答一个问题：“这个模型在你的硬件上运行得会有多好？”

速度（tok/s）55%

内存余量 35%

质量加分 ~10%

### 速度分（权重 55%）

根据你的 GPU 内存带宽和模型显存占用来估算每秒 token 数：

```
const efficiency = isAppleSilicon ? 0.65 : 0.70;
const toksPerSec = (bandwidthGBs / modelVRAM) * efficiency;

// 速度 -> 分数映射
80+ tok/s → 100 pts     // 即时
40+ tok/s →  85 pts     // 很快
20+ tok/s →  65 pts     // 良好
10+ tok/s →  45 pts     // 可用
 5+ tok/s →  25 pts     // 偏慢
 <5  tok/s →  10 pts     // 很痛苦
```

### 内存余量分（权重 35%）

看模型占用你可用内存的比例。占用越低，留给上下文、批处理和其他进程的空间越大：

```
const memPct = (modelVRAM / totalMemory) * 100;

// 内存占用 -> 分数映射
 ≤30% → 100 pts     // 余量充足
 ≤50% →  80 pts     // 比较舒适
 ≤70% →  55 pts     // 中等
 ≤85% →  30 pts     // 紧张
 >85% →  10 pts     // 非常紧张
```

### 质量加分（约 10%）

更大的模型通常输出质量更好，因此给少量加分。上限为 15 分，避免加分压过其他核心因素：

```
const qualityBonus = Math.min(15, Math.log2(paramsBillions + 1) * 2.5);
// 7B → ~7.5 分， 70B → ~15 分（封顶）
```

### 紧贴边界惩罚

如果模型只是勉强塞进内存（status = "tight"），最终总分会整体乘以 0.65。这样可惩罚“理论可跑、实际容易因为交换和上下文管理而卡顿”的情况。

## 等级划分

最终分数会映射为状态标签：

| Status | Score | Meaning |
| --- | --- | --- |
| Runs great | 85–100 | 推理速度快，余量充足 |
| Runs well | 70–84 | 速度不错，内存适配舒适 |
| Decent | 55–69 | 能用，但不理想 |
| Tight fit | 40–54 | 速度慢，上下文窗口受限 |
| Barely runs | 20–39 | 输出会很慢 |
| Too heavy | 0–19 | 内存装不下 |

## 适配分类

打分前，我们会先按内存把模型分为三类：

CAN RUN

**Apple Silicon：** 模型占用 ≤ 统一内存的 52.5%（75% 可用 × 70%）

**独立显卡：** 模型占用 ≤ 显存的 85%

TIGHT

**Apple Silicon：** 模型占用在统一内存 52.5%–75% 之间

**独立显卡：** 模型占用在显存 85%–110% 之间

CAN'T RUN

模型超过可用内存，无法加载，或会频繁 swap 到磁盘，导致不可用。

## Tokens/s 估算

我们用一个简化的“带宽受限模型”来估算推理速度。LLM 推理几乎总是受限于“从内存读取权重的速度”，计算通常不是主要瓶颈。

tok/s ≈ 内存带宽（GB/s）÷ 模型显存（GB）× 效率系数

效率系数对独立显卡取 0.70，对 Apple Silicon 取 0.65（统一内存有略高开销）。这个估算偏保守，实际表现可能因 batch size、上下文长度、量化格式而上下浮动约 ±20%。

## 数据来源

模型信息来自多个来源，并经过人工整理：

›

[HuggingFace API](https://huggingface.co/) — 下载量、点赞量和模型元数据。通过 API 在构建时抓取。

›

[Ollama Library](https://ollama.com/library) — 通过 Ollama 分发模型的拉取量和可用 tags/variants。

› 模型卡、论文和官方公告，用于参数量、架构细节、上下文长度等信息。

› GPU 规格来自官方厂商数据表（NVIDIA、AMD、Intel、Apple），用于显存与带宽参数。

## HuggingFace 统计

我们在构建时通过 HuggingFace 公共 API 拉取下载量和点赞数：

```
// 从 HuggingFace API 获取模型统计
const res = await fetch(
  `https://huggingface.co/api/models/${repoId}`
);
const data = await res.json();
// data.downloads → 2_450_000
// data.likes     → 12_500
```

## Apple Silicon：统一内存

Apple Silicon 的 CPU 与 GPU 共享同一块内存（统一内存架构）。这意味着模型可使用总 RAM 的约 75%，远高于受限于独立显存的传统独显。36 GB 的 MacBook Pro 可以运行约 27 GB 的模型，而 8 GB 显卡的 PC 则无法运行。我们的计算会据此处理：把 Apple Silicon 视作单一内存池，并采用 75% 可用上限。

## 隐私与透明度

所有硬件检测和评分都在你的浏览器中完成，不会向任何服务器发送数据。GPU 名称、RAM 和基准测试结果都不会离开你的设备。网站使用 [Astro](https://astro.build/) 构建，并且在不需要交互的页面上不下发 JavaScript。

由 [midudev](https://midu.dev/) 为本地 AI 社区构建

本网站中提及的所有产品名称、徽标和品牌均归各自所有者所有。Apple、NVIDIA、AMD、Intel、Qualcomm 以及本网站提及的所有 AI 模型名称，均为其持有方的商标或注册商标。本网站与这些公司无隶属关系，也未获得其背书。
