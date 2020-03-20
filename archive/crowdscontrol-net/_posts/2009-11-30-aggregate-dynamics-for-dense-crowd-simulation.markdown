---
layout: post
title: "Aggregate Dynamics for Dense Crowd Simulation"
redirect_from:
 - /wordpress-9
tags:
 - paper
 - crowd_simulation
 - navigation
---

Ming C.Lin's lab latest work in crowd simulation has been featured in two recent publications from MIG ([International workshop on Motion In Games](http://www.motioningames.org/)) 2009 and [SIGGRAPH Asia 2009](http://www.siggraph.org/asia2009/) (the article is already published on the author's website). The method presented int those articles, particularly the latter one, is designed to simulate the navigation behaviors of tens of thousand pedestrians at interactive rates. Let's see first the eye candy !

<object id="embedded" width="425" height="344" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000">
<param name="allowFullScreen" value="true" />
<param name="allowScriptAccess" value="always" />
<param name="src" value="http://www.youtube.com/v/pqBSNAOsMDc&amp;rel=0&amp;color1=0xb1b1b1&amp;color2=0xcfcfcf&amp;hl=en_US&amp;feature=player_embedded&amp;fs=1" />
<param name="allowfullscreen" value="true" /> <embed src="http://www.youtube.com/v/pqBSNAOsMDc&amp;rel=0&amp;color1=0xb1b1b1&amp;color2=0xcfcfcf&amp;hl=en_US&amp;feature=player_embedded&amp;fs=1" type="application/x-shockwave-flash" width="425" height="344"></embed>
</object>

Impressed ? So do I, let's see how it works.  This approach combines microscopic goals with macroscopic flow simulation:
 - Each agent is described by its position and its current velocity;
 - A desired velocity is computed by a global planner (roadmap based path planning for example) for each agent;
 - The navigable space is divided in cells, in each cells a flow of particles is computed using the current velocity of the agents in the cell and their density;
 - Given those initial computed velocities the global particle flow is solved at the grid level computing new velocities for each cell;
 - For each pedestrian, a new velocity is computed taking into account the desired velocity and the flow velocity weighted by the local density (The more dense the flow is, the morethe agent's velocity is influenced by the flow's);
 - Finally a simple collision detection and resolution is applied.

Both the visual results and the computation times are really interesting ! Two major problems are still not addressed: no collision prediction (two groups heading towards each other won't try to avoid before collision detection) and no way to add social convention to the avoidance behavior (favor one side of collision avoidance, avoid splitting groups...). This method should be great for dense crowds and/or used as a low LOD for navigation behaviors (this will be the topic of the next article !).

##Bibliography##
 - [_Narain et al. Aggregate Dynamics for Dense Crowd Simulation. SIGGRAPH Asia (2009)_](http://gamma.cs.unc.edu/DenseCrowds/narain-siga09.pdf)
 - _Lin et al. Interactive Modeling, Simulation and Control of Large-Scale Crowds and Traffic. MIG (2009)_
