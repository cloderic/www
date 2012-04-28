---
layout: post
title: Paris Game AI Conference '09 (part 2)
permalink: /wordpress-1
tags:
    - game AI
    - conference
---
In this second part I'll talk about the presentations of day two.

## Day Two ##

#### Panel talk: Advices and tales from the trenches. ###
As I'm not that familiar with game industry this panel about how the work is in game studios was very intersersting to me. What they emphasized most was that it is important to have done, and finish, something yourself (a small game for example) before starting to work in a studio. I know they were trying to say "Young programmers you must know and prove that you know how to finish a project and make things work." but to me it sounded like "I prefer a tinkerer who can do everything quick and dirty to a software engineer who knows it stuff but haven't code pacmans since kindergarten". As I am much more the second type of guy, to me, the first type can make things work but doesn't see the big picture, he is unsuitable for a big project ; a teacher of mine use to say "Knowing how to make a toolshed in your garden doesn't help you conceive a 60 story building".

### Multi-Unit Planning with HTN and A* - William van der Serren, Independent AI Consultant at CGF-AI ###
This talk was about an assault planner accessible from a website. The planner finds the best course of action for several units in order to start the battle in good strategical postitions. The whole thing is an A* goal oriented planning inside a graph which vertex are the possibles tasks. Task are described as HTN and weighted by its cost in itself and the distance the unit has to cover to perform it. Simple but good results. My main takeaway for this good talk is that HTN seems to amaze everyone in the audience, seems pretty basic to me but I'm not an expert.

### Interactive Narrative Generation and Story Telling - Daniel Kudenko, York University ###
I'm casually interested in virtual interactive storytelling, so I was paying particular attention. The first part of the talk aimed at presenting the academic state of the art on the subject, not quite complete as it ignored the work of Marc Cavazza who is THE reference. The second part, features the presentation of the engine "Gadin" developed by Daniel Kudenko's team, interesting but knowing what is made elsewhere, not really impressive.

### The Racing AI in Pure - Eduardo Jimenez, Black Rock Studio ###
Whereas almost every other talk was about action game where the aim of the AI was to kill the opponent, this one is about racing. As presented in this talk, the main problematic of such AI is to adapt its skills to the player's : he mustn't feel alone behind or ahead of everyone. The presented solution is quite elegant:
 - Different "skills" are defined;
 - Each AI has values between 0 and 1 associated to each "skill" (at 0 the AI doesn't perform well, at 1 he is good);
 - These "skill" values can evolve during the game (but the changes can't be instantaneous);
 - A scripting language is created to define game scenarios, a scenario describes the evolution of the AI's rank according to their skills during a game;
 - During the game the engine trie to match the current state to one of the scenarios and adapt AI "skills" value in order to match it.
Another good talk talking about things that works in the real world on a released game.

### Building Navigation Meshes by Voxelization - Mikko Mononen, Recoil Games ###
This talk was the one I expected the most, but I have so much to say about Mikko's work on Recast and Detour that it will be the subject of another post. 

That's it for the report of the first conference I ever attend to ! The official report is [here](http://aigamedev.com/open/coverage/paris09-report/), much more interesting than mine (I'm very proud to be cited the end of the article). Thanks Alex and the volunteers for the conference ! Thanks too to the drunk czech student who talk all the evening about linguistic, I had a good laugh !