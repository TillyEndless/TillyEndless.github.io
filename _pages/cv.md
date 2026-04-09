---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 2
description: Curriculum Vitae (PDF).
---

{% assign cv_pdf = '/assets/pdf/cv.pdf' | relative_url %}

<p>
  <a href="{{ cv_pdf }}" target="_blank" rel="noopener noreferrer">
    Download CV (PDF)
  </a>
</p>

<object data="{{ cv_pdf }}" type="application/pdf" width="100%" height="900px">
  <p>
    Your browser can't display the PDF inline.
    <a href="{{ cv_pdf }}" target="_blank" rel="noopener noreferrer">Open the CV</a>.
  </p>
</object>
