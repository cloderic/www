---
layout: default
title: home
---

{% assign first_post = site.posts.first %}
##<a href="{{ first_post.url }}">{{ first_post.title }}</a>##

{{ first_post.date | date_to_string }}

{{ first_post.content }}

## Archives ##

{% for post in site.posts %}
 - {{ post.date | date_to_string }} - [{{ post.title }}]({{ post.url }})
{% endfor %}