---
ref: publications
lang: es
translation: draft
layout: archive
title: "Publicaciones"
permalink: /es/publications/
author_profile: true
---

{% if site.author.googlescholar %}
  Promuevo la ciencia abierta, por lo que la mayoría de mis artículos están disponibles gratuitamente a través de su enlace DOI, en mi <u><a href="{{site.author.googlescholar}}">perfil de Google Scholar</a></u> y en mi <u><a href="{{site.author.researchgate}}">perfil de ResearchGate</a></u>. Si no encuentra el PDF, [escríbame](mailto:diego.cusicanqui@univ-grenoble-alpes.fr).
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
