---
layout: post
title: "Learning WebGL"
permalink: /learning-webgl
tags:
 - WebGL
 - flocking
---

So this is my new home project, I'm learning WebGL.

I haven't worked with a new platform in a long time (except 3DVIA Studio, but let's just say it's not that fun) and I'm getting quite bored by the usual C++ I'm doing at work; I'm just speaking about the code part, I'm hopefully very interested by the algorithms and software architecture parts. I have several reasons to chose WebGL :
- I'm a little familiar with the 3D on the web thing and most of what I've seen has not delivered on its promises (VRML, papervision, MPEG-4 System, O3D...);
- Some guys are doing [really](http://tinkercad.com/) [amazing](http://plopbyte.net/2011/03/globetweeter/) [things](http://bodybrowser.googlelabs.com/) in webGL;
- I never used directly OpenGL or shaders, webGL is an opportunity to get back those basics;
- Practice javascript.

Anyway, I'm currently doing [those tutorials](http://learningwebgl.com/blog/?page_id=1217), so far (I'm at lesson 8) they are really good ! But, as I thing you can't learn anything without a real project, the objective is to do a working little webapp. My current goal is to implement a [Reynolds-style](http://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/) bird flocking algorithm, I've never implemented those kind of things in 3D and I don't need lots of assets to get something ! Once I got this working I'll work on a shephering game; nothing is designed yet but I think it might be fun.

I'm currently looking at high level 3D libraries for webGL, I was wondering if someone had done a little comparison of those.