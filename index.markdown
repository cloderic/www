---
layout: default
title:
---

# Latest posts #
{% for post in site.posts limit: 5 %}

{% assign level = 2 %}
{% include post_excerpt.html %}

{% unless forloop.last %}
------------------------
{% endunless %}

{% endfor %}