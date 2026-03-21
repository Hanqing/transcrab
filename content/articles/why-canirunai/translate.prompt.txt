你是一个翻译助手。请把下面的 Markdown 内容翻译成简体中文。
[TransCrab Translation Profile]
- mode: auto
- audience: technical
- style: technical
- auto-resolved-mode: refined
- auto-resolved-audience: technical
- auto-resolved-style: technical
- auto-reasons: 公开发布默认使用 refined 流程，优先质量与稳定性；检测到代码块或表格，判定为技术主题
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
## How it works

CanIRun.ai runs entirely in your browser. When you visit the site, we use browser APIs to detect your GPU, CPU, and memory — then we calculate which AI models can run on your hardware and how fast. No data is sent to any server. Everything is computed client-side.

IMPORTANT — All results are **estimates**. Browser APIs provide limited hardware information — GPU names can be vague, RAM values are approximate, and bandwidth numbers come from spec sheets rather than real measurements. Real-world performance depends on many factors we can't measure from a browser: thermal throttling, background processes, driver versions, OS memory pressure, and more. Use the scores as a general guideline, not as a guarantee.

Detect

Match GPU

Score

S

Grade

## Hardware detection

We use three browser APIs to fingerprint your hardware. No extensions or installs needed.

### WebGL — GPU identification

We create a hidden WebGL canvas and query the `WEBGL_debug_renderer_info` extension to get the GPU name and vendor. This tells us exactly which GPU you have.

```
// Get GPU renderer string
const canvas = document.createElement("canvas");
const gl = canvas.getContext("webgl2");
const ext = gl.getExtension("WEBGL_debug_renderer_info");
const gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
// → "ANGLE (NVIDIA, NVIDIA GeForce RTX 4090, ...)"
// → "Apple M4 Pro GPU"
```

### WebGPU — Architecture info

If your browser supports WebGPU, we request an adapter to get additional device and architecture details.

```
const adapter = await navigator.gpu.requestAdapter();
const info = adapter.info;
// info.device → "nvidia geforce rtx 4090"
// info.architecture → "ampere"
```

### Navigator — CPU & RAM

We use `navigator.hardwareConcurrency` for CPU core count and `navigator.deviceMemory` for approximate RAM. We also run a short CPU benchmark (~30ms) to estimate single-core performance.

```
const cores = navigator.hardwareConcurrency; // → 16
const ram = navigator.deviceMemory;         // → 8 (GB, approximate)
```

## GPU database

Once we identify your GPU, we look it up in a built-in database of ~40 GPUs (NVIDIA, AMD, Intel) and ~12 Apple Silicon chips. Each entry contains the VRAM capacity and memory bandwidth — the two numbers that matter most for running AI models locally.

```
// Example entries from the GPU database
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

## VRAM requirements

Each model in our database has pre-calculated VRAM requirements for every quantization level. The formula is straightforward:

VRAM (GB) = Parameters × Bits per weight ÷ 8 ÷ 1024³ + Overhead

For example, a 70B model at Q4\_K\_M (4-bit) needs roughly 70 × 4 ÷ 8 = 35 GB plus ~1–2 GB overhead for KV cache and runtime buffers.

```
// How we calculate VRAM for each quantization
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

## Scoring algorithm

The score (0–100) combines three factors to answer: "How well will this model run on your hardware?"

Speed (tok/s) 55%

Memory headroom 35%

Quality bonus ~10%

### Speed score (55% weight)

Estimated tokens per second based on your GPU's memory bandwidth and the model's VRAM footprint:

```
const efficiency = isAppleSilicon ? 0.65 : 0.70;
const toksPerSec = (bandwidthGBs / modelVRAM) * efficiency;

// Speed → Score mapping
80+ tok/s → 100 pts     // Instant
40+ tok/s →  85 pts     // Fast
20+ tok/s →  65 pts     // Good
10+ tok/s →  45 pts     // Usable
 5+ tok/s →  25 pts     // Slow
 <5  tok/s →  10 pts     // Painful
```

### Memory headroom (35% weight)

How much of your available memory the model consumes. Lower usage = more room for context, batching, and other processes:

```
const memPct = (modelVRAM / totalMemory) * 100;

// Memory usage → Score mapping
 ≤30% → 100 pts     // Plenty of room
 ≤50% →  80 pts     // Comfortable
 ≤70% →  55 pts     // Moderate
 ≤85% →  30 pts     // Tight
 >85% →  10 pts     // Very tight
```

### Quality bonus (~10%)

A small bonus for larger models since they tend to produce better output. Capped at 15 points to prevent it from dominating the score:

```
const qualityBonus = Math.min(15, Math.log2(paramsBillions + 1) * 2.5);
// 7B → ~7.5 pts, 70B → ~15 pts (capped)
```

### Tight fit penalty

If a model barely fits in memory (status = "tight"), the entire score is multiplied by 0.65. This penalizes models that technically fit but will struggle with swapping and context management.

## Grade scale

The final score maps to a status label:

| Status | Score | Meaning |
| --- | --- | --- |
| Runs great | 85–100 | Fast inference, plenty of headroom |
| Runs well | 70–84 | Good speed, comfortable fit |
| Decent | 55–69 | Usable but not ideal |
| Tight fit | 40–54 | Slow, limited context window |
| Barely runs | 20–39 | Expect very slow output |
| Too heavy | 0–19 | Won't fit in your memory |

## Fit classification

Before scoring, we classify each model into one of three statuses based on memory:

CAN RUN

**Apple Silicon:** Model uses ≤ 52.5% of unified memory (75% usable × 70%)

**Discrete GPU:** Model uses ≤ 85% of VRAM

TIGHT

**Apple Silicon:** Model uses 52.5%–75% of unified memory

**Discrete GPU:** Model uses 85%–110% of VRAM

CAN'T RUN

Model exceeds available memory — won't load or will swap to disk, making it unusable.

## Tokens/s estimation

We estimate inference speed using a simple bandwidth-bound model. LLM inference is almost entirely limited by how fast you can read weights from memory — computation is rarely the bottleneck.

tok/s ≈ Memory bandwidth (GB/s) ÷ Model VRAM (GB) × Efficiency

Efficiency is 0.70 for discrete GPUs and 0.65 for Apple Silicon (unified memory has slightly more overhead). This gives a conservative estimate — real-world performance can vary ±20% depending on batch size, context length, and quantization format.

## Data sources

Model information is gathered from multiple sources and curated manually:

›

[HuggingFace API](https://huggingface.co/) — Download counts, likes, and model metadata. Fetched at build time via the API.

›

[Ollama Library](https://ollama.com/library) — Pull counts and available tags/variants for models distributed through Ollama.

› Model cards, papers, and official announcements for parameter counts, architecture details, and context lengths.

› GPU specs from official vendor datasheets (NVIDIA, AMD, Intel, Apple) for VRAM and bandwidth numbers.

## HuggingFace stats

We fetch download and like counts from HuggingFace at build time using their public API:

```
// Fetch model stats from HuggingFace API
const res = await fetch(
  `https://huggingface.co/api/models/${repoId}`
);
const data = await res.json();
// data.downloads → 2_450_000
// data.likes     → 12_500
```

## Apple Silicon: unified memory

Apple Silicon Macs share memory between CPU and GPU (unified memory architecture). This means the model can use up to ~75% of total RAM — much more than discrete GPUs which are limited to their VRAM. A MacBook Pro with 36 GB can run models that need ~27 GB, while a PC with an 8 GB GPU cannot. We account for this in our calculations by treating Apple Silicon as a single pool with a 75% usable cap.

## Privacy & transparency

All hardware detection and scoring happens in your browser. No data is sent to any server. The GPU name, RAM, and benchmark results never leave your device. The site is built with [Astro](https://astro.build/) and ships zero JavaScript to pages that don't need it.

Built by [midudev](https://midu.dev/) for the local AI community

All product names, logos, and brands are property of their respective owners. Apple, NVIDIA, AMD, Intel, Qualcomm, and all AI model names mentioned on this site are trademarks or registered trademarks of their respective holders. This site is not affiliated with or endorsed by any of these companies.
