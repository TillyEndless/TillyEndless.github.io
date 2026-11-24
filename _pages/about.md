---
permalink: /
title: "About Me"
layout: liwei-home
author_profile: false
redirect_from: 
  - /about/
  - /about.html
---
<p class="about-text">
  I am a senior undergraduate student at
  <a href="https://www.zju.edu.cn/english/" target="_blank" rel="noopener noreferrer">Zhejiang University</a>
  (Chu Kochen Honors College), majoring in Computer Science and Technology (expected B.Eng. 2027).
  I have worked on research at
  <a href="https://www.tsinghua.edu.cn/en/" target="_blank" rel="noopener noreferrer">Tsinghua University</a>,
  where I worked with Prof. Luping Shi and Prof. Rong Zhao on <b>model-based reinforcement learning</b> and <b>world models</b>.
  Previously, I worked on continuous reasoning for large language models at Zhejiang University.
</p>

<div style="height: 1px;"></div>

<p class="about-text">
  I am obsessed with one question:
  <b><i>"What is the realizable path toward physical intelligence?"</i></b>
</p>

<p class="about-text">
  My answer is to build
	  <span style="
	    display: inline-block;
	    background: var(--light-gray);
	    border: 1px solid var(--border-color);
	    border-radius: 6px;
	    margin-bottom: 0.2em;
	    padding: 0.1em 1.02em;
	    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06),
	                0 1px 2px rgba(0, 0, 0, 0.04);">
	    <b>
	      <span style="color:#FF6B6B;">Physically</span>
	      <span style="color:#5CA9C9;">Consistent</span> and
	      <span style="color:#ffb300;">3D-Aware</span>
      World Models
    </b>
  </span>
  as a foundation for physical intelligence.
</p>

<p class="about-text">
  Through my previous work on LM interpretability and continuous reasoning, I came to realize that today’s models achieve abstraction over text and 2D visual tokens, but these foundations are not enough for true spatial intelligence.
</p>

<p class="about-text">
  I believe the next generation of physical AI will require stronger 3D inductive biases, better spatial representations, and ultimately the ability to predict how the world changes after actions.
</p>

<p class="about-text">
  My long-term goal is to help turn AI into a <b>physically grounded assistant beyond the screen</b>.
</p>

<p class="about-text">
  The following figure summarizes how I currently think about this research path.
</p>

<figure style="margin: 2rem 0 1rem 0; text-align: center;">
  <img
    src="{{ '/images/path.png' | relative_url }}?v={{ site.github.build_revision }}"
    alt="A realizable path toward physical intelligence"
    style="max-width: 80%; height: auto; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);"
  />
  <figcaption style="margin-top: 0.8rem; font-size: 0.95rem; color: #666; font-style: italic;">
    My current research focuses on representation and dynamics (modeling).
  </figcaption>
</figure>

<div class="research-interests" aria-label="Research interests">
  <span class="interest-tag">Efficient AI</span>
  <span class="interest-tag">Video Generation</span>
  <span class="interest-tag">Model-based RL</span>
  <span class="interest-tag">World Models</span>
  <span class="interest-tag">Embodied AI</span>
  <span class="interest-tag">Learned Dynamics</span>
  <span class="interest-tag">3D Representations</span>
  <span class="interest-tag">Interpretability</span>
</div>

## News
[2026. 11] DraftKV submitted and under review.  
[2026. 10] Draft Attention v2 and MosaicAttention under review.  
[2026. 05] Mind Dreamer accepted at ICML 2026 (CCF-A).   
[2025. 10] Started research at Tsinghua University on physical world models and RL exploration.   
[2025. 10] Awarded First-Class Scholarship, Zhejiang University.    
[2024. 10] Awarded **National Scholarship (Top 0.5%)** & First-Class Scholarship, Zhejiang University.    

## Publications

- **DraftKV: Protecting Persistent Worlds through Hierarchical Streaming Retrieval** [[PDF]({{ '/files/draftkv.pdf' | relative_url }})] [[Code](https://github.com/TillyEndless/DraftKV)]  
  **Xiaoling Zhou**, Haopeng Li, Yufa Zhou, Rui Ding, Yu Li, Jun Lin, Enze Xie, Chunhua Shen, Xuan Shen  
  *Under Review, November 2026*

- **Draft Attention v2: Fast Video Diffusion with Low-Resolution-Guided Mixed-Precision Attention** [[arXiv](https://arxiv.org/abs/2609.32628)]  
  Rui Ding, Haopeng Li, Weize Ma, Yufa Zhou, Yitong Li, **Xiaoling Zhou**, Jiashuo Cao, Liyang Li, Hua Geng, Jiuxiang Gu, Jun Lin, Enze Xie, Xuan Shen  
  *Under Review, October 2026*

- **MosaicAttention: Hierarchical Block-Sparse Attention for Multi-View Geometry Transformers**  
  Zhizhen Pan, Rui Ding, Weize Ma, **Xiaoling Zhou**, Jun Lin, Chunhua Shen, Xuan Shen  
  *Under Review, October 2026*

- **Mind Dreamer: Untethering Imagination via Active Latent Intervention on Latent Manifolds** [[arXiv](https://arxiv.org/abs/2605.16030)]  
  Shaojun Xu, **Xiaoling Zhou**, Yihan Lin, Yapeng Meng, Xinglong Ji, Luping Shi, Rong Zhao  
  *ICML 2026 (CCF-A), Accepted*

<img src="{{ '/images/image_paper.png' | relative_url }}" alt="Mind Dreamer overview" style="width: 50%;"><img src="{{ '/images/random_mosaic_4x6.gif' | relative_url }}" alt="Mind Dreamer demonstrations" style="width: 50%;">

## Research Experience

- **DraftKV | Hierarchical Streaming KV Retrieval for Persistent World Models** (Sep–Nov 2026)  
  Developed a training-free historical KV retrieval framework combining 3D camera geometry with low-resolution attention relevance. Designed overlapped CPU-to-GPU KV streaming and attention computation with fixed-size GPU staging buffers. Achieved **3.27× end-to-end speedup** and **42.2% peak GPU memory savings** compared with other CPU-offloaded KV retrieval methods, enabling historical KV retrieval for SolarWM-33B on a single H100.

- **DraftAttention2 | Low-Resolution-Guided Mixed-Precision Video Generation** (Jul–Oct 2026)  
  Combined average/max-pooled attention importance estimates with 16-bit, 8/4-bit and sparse computation. Fused quantization, data reordering and cross-precision online softmax into a CUDA kernel. Achieved up to **2.51×/2.60× DiT inference speedup** on HunyuanVideo-13B and MiniMax-H3, and **1.87× speedup** for 8-step video generation while retaining near-dense generation quality.

- **MosaicAttention | Sparse Attention for Multi-View Geometry Transformers** (Jul–Oct 2026)  
  Used 2D average/max pooling and hierarchical sparse routing to preserve important cross-view interactions, with mixed-precision computation for efficiency. Achieved up to **3.12× end-to-end inference speedup** with 128 input views on multi-view geometry tasks while maintaining or improving accuracy.

- **Mind Dreamer | Active Latent Intervention for World Model Imagination** (Oct 2025–May 2026)  
  Addressed historical tethering in model-based reinforcement learning by actively generating valuable latent starting states and guiding exploration with task value and uncertainty. Achieved **1.67× average and up to 8.8× sample efficiency improvements** over DreamerV3 on DeepMind Control Suite tasks.

## Competitions {#competitions}
- **2026 NVIDIA DGX Spark Hackathon**   
**Project: ClawKeeper: Security Management &amp; Work Monitoring System Based on NemoClaw**   
**Xiaoling Zhou**, Lei Hong, Yifeng Guan, Chengbo Sun, Haoyuan Chen   
<div class="education-item">
  <details style="margin-top: 0.35rem;">
    <summary style="cursor: pointer; color: var(--secondary-color); font-weight: 600;">
      Details
    </summary>
    <div class="year" style="margin-top: 0.6rem;">
      <b>领域：</b> 智能体运营
    </div>
    <div class="year">
      Built an operator-facing runtime stack that bridges agent capability and operability via security controls, runtime watchdog monitoring, and structured operator feedback.
    </div>
    <div class="year">
      <b>What we built:</b> Security Control Plane (risk-aware tool interception + auditing) &middot; Runtime Watchdog (timeout/stall/loop &amp; repeated-output detection + health probes) &middot; Operator Feedback (structured events for notifications/dashboards).
    </div>
    <div class="year">
      <a href="https://github.com/hollyhongever/ClawKeeper" target="_blank" rel="noopener noreferrer">Project repo</a>
    </div>
    <div class="year" style="margin-top: 0.65rem;">
      <img
        src="{{ '/images/competition.png' | relative_url }}"
        alt="ClawKeeper runtime stack: security control plane, runtime watchdog, operator feedback"
        style="width: 100%; max-width: 588px; border-radius: 10px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); display: block; margin: 0 auto;"
      >
    </div>
  </details>
</div>


## Awards {#awards}
<div class="education-item">
  <h3>🏆 National Scholarship (Undergraduate)</h3>
  <div class="institution">2024/10</div>
  <div class="year">Awarded by Ministry of National Education to Top 0.5% students</div>
</div>
<div class="education-item">
  <h3>🏆 First Prize - Zhejiang University Scholarship</h3>
  <div class="institution">2024/10, 2025/10</div>
  <div class="year">Awarded by Zhejiang University</div>
</div>
<div class="education-item">
  <h3>🏆 Scholarship for Leading Achievement</h3>
  <div class="institution">2024/11</div>
  <div class="year">Awarded by Chu Kochen Honors College to Outstanding students</div>
</div>
<div class="education-item">
  <h3><span aria-hidden="true" style="display: inline-block; filter: grayscale(1) brightness(1.25) contrast(1.05); margin-right: 0.35rem;">🏆</span>Second Prize - College Students’ Physics (Theory) Innovation Competition</h3>
  <div class="institution">2025/01</div>
  <div class="year">Awarded by Zhejiang Physical Society</div>
</div>
