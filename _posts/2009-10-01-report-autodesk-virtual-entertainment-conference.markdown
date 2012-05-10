---
layout: post
title: "Report: Autodesk virtual entertainment conference"
permalink: /wordpress-7
img: "/images/posts/2009/pop_1.png"
tags:
 - animation
 - Autodesk
 - conference
 - game AI
 - IK
---

Tonight, Autodesk gave a "virtual conference" featuring talks about their products, live-broadcasted, for free on their site. I virtually attended to the portion I was interested in : Ubisoft talking about AI and animation in Prince of Persia.

After an epic struggle with RealPlayer (who still uses this piece of *** by the way ?) I managed to get the live feed a few minutes after the start.

## The prince was not alone, Elika was here ##

The focus of the talk was the character "Elika" from the [Ubisoft's 2008 version of Prince of Persia][1]. This character is non playable but follows the player's character, the prince, throughout the game. She is designed to help the player but never get into his way.

## But their relationship was completely artificial ##

![Prince of Persia - 1](/images/posts/2009/pop_1.png)

After a few character design considerations, the first topic was the AI used to tell Elika how to move around the prince. Its main objectives on this are :

 - Elika must not harm the 3 Cs (character, control, camera) that is provoking collisions with the prince, occluding the camera...
 - The AI has to make sure Elika appears on the screen as much as possible as naturally as possible (no teleporting, avoid getting stuck...) ;
 - As the social relation between the two characters evolve during the game (from strangers to friends), the behavior of Elika must reflect this.
 
Basically, what is used is a set of rules taking the state of the prince as input and outputting goals for the placement (for example distances, materialized by the circles in the first screenshot). Very few details are given on this.

To give the player a feel on what's the relation between the character, a set of rules are added ; the more friendly they are, the more Elika will look at the prince and be near him.

![Prince of Persia - 2](/images/posts/2009/pop_2.png)

## All they needed was good animations ##

OK, so here comes Autodesk and their realtime inverse kinematic solver, HumanIK, which is already integrated with Ubi's home brewed engine used for Assassin's Creed. They use this middleware for two things :

 - Ground the characters, that is apply kinematic constraints for each foot to be layed on the ground without colliding with it. It seemed this IK wasn't applied during movements as the feet where colliding with the ground when the prince was running on a slope.
 - Retarget the hands during acrobatics, for example putting the hands in the holds while climbing.
 
The IK solver is used on the prince and Elika, it is pretty efficient as it doesn't has any impact on the framerate. The speaker concluded on Human IK praising its easy configuration despite the huge amount of tweakable parameters.

![Prince of Persia - 3](/images/posts/2009/pop_3.png)

Before concluding the talk, one last problematic was addressed: how are handled the situation were one characters prevent the moving of the other. But as the rest of the talk, this topic was treated too quickly. I did not had the time to wonder in which cases the AI couldn't prevent this that the talk was finished.

To conclude on this virtual conference, it was interesting (both the concept and the subject) but it was too much rushed and dense...

 [1]: http://en.wikipedia.org/wiki/Prince_of_Persia_(2008_video_game)