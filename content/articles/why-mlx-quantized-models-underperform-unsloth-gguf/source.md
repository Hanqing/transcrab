---
title: Why MLX Quantized Models Underperform Unsloth GGUF
date: '2026-03-27T23:43:26.396Z'
sourceUrl: 'https://x.com/Brooooook_lyn/status/2037532299382882794?s=20'
lang: source
---
## The Problem: Not All Layers Are Created Equal

If you've downloaded an MLX-quantized model from the community and noticed it struggling with tool calling, producing incoherent long outputs, or hallucinating more than the GGUF version — you're not imagining it.

The root cause is uniform quantization. Most MLX quantization tools apply the same bit-width to every weight tensor in the model. For standard transformer architectures, this works fine. But Qwen3.5 is a hybrid model — it alternates between full self-attention layers and GatedDeltaNet (linear attention/SSM) layers.

Unsloth's research across 150+ KL Divergence benchmarks reveals the damage:

The linear_attn.out_proj tensor — unique to the GatedDeltaNet layers — is 120x more sensitive than lm_head. Quantizing it to 4-bit is like compressing the most critical part of a JPEG to 1% quality while leaving the background at 95%.

Uniform quantization wastes bits on tensors that don't need them and destroys tensors that can't survive the precision loss.

## The Fix: Spend Bits Where They Matter

The solution is per-tensor mixed-bit quantization — assigning each weight tensor a precision level based on its actual sensitivity. This is what Unsloth's Dynamic 2.0 recipe does for GGUF, and what we've ported to MLX.

At the default 3-bit base, the allocation looks like:

The key insight: o_proj and out_proj have no preceding norm layer, so AWQ can't correct them. In Unsloth's GGUF pipeline, these tensors are still quantized to Q5_K using imatrix importance weighting — a technique that doesn't require a preceding norm. But MLX's affine quantization without AWQ correction would produce worse results than GGUF k-quants with imatrix, so the safe fallback is keeping them at bf16. This costs extra disk space, but prevents the quality loss that makes naive quantization unusable for tool calling and structured output.

## Unsloth's Open-Source imatrix: The Foundation

The entire recipe hinges on knowing which channels matter most in each tensor. This comes from [Unsloth's open-source imatrix data](https://huggingface.co/unsloth/Qwen3.5-35B-A3B-GGUF/tree/main) — per-channel importance scores computed from over 150 KLD benchmarks across 121 quantization configurations.

What makes Unsloth's imatrix special is the calibration dataset: high-quality conversational, coding, and tool-calling examples — significantly better than the Wikipedia-based calibration most community quantizers use. This matters because importance scores are only as good as the data they're calibrated on. A Wikipedia-calibrated imatrix will under-weight channels critical for code generation and tool calling.

The imatrix serves two purposes:

1. AWQ pre-scaling — tells us which weight channels to amplify before quantization
2. Sensitivity analysis — the KLD benchmarks that determine each tensor's bit allocation
I applied the imatrix with our quantized Qwen models

## Try It Yourself

Huggingface collection: https://huggingface.co/collections/Brooooooklyn/qwen-35-unsloth-mlx

## Benchmark

We tested using [ToolCall-15](https://github.com/stevibe/ToolCall-15), an open-source benchmark that evaluates LLM tool-calling capabilities across 15 deterministic scenarios in 5 categories:

- Tool Selection — picking the right function
- Parameter Precision — providing correct arguments
- Multi-Step Chains — executing dependent tool call sequences
- Restraint & Refusal — declining when no tool applies
- Error Recovery — handling tool failures gracefully
All tests run at temperature 0 with mocked tool outputs, making results fully reproducible.

All our quantized models perform the same as Unsloth UD-Q3_K_XL models.

For the full technical deep-dive — including AWQ scale formulas, the complete control flow from CLI to safetensors output, and how mixed-bit models execute at runtime —  [Unsloth MLX: Bring Dynamic 2.0 Per-Tensor Quantization to Apple Silicon.](https://lyn.one/unsloth-quantize-recipe)
