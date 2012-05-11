---
layout: default
title: blog
---

# Archives #

{% for post in site.posts %}
	{% unless post.next %}
## {{ post.date | date: '%Y' }} ##
	{% else %}
		{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
		{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
		{% if year != nyear %}
## {{ post.date | date: '%Y' }} ## 
		{% endif %}
	{% endunless %}

{% assign level = 4 %}
{% assign short = true %}
{% include post_excerpt.html %}

{% endfor %}