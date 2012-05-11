---
layout: default
title: Archives
---

{% for post in site.posts %}
	{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
	{% if forloop.first %}
# {{ year }} #
	{% else %}
		{% if year != previous_year %}
# {{ year }} #
		{% endif %}
	{% endif %}

	{% assign level = 3 %}
	{% assign short = true %}
{% include post_excerpt.html %}
	{% assign previous_year = year %}
{% endfor %}