---
layout: page
title: "CV"
nav: true
nav_order: 3
permalink: /cv/
author_profile: false
redirect_from:
  - /resume
---

{% assign cv_version = site.time | date: '%s' %}
{% assign cv_pdf = '/files/cv.pdf' | relative_url | append: '?v=' | append: cv_version %}

<meta http-equiv="refresh" content="0; url={{ cv_pdf }}">
<script>
  window.location.replace("{{ cv_pdf }}");
</script>

If the PDF does not open automatically, [click here to view it]({{ cv_pdf }}).
