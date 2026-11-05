---
layout: page
title: Online CV
permalink: /cv-json/
redirect_from:
  - /resume-json
---

<p><a class="btn btn-sm z-depth-0" href="{{ '/cv/' | relative_url }}">Download the current PDF CV</a></p>

## Education

{% include profile-education.liquid %}

## Publications & Manuscripts

<div class="publications">
{% bibliography %}
</div>

## Research Experience

{% include research-experience.liquid %}

## Awards

{% include profile-awards.liquid %}

## Skills

{% include profile-skills.liquid %}
