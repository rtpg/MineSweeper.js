Minesweeper.js
==============


The object of this project is to create a *relatively* sane version of Minesweeper, in the most
"HTML"-y way possible.

General Structure
-----------------

There are three distinct parts of this program:

- The Game Logic
>	This part holds all the game rules, like how many mines we need and how many are left,
>	the state of the game,etc. This is also where individual mines are manipulated

- The Grid 
>	This is where the actual grid is defined. Here we set up the shape of the grid, and 
>	the neighbor relationships, as well as a way to get some random elements. 

- The Interface
>	This'll define how the user interacts with the game. From the click listening to the
>	showing of scores


All of these parts are pretty interdependent however:

- The Game Logic needs:
	-From the Grid:
	A way of fetching elements, neighbors

-The Grid needs:
	-From the Game Logic
	A way of dealing with clicks

-The Interface needs:
	-From the Grid:
	An HTML element representing the grid
	-From the Game Logic:
	A way to get the number of mines left and the current state of the game



For now we're going to try and get this working with a rectangular grid