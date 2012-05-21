---
layout: post
title: "Boudica's last stand"
img: "/images/posts/2012/boudica.jpg"
tags:
 - crowd_simulation
---

A few weeks ago, I received a mail from a reader of this blog: an ancient history enthusiast. 

> I use novel techniques to try and identify the UK battlefield where the Romans defeated Boudica in 60/61AD. 

[Boudica](http://en.wikipedia.org/wiki/Boudica) isn't just a [Civilization IV leader](http://civilization.wikia.com/wiki/Boudica), she is a British ancient heroin who led an uprising against the Romans conqueror and was severely defeated at a not yet identified location (interseting how this story is closed from French's [Vercingetorix](http://en.wikipedia.org/wiki/Vercingetorix)). 

At this point 3/4 of you are wondering how that is related to the topic of this blog. I do hope 1 or 2 are interested in history, for those and the rest, the mail continued.

> I have been thinking about crowd control/behaviour modeling as another method to help answer some questions – hence my arriving at your page.

The major objectives he described would be:
1. Being able to validate/invalidate the locations;
2. Have an idea of the casualties and especially evaluate the veracity of the Roman writer, Tacitus, reports of 80 000 dead British rebels;
3. How were the bodies geographically distributed, and thus where could archeological evidences (armors, weapons or gears remains) be found.

![Boudica in Civilization IV](/images/posts/2012/boudica.jpg)

Needless to say this is quite ambitious for any individual with existing crowd simulation softwares. This project made me thought of how we could tackle this.

To get a simulation, we'd need a - wait for it (what a cool middle name!) - simulator. First we need to specify the characteristics of the simulation:
- is it *microscopic* (each warrior simulated by an autonomous entity), *aggregate* (several warriors belonging to a group simulated by an autonomous entity) or *macroscopic* (simulating macroscopically the various crowd phenomenom - not very adapted for this kind of behavior modelling);
- what *level* of behavioral simulation do we need, we'd surely need planning to handle battle strategies as well as reaction to the opponent moves, but do we need reactive navigation (i.e. maintaining groups, avoiding collisions) or motion coordination;
- do we need to involve a *physics* simulation for realistics hits in fights, projectiles, falls, ... ;
- what kind of output are needed, 3D/2D rendering, localized metrics (density, number of deads...).
A number of commercial crowd simulation software might be able to do help with this: [Golaem Crowd](http://www.golaem.com/content/products/golaem-crowd/overview) or [Massive](http://www.massivesoftware.com/) would do fine to model the behaviors and get a pretty rendering but would fall short for data analysis, [Legion](http://www.legion.com/) is designed to study crowd motion but I wonder if modelling a battle would be possible, [Masa Sword](http://www.masagroup.net/products/masa-sword.html) is designed for combat simulation but the lack of low level behavior and animation wouldn't allow all use cases, game engines such as [Unity](http://unity3d.com/) provide sufficient AI basics to be able to build such simulator but would need lots of effort. In any case, we'd need to involve specialized **software engineers** to customize or even build our simulator. 

![A rendition of Alesia's battle with Golaem Crowd](/images/posts/2011/alesia.jpeg)

For the resulting simulation to be somehow *valid*, we'd need to gather information from the domain experts, in this case, **historians**. In order to model the behaviors at the individual and collective level, military strategies and tactics as well as the warriors behaviors need to be investigated for each belligerent:
- What kind of combat arms (infantry, cavalry, ...) could have been present?
- What weapons were used, how? 
- What strategies and tactics were used? 
- How did warriors took advantage of the terrain? 
- What was the level of discipline? 
- *etc*.
 
This gathering must be conducted by **specialists of behavior modeling**, they'll be able to get the relevent data and create the behavior modelizations for our simulator. If we want to involve realistic character visualizations we'll also need to involve computer graphics **artits**.

One major point of doing this simulation is to validate potential geographical locations of the battle. Thus we'd need to recreate faithfully the possible setting with the help of **GIS specialists** and perhaps **geologists** to get an idea of how the landscape looked like at that time.

Once all of this is done, we would have a configurable simulator, ready to test theories, the fun part would start, finally! To go back to the start of this long article, that's exactly the part my reader is interested in. It should be possible to a scenario and statistical variants, extract metrics, not to scientifically validate it, the process defined above introduces too much bias to deduce anything, but to get a feeling of its validity. Do not understand me wrong here though, I do think this king of simulator could help us understand how any historical event took place, it can be another, rather powerful, tool for historians. The interesting part for us, software engineers, is to reduce the work to do to create the simulator and to facilitate the authoring of the behaviors. Maybe one day, retired history enthusiasts will be able to use our tools, as easily as they edit their holiday movies.
