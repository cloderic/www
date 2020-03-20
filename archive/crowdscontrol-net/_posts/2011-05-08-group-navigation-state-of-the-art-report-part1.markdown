---
layout: post
title: "Group navigation state-of-the-art report - Part 1, Introduction and Taxonomy"
redirect_from:
 - /group-navigation-state-of-the-art-report-part
img: "/images/posts/2011/sheeps-herd.jpg"
tags:
 - paper
 - navigation
---

*The full article is available [here](/group-navigation-state-of-the-art-report).*

## Introduction ##

Autonomous human-like characters being able to navigate in a 3D environment finding their paths and avoiding collisions while exhibiting a convincing behavior is now fairly common. The popularity and the quality of recent work (Van den Berg, Lin, and Manocha 2008; Pettré et al. 2009; Ondrej et al. 2010; Mononen 2010) shows that the simulation of hundreds of navigating entities is now within the reach of almost everyone. But most of these work focus on simulating lonely entities taking their neighbors into account only to avoid collisions. Like real ones, our virtual humans should be able to walk down the road with their group of friends. Like real ones, our virtual soldiers must be able to march on enemy positions while staying in formation. And like real ones, our virtual tourists have to be able to enjoy their tour of the Mont Saint-Michel following their guide's umbrella.

Before we start designing and implementing group navigation behaviors in Golaem Path (Golaem n.d.), let's first see what others have done. This document is a state-of-the-art study of existing work concerning group and formations navigation with a focus on algorithms and implementations. The first part defines the different categories of navigating groups we're interested in. The second part focuses on how the group members can stay grouped or in formation during navigation. The third and last part talks about the group's navigation from path planning to steering and collision avoidance.

## Taxonomy ##

Before we talk velocity, steering behaviors and gradient descent, let's first present the kind of groups we're trying to make navigate, their characteristics and their constraints. In this part we'll divide navigating groups in three categories, flocks, formations and small groups resulting of social influences.

### Flocks ###

![Sheeps herd](/images/posts/2011/sheeps-herd.jpg)

A flock is primarily a group of bird traveling together but it can be applied to other animal species as well as humans (e.g. a flock of school children is crossing the street to the swimming pool). Entities in a flock travel at roughly the same speed and form a cohesive group without strict arrangement. In what must be the two most cited articles in the field (Reynolds 1987; 1999), Reynolds studied empirically how flocks members move relatively to each others. With simple behaviors he was able to recreate a flock of autonomous entities, we'll dig into more details in part 2.

### Formation ###

![Bastille day](/images/posts/2011/bastille-day.jpg)

While flocks do not follow more rules than the cohesion of the group, formations are a kind of group arrangement where members need to enforce strict rules. Both in a combat or a parade, the spatial arrangement, i.e. the relative positions of members, is designed for a precise purpose, tactic or aesthetic; it is the first rule that needs to be followed. Secondly, in a combat context, formation gets much of its usefulness from overlapping fields of fire and sight, that's why the orientation is another rule to be followed (Dawson 2002). The last rule is to assign entities having the right role to the right slot: archers at the back, footsoldiers facing the enemy. As navigation and military simulation are important for real time strategy games, interesting and working solutions has been developed early: Dave Pottinger, who worked on the Age of Empire series, presented his in a Gamasutra article (Pottinger 1999).

### Small Social Groups ###

![Groups of 2, 3 and 4 from video corpus](/images/posts/2011/social-groups.jpg)

Beyond amorphous flocks and rigid military formations, groups that are more common in our everyday life are small and their spatial configuration is the result of social factors and crowd density. Two recent survey focuses on those small social groups (Moussaïd et al. 2010; Peters, Ennis, and O'Sullivan 2009), they lead to the same conclusions.

The two studies were conducted from videos taken at public spaces (in France and Ireland). Their observations show that: there are more groups than single pedestrians, groups of more than four are very rare and most of the groups are, indeed, pairs.

More interesting, it appears the formation adopted by the observed groups is influenced both by the lateral clearance to nearby obstacles and by the social interaction between members of the group. When motion is not constrained (i.e. when obstacles are far and the crowd density is low) a group tends to adopt an abreast formation that facilitates dialog between its members. When facing navigation constraints, to reduce its frontal width, the group compact the formation. And when the lateral space between each member become too thin, i.e. when members are shoulder-to-shoulder, the formation is staggered. The bending of the group is, most of the time, forward (V-like formation) to maintain good communication when a backward bending (inversed-V-like or wedge formation) would be more flexible moving against an opposite flow.

Finally, while groups tend to avoid collisions, with other pedestrians or with obstacles, as a whole they are able to split if needed merging back afterwards.

## Bibliography ##

- Dawson, Chad. 2002. &ldquo;Formations.&rdquo; Pp. 272-282 in AI Game Programming Wisdom, Steve Rabinedited by. Charles River Media Retrieved (<http://introgamedev.com/resource_aiwisdom.html>).
- Golaem. n.d. &ldquo;Golaem Path.&rdquo; Retrieved (<http://www.golaem.com/content/products/golaem-sdk/features>).
- Mononen, Mikko. 2010. &ldquo;Navigation Loop.&rdquo; Paris Game/AI Conference 2010. Retrieved (<http://digestingduck.blogspot.com/2010/07/my-paris-game-ai-conference.html>).
- Moussaïd, Mehdi, Niriaska Perozo, Simon Garnier, Dirk Helbing, and Guy Theraulaz. 2010. &ldquo;The Walking Behaviour of Pedestrian Social Groups and Its Impact on Crowd Dynamics&rdquo; Giuseppe Chiricoedited by. PLoS ONE 5(4):e10047.
- Ondrej, Jan, Julien Pettré, Anne-Hélene Olivier, and Stéphane Donikian. 2010. &ldquo;A synthetic-vision based steering approach for crowd simulation.&rdquo; in The 37th International Conference and Exhibition on Computer Graphics and Interactive Techniques.
- Peters, Christopher, Cathy Ennis, and Carol O'Sullivan. 2009. &ldquo;Modeling groups of plausible virtual pedestrians.&rdquo; IEEE Computer Graphics and Applications 29(4):54-63.
- Pettré, Julien, Jan Ondrej, Anne-Hélene Olivier, Armel Crétual, and Stéphane Donikian. 2009. &ldquo;Experiment-based Modeling, Simulation and Validation of Interactions between Virtual Walkers.&rdquo; Symposium on Computer animation 1-10.
- Pottinger, Dave. 1999. &ldquo;Implementing Coordinated Movement.&rdquo; Gamasutra. Retrieved April 20, 2011 (<http://www.gamasutra.com/view/feature/3314/implementing_coordinated_movement.php?print=1>).
- Reynolds, Craig W. 1987. &ldquo;Flocks, herds and schools: A distributed behavioral model.&rdquo; Pp. 25-34 in 1987 International Conference and Exhibition on Computer Graphics and Interactive Techniques, vol. 21.
- Reynolds, Craig W. 1999. &ldquo;Steering behaviors for autonomous characters.&rdquo; Game Developers Conference 1999.
- Van den Berg, Jur, Ming C Lin, and Dinesh Manocha. 2008. &ldquo;Reciprocal Velocity Obstacles for real-time multi-agent navigation.&rdquo; International Conference on Robotics and Automation 1928-1935.

### Other resources ###
- Sheep herd photography taken from <http://flic.kr/p/Yuy89>.
- Bastille Day military parade photography taken from <http://flic.kr/p/57KrxH>.
