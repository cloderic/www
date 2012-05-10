---
layout: post
title: "Group navigation state-of-the-art report - Part 2, Stay Grouped!"
permalink: /group-navigation-state-of-the-art-report-part-0
img: "/images/posts/2011/flocking-steering-behaviors.jpg"
tags:
 - state-of-the-art report
 - navigation
---

*The full article is available [here](/pages/group-navigation-state-of-the-art-report.html).*

## Stay grouped! ##

In order to get a valid simulation of group navigation we first have to design the behavior of the group members. In this part we'll study two families of methods to obtain groups: using local rules or following a designed formation. Finally we'll focus on how a member's individual navigation behavior is affected when part of a group.

### Emergence ###

In most modern navigation engine, the simulated entities are autonomous, their behavior rely on their local "perception" to take action not on an external choreographer. With this approach in mind, several works relies on decentralized behavior to enforce group constraints.

#### Flocking ####

![Reynold's flocking steering behaviors](/images/posts/2011/flocking-steering-behaviors.jpg)

At the core of Reynolds' work (Reynolds 1987; 1999), three steering behaviors allows entities to flock. For any given entity in the group, separation makes him move apart too close neighbors, alignment makes him go in the same direction as other members and cohesion makes him move towards the group's COM (center of mass). These simple behaviors allow the emergence of a flock. Others took inspiration from this work and adapt it to their architecture using voting steering behaviors (Hostetler and Kearney 2002) or relying on specific environment abstraction such as grids (Loscos, Marchal, and Meyer 2003) or roadmaps (O Burchan Bayazit, Lien, and Amato 2003; Kamphuis and Overmars 2004).

#### Social relations ####

In his recent paper, Moussaïd (Moussaïd et al. 2010), extends the social force model (Helbing, Farkas, and Vicsek 2000) to obtain flocking as well as more structured small formation introducing a communication force. The gaze of group members is attracted by the center of interest of the group; here its center of mass (COM) is used. The communication force tries to limit the gaze deviation by decelerating the entity thus enabling the observed V-like formation (cf. part 1).

In order to take into account social relations between members of the group, Qiu uses a member-to-member influence matrix (Qiu et al. 2010). This matrix is taken into account when computing the attraction between members of the group. This approach allows the definition of one or more attractive (or repulsive) members of the group such as more talkative persons or tourist guides.

#### More rigid formations ####

![Attachment sites](/images/posts/2011/attachment-sites.jpg)

Local rules can also exhibit a more strict formation. Taking inspiration from molecular crystals, Balch and Hybinette designed the attachment sites method (Balch and Hybinette 2000). Each entity, given its desired formation, computes several attachment sites on its neighbors and steers to reach the nearest available. The resulting formation arrangement is a direct result of the attachment sites position and it can scale to any number of group members. But as the attachment rules are local, no control on the formation overall shape is possible.

### Choreography ###

While groups whose members are implementing local rules can exhibit convincing behavior, they can't take into account the group as a whole and thus are not fully controllable. If an exact group arrangement is needed, some of the behavior must be deported to an upper level of control (Musse and Thalmann 2001). In this part we'll study the three features needed to make a group stay in a given formation: the formation design, the slot assignment and the formation hold.

#### Design ####

A formation is basically a list of slots to which members of the group will be assigned. As we focus on pedestrian navigation, a slot is basically a 2D position relative to the group &ldquo;center&rdquo;. In a military context two properties of the slot must be added, as we saw in part 1: the orientation and the role (i.e which kind of entity should be assigned to this slot).

Such a formation definition can be designed manually following military principles or artistic concerns (Dawson 2002).  Another approach has been taken by Karamouzas and Overmars (Karamouzas and Overmars 2010), they extracted from the data collected by Moussaïd et al. (Moussaïd et al. 2010) a set of typical formations for small social groups of 2 to 4 members. The following figure shows the three kinds of formations they get for groups of 3; similar formations are obtained for groups of 2 or 4.

#### Assign ####

We now assume the formation design is chosen and defines as many slots as group members; if not, simple techniques can be used to select the used slots or create needed slots (Silveira, Prestes, and Nedel 2008). The next needed step before our entities can navigate as a group, is to assign each of them to a slot. This part might seem trivial but should be implemented right to avoid destroying the simulation credibility with traffic jams between members of the same groups.

Implementation-oriented papers (Dawson 2002; Millington 2006) describe different solutions and their quality. As everyone should expect, random or index-based (ith members with ith slot) assignment are most of the time really bad: the entities might have to cross each others and to circle around the group to get to their slot. To avoid this bad result, one solution could be to, sequentially assign to each entity, its closest free spot, this solution is easy to implement and might work but last entities might end up to far slots as the closest one are already taken. The best solutions would be to globally minimize the distance the entities are covering to get to their slots but its implementation would lead to an *O(n!)* complexity as every permutation would have to be tested.

One solution to get a good result and keep a good complexity is a two steps process. First compute for each members of the group what is their cost to be assigned to which slot, allowing certain slot to be specialized for certain entity roles. Then, from the most expensive to assign to the cheapest assign entities to their preferred available slot. This solution might fail to get the optimal assignment but should have decent result while keeping a low complexity *O(n2)* (Millington 2006).

Another solution works only when no specialized slots are defined. Given a formation design, first sort the slots spatially; for a horizontal line formation, the slot might be sorted from left to right along a horizontal vector. Then sort the group members in the same way; finally assign the ith entity to the ith slot (Dawson 2002).

#### Maintain ####

The formation being built, entities are able to reach their slots and to arrange into the designed formation. Let's see how they are able to maintain it while the group is moving.

In earlier work (Pottinger 1999), a simplistic approach is taken: once part of a formation, entities are no longer responsible for their steering, their position is set at each time step according to the formation. This solution is fine if the group steering (cf. part 3) is robust enough to handle the desired level of collision avoidance.

Using the latter solution, the members do not have an own steering behavior: it is difficult to get anything but a strictly followed formation. To allow formations of individuals, several works uses a more loose approach, members are given a local goal to reach in order to stay in formation and are in charge of fulfilling this goal. A simple approach is to provide each member with a simple &ldquo;reach target&rdquo; steering behavior where the target is its slot's future position (Karamouzas and Overmars 2010; Schuerman et al. 2010). This approach works better if the slots are within navigable space as shown in Schuerman et al. videos. To avoid this problem, Silveira, Prestes and Nedel define a group potential map using slots as attractors and obstacles as repulsors thus providing to members a velocity that maintain the formation while keeping a smooth path when obstacle are present. It allows entity to break formation to pass through tight corridors and around small obstacles (Silveira et al. 2008).

### Group members steering ###

Whether the group is a flock or a formation, the individual steering behaviors, the collision avoidance in particular, of its members has to be considered. We've seen that in some case the individual steering behaviors are disabled (Pottinger 1999). In most work though, the group navigation is designed to work in conjunction with its members', the main problematic is to blend the individual behavior with the group orders.

In some architecture, each entity has several independent behaviors producing different steering orders that are blended together using weight and priorities. In this kind of approach the group orders are executed by another behavior and are part of the final blend (Moussaïd et al. 2010; Qiu 2010; Hostetler and Kearney 2002).

In most modern architecture, a pipeline of behaviors produce a steering order each element taking the previous into account while enforcing new constraints or orders, the last one being collision avoidance (Golaem n.d.; Mononen 2010). The group orders are implemented as a part of this pipeline, they are fed to the following elements among which the collision avoidance (Karamouzas and Overmars 2010b; Silveira et al. 2008).

Schuerman et al. state that while the same collision avoidance behavior can be used by the entities when they are part of a group, it must be adapted. As a matter of fact, collision avoidance algorithms such as RVO (Van den Berg et al. 2008) try to enforce a safe distance to obstacles and other entities that might forbid tight formations. A &ldquo;boldness&rdquo; factor is introduced controlling how likely an entity is to yield to other entities during steering. When a strict formation is desired the &ldquo;boldness&rdquo; factor of its members is set high making them only try to avoid imminent collisions (Schuerman et al. 2010).

## Bibliography ##
- Balch, Tucker, and Maria Hybinette. 2000. &ldquo;Social potentials for scalable multi-robot formations.&rdquo; Pp. 73-80 in IEEE International Conference on Robotics and Automation, vol. 1. San Francisco Retrieved (<http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=844042>).
- Bayazit, O Burchan, Jyh-Ming Lien, and Nancy M Amato. 2003. &ldquo;Better group behaviors in complex environments using global roadmaps.&rdquo; Pp. 362-370 in 8th International conference on Artificial Life.
- Dawson, Chad. 2002. &ldquo;Formations.&rdquo; Pp. 272-282 in AI Game Programming Wisdom, Steve Rabinedited by. Charles River Media Retrieved (<http://introgamedev.com/resource_aiwisdom.html>).
- Golaem. n.d. &ldquo;Golaem Path.&rdquo; Retrieved (<http://www.golaem.com/content/products/golaem-sdk/features>).
- Helbing, Dirk, Illés Farkas, and Tam&aacute;s Vicsek. 2000. &ldquo;Simulating dynamical features of escape panic.&rdquo; Nature (407):487-490.
- Hostetler, Terry R, and Joseph K Kearney. 2002. &ldquo;Strolling down the avenue with a few close friends.&rdquo; Pp. 7-14 in Third Eurographics Irish Workshop on Computer Graphics. Dublin.
- Kamphuis, Arno, and Mark H Overmars. 2004. &ldquo;Finding paths for coherent groups using clearance.&rdquo; Pp. 19-28 in 2004 ACM SIGGRAPH/Eurographics symposium on Computer Animation.
- Karamouzas, Ioannis, and Mark H Overmars. 2010b. &ldquo;Simulating the local behaviour of small pedestrian groups.&rdquo; Pp. 183-190 in 17th ACM Symposium on Virtual Reality Software and Technology. Hong Kong.
- Loscos, Céline, David Marchal, and Alexandre Meyer. 2003. &ldquo;Intuitive Crowd Behaviour in Dense Urban Environments using Local Laws.&rdquo; Proceedings of the Theory and Practice of Computer Graphics 122.
- Millington, Ian. 2006. &ldquo;Movement.&rdquo; Pp. 41-202 in Artificial intelligence for games, David H Eberlyedited by. Morgan Kaufmann.
- Mononen, Mikko. 2010. &ldquo;Navigation Loop.&rdquo; Paris Game/AI Conference 2010. Retrieved (<http://digestingduck.blogspot.com/2010/07/my-paris-game-ai-conference.html>).
- Moussaïd, Mehdi, Niriaska Perozo, Simon Garnier, Dirk Helbing, and Guy Theraulaz. 2010. &ldquo;The Walking Behaviour of Pedestrian Social Groups and Its Impact on Crowd Dynamics&rdquo; Giuseppe Chiricoedited by. PLoS ONE 5(4):e10047.
- Musse, Soraia Raupp, and Daniel Thalmann. 2001. &ldquo;Hierarchical Model for Real Time Simulation of Virtual Human Crowds.&rdquo; Transactions on Visualization and Computer Graphics 7(2):152-164.
- Pottinger, Dave. 1999. &ldquo;Implementing Coordinated Movement.&rdquo; Gamasutra. Retrieved April 20, 2011 (<http://www.gamasutra.com/view/feature/3314/implementing_coordinated_movement.php?print=1>).
- Qiu, Fasheng, Xiaolin Hu, Xue Wang, and Saurav Karmakar. 2010. &ldquo;Modeling social group structures in pedestrian crowds.&rdquo; Simulation Modelling Practice and Theory 18:190-205.
- Reynolds, Craig W. 1987. &ldquo;Flocks, herds and schools: A distributed behavioral model.&rdquo; Pp. 25-34 in 1987 International Conference and Exhibition on Computer Graphics and Interactive Techniques, vol. 21.
- Reynolds, Craig W. 1999. &ldquo;Steering behaviors for autonomous characters.&rdquo; Game Developers Conference 1999.
- Schuerman, Matthew, Shawn Singh, Mubbasir Kapadia, and Petros Faloutsos. 2010. &ldquo;Situation agents: agent-based externalized steering logic.&rdquo; in International Conference on Computer Animation and Social Agents, 2010.
- Silveira, Renato, Edson Prestes, and Luciana P Nedel. 2008. &ldquo;Managing coherent groups&rdquo; Gerard J Kim, Hong Qin, and Nadia Magnenat-Thalmannedited by. Computer Animation And Virtual Worlds 19(3-4):295-305.




