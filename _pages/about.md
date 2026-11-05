---
permalink: /
title: About Me
layout: about
subtitle: >
  Computer Science · Chu Kochen Honors College, Zhejiang University<br>
  Email: <a href="mailto:endlesstilly@gmail.com">endlesstilly@gmail.com</a> · <a href="https://github.com/TillyEndless">GitHub</a> · <a href="/cv/">CV</a>
profile:
  align: right
  image: profile.jpg
  image_circular: false
social: false
announcements:
  enabled: false
latest_posts:
  enabled: false
selected_papers: false
redirect_from:
  - /about/
  - /about.html
---

<p class="about-text">
  I am an undergraduate in Computer Science and Technology at
  <a href="https://www.zju.edu.cn/english/"><strong>Zhejiang University</strong></a>’s
  <a href="http://ckc.zju.edu.cn/">Chu Kochen Honors College</a>, with an expected graduation date of June 2027.
</p>
<p class="about-text">
  In <strong>27 fall</strong>, I will pursue a master’s degree at <strong>Zhejiang University</strong>’s
  College of Computer Science and Technology, in the <strong>CAD&amp;CG Lab</strong>,
  advised by <a href="https://cshen.github.io/"><strong>Prof. Chunhua Shen</strong></a>
  and <a href="https://shawnricecake.github.io/"><strong>Prof. Xuan Shen</strong></a>.
</p>
<p class="about-text">
  My research focuses on <strong>efficient video and world models</strong>, from long-term KV memory
  and mixed-precision attention to sparse attention for multi-view geometry. I work across algorithm
  design and CUDA kernels to improve inference efficiency while preserving generation quality and geometric accuracy.
  I also study <strong>model-based reinforcement learning</strong> and <strong>latent reasoning in LLMs</strong>.
</p>
<p class="about-text">
  My long-term goal is physically grounded intelligence: models that can represent the world,
  imagine beyond observed experience, and reason efficiently.
</p>
<p class="content-updated">Last updated: November 5, 2026</p>

<nav class="profile-section-links" aria-label="Homepage sections">
  <a href="#news">News</a>
  <a href="#education">Education</a>
  <a href="#publications">Publications</a>
  <a href="#research">Research</a>
  <a href="#awards">Awards</a>
  <a href="#skills">Skills</a>
</nav>

## News {#news}

<ul class="profile-news">
  <li><time>Oct. 2026</time><span><strong>DraftKV</strong>: an ongoing project on efficient long-term memory for video generation.</span></li>
  <li><time>Sept. 2026</time><span><strong>Draft Attention v2</strong> and <strong>MosaicAttention</strong> are under review.</span></li>
  <li><time>2026</time><span><strong>Mind Dreamer</strong> was accepted to <strong>ICML 2026</strong>. <a href="https://arxiv.org/abs/2605.16030">Paper</a></span></li>
</ul>

## Education {#education}

{% include profile-education.liquid %}

## Publications & Manuscripts {#publications}

<p class="profile-meta">Accepted work, manuscripts under review, and an ongoing project are labeled separately below.</p>
<div class="publications">
{% bibliography %}
</div>

## Research Experience {#research}

{% include research-experience.liquid %}

<details class="research-media">
  <summary>World-model research overview &amp; visualizations</summary>
  <figure>
    <img src="{{ '/images/path.png' | relative_url }}" alt="Research overview connecting representation, world dynamics, control, and embodied interaction" loading="lazy">
    <figcaption>World-model research: connecting representation and dynamics to decision-making.</figcaption>
  </figure>
  <div class="research-visualizations">
    <img src="{{ '/images/image_paper.png' | relative_url }}" alt="Mind Dreamer research diagram" loading="lazy">
    <img src="{{ '/images/random_mosaic_4x6.gif' | relative_url }}" alt="World-model imagination visualization" loading="lazy">
  </div>
</details>

## Awards {#awards}

{% include profile-awards.liquid %}

## Skills {#skills}

{% include profile-skills.liquid %}

## Additional Project {#competitions}

<div class="research-item">
  <h3>ClawKeeper</h3>
  <p class="profile-meta">2026 NVIDIA DGX Spark Hackathon</p>
  <p>Security management and work monitoring for AI agents, combining a security control plane, runtime watchdog, and structured operator feedback.</p>
  <p class="profile-meta"><strong>Xiaoling Zhou</strong>, Lei Hong, Yifeng Guan, Chengbo Sun, Haoyuan Chen</p>
  <details>
    <summary>Project details</summary>
    <p>Risk-aware tool interception and auditing; timeout, stall, loop, and repeated-output detection; runtime health probes and operator notifications.</p>
    <img class="project-diagram" src="{{ '/images/competition.png' | relative_url }}" alt="ClawKeeper security control plane, runtime watchdog, and operator feedback" loading="lazy">
  </details>
  <a href="https://github.com/hollyhongever/ClawKeeper">Project repository</a>
</div>
