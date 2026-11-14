---
ref: publications
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if site.author.googlescholar %}
  I promote open-source research, so most of my papers are freely available through their DOI link in my <u><a href="{{site.author.googlescholar}}">Google Scholar profile</a></u> and my <u><a href="{{site.author.researchgate}}">ResearchGate profile</a></u>. Just [drop me a line](mailto:diego.cusicanqui@univ-grenoble-alpes.fr) if you can't find the PDF.
{% endif %}

{% include base_path %}

{% assign pubs = site.publications | reverse %}
{% assign pubs_by_year = pubs | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year in pubs_by_year %}
  <h2 class="pub-year" id="y{{ year.name }}">{{ year.name }}</h2>
  {% for post in year.items %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %}

<script src="{{ base_path }}/assets/js/bibtex.js" defer></script>
