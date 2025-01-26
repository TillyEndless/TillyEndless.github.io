---
title: Multi-Level Optimal Transport for Universal Cross-Tokenizer Knowledge Distillation on Language Models
published: 2025-01-25
description: ''
image: ''
tags: [notes]
category: '嗑嗑论文'
draft: false
lang: ''
---
arXiv:2412.14528v2

---
这篇论文 “Multi-Level Optimal Transport for Universal Cross-Tokenizer Knowledge Distillation on Language Models” 主要针对 **跨分词器知识蒸馏（Cross-Tokenizer Knowledge Distillation, CTKD）** 的问题提出改进方案，核心贡献如下：

1. 主要解决的问题

1.1. 传统知识蒸馏（KD）存在的跨分词器问题
- 现有的 KD 方法通常要求 教师模型（Teacher Model） 和 学生模型（Student Model） 共享相同的 tokenizer（分词器），以确保 logits 之间的严格对应关系。
- 但在实际应用中，不同架构的 大语言模型（LLMs） 可能使用不同的分词器（如 WordPiece、Byte Pair Encoding（BPE）、SentencePiece 等），这导致：
- 传统的 KD 方法（如 KL 散度、JS 散度）要求 逐 token 对齐（token-by-token alignment），但不同分词器的 token 划分方式可能完全不同，导致对齐困难。
- 现有方法如 ULD (Universal Logit Distillation) 采用 token-wise 最优传输（Optimal Transport, OT） 解决部分对齐问题，但忽略了 全局上下文信息，并且填充操作（zero-padding）会引入噪声。
- 另一个方法 DSKD (Dual-Space Knowledge Distillation) 试图通过投影将 logits 对齐，但其方法仍然依赖 token-by-token 级别的映射，导致信息丢失。

1.2. 现有方法的不足
- 严格的维度对应限制：传统方法要求教师和学生模型的 token 维度一致，但不同 tokenizer 可能会将相同的文本拆分为不同数量的 tokens，导致难以直接对应。
- 信息丢失：许多方法仅对齐 logits，而忽略了跨 token 之间的 全局上下文 结构信息。
- 计算效率问题：计算 Wasserstein 距离通常计算开销大，尤其是在大规模 LLM 训练时难以高效优化。

2. 论文提出的改进方法

2.1. 多级最优传输（Multi-Level Optimal Transport, MultiLevelOT）

核心思路：通过 最优传输（Optimal Transport, OT） 方法，在 token 级别（token-level） 和 序列级别（sequence-level） 同时对齐教师和学生模型的 logits 分布，以消除不同 tokenizer 之间的对齐限制。

(1) Token 级别的对齐
- 论文在 token 级别引入 全局信息优化，而非仅对单个 token 进行逐点对齐：
- 采用 序列级排名（sequence-level ranking），确保 token 之间的相对重要性不变，而非仅进行点对点映射。
- 通过 截断（truncation） 仅保留最重要的 logit 维度，避免填充（padding）带来的噪声影响。

(2) 序列级别的对齐
- Sinkhorn 距离（Sinkhorn Distance）：用于高效逼近 Wasserstein 距离，能够在不同 tokenizer 之间自动找到 token 之间的最佳映射关系。
- 通过 序列级最优传输（sequence-level optimal transport），避免了强制对齐 token-by-token，增强了知识蒸馏的通用性。

3. 论文贡献
- 提出 MultiLevelOT 方法，同时在 token 级别和序列级别进行最优传输，确保不同 tokenizer 之间的有效知识蒸馏。
- 引入 Sinkhorn 距离 作为 Wasserstein 距离的高效替代方案，减少计算复杂度，同时保证良好的几何对齐效果。
- 在多种 NLP 任务（如问答、摘要生成）上进行实验，证明其方法比现有的 ULD、DSKD 等 SOTA 方法更优。
- 增强了知识蒸馏的通用性，支持不同架构的教师-学生模型组合（如 LLaMA2, Mistral, Qwen, OPT, Pythia 等）。

4. 结论

该论文主要解决了 跨分词器知识蒸馏（Cross-Tokenizer KD） 的问题，并提出了 Multi-Level Optimal Transport (MultiLevelOT) 作为改进方案。这一方法结合 序列级别和 token 级别的最优传输，使得知识蒸馏能够在不同 tokenizer 之间更高效地进行，克服了传统 KD 方法的局限性，同时保证计算效率和泛化能力。

---



