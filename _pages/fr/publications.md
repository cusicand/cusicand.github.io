---
ref: publications
lang: fr
translation: draft
layout: archive
title: "Publications"
permalink: /fr/publications/
author_profile: true
---

{% if site.author.googlescholar %}
  Je défends la science ouverte : la plupart de mes articles sont donc librement accessibles via leur lien DOI, sur mon <u><a href="{{site.author.googlescholar}}">profil Google Scholar</a></u> et sur mon <u><a href="{{site.author.researchgate}}">profil ResearchGate</a></u>. Si vous ne trouvez pas le PDF, [écrivez-moi](mailto:diego.cusicanqui@univ-grenoble-alpes.fr).
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
