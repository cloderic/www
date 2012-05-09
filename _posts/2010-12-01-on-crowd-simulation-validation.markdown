---
layout: post
title: "On crowd simulation validation"
permalink: /on-crowd-simulation-validation
img: "images/posts/2010/validation-bunraku.jpeg"
tags:
 - "crowd simulation"
 - validation
---

*This is a response to Mikko's [latest post](http://digestingduck.blogspot.com/2010/12/style-vs-technique.html) in more than 140 characters...*

Autonomous agents navigation is a very wide topic applied to a wide range of specific domains: Military simulation, public spaces design, games, CG FX and animation, training...
Each of these fields has its definitions of a *valid* human-like characters and while the artistic aspect is very important in games or animation it is not for military simulations for exemple. Validations methods are numerous and each is suited for a few parameters only:
- Motion captured data in labs can be used to check agents trajectories and velocities in various scenarios (cf. [Julien Pettré work](http://www.irisa.fr/bunraku/GENS/jpettre/));

![Navigation motion capture]({{ site.url }}/images/posts/2010/validation-bunraku.jpeg)

- Survey can evaluate various visual aspects of virtual humans (cf. [Rachel McDonnell work](http://gv2.cs.tcd.ie/mcdonner/));
- Real world video footage can be treated to validate a simulation output;
- Hand measured flows (e.g. number of pedestrians per minutes passing through a door) can validate some aspects too;
- but most of the time though, the only validation is the expert's opinion (movie director, military instructor...).

Anyway, in the end, for real-time use cases, validity comes in consideration only after CPU/GPU/memory usage...