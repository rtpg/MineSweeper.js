Minesweeper.js
==============


The object of this project is to create a *relatively* sane version of Minesweeper, in the most
"HTML"-y way possible.

General Structure
-----------------

There are three distinct parts of this program:

- The Game Logic

	This part holds all the game rules, like how many mines we need and how many are left,the state of the game,etc. This is also where individual mines are manipulated

- The Grid 

	This is where the actual grid is defined. Here we set up the shape of the grid, and the neighbor relationships, as well as a way to get some random elements. 

- The Interface

	This'll define how the user interacts with the game. From the click listening to the showing of scores


All of these parts are pretty interdependent however:

- The Game Logic needs:
	
	- From the Grid:
	
		A way of fetching elements, neighbors

- The Grid needs

	- From the Game Logic

		A way of dealing with clicks

- The Interface needs:

	- From the Grid:

		An HTML element representing the grid

	- From the Game Logic:

		A way to get the number of mines left and the current state of the game



For now we're going to try and get this working with a rectangular grid.


Something I'd like to note: in the end I integrated the game logic directly into the grid,
because in all practicality, it was simpler.



API
---


Utility functions:

- randomInt(n)

	returns a random integer in [0;n[


the Grid has:

- dim

	an object {rows,cols} holding the dimensions of the grid

- HTMLelt

	an HTML element representing the grid

- nodes

	A matrix storing all the nodes in the grid. Something to note: it's node[y][x]

- getNode(id)

	Returns the node(which might hold a mine) associated with a certain id.

- setMines(n)

	Places n mines on nodes that have not been clicked or mined yet

- neighborsOf(id)

	returns an array of the neighbors of a certain node

- click(id)

	runs the click event on the node with that id

- rightclick(id)

	Same as above, except for right click

- init(n)

	Sets up the grid completely. Places n mines and initialises the nodes properly.




the Node has:

- dElt

	The DOM element (wrapped in jQuery)

- id

	The id assigned to the node by the Grid

- checked

	A boolean identifying whether it's been checked or not

- flagged

	for flagging the item

- num

	the number of mines neighboring the node. set up by the grid

- setChecked(val)

	sets whether a node has been clicked on or not, and styles acoordingly

- setNum(val)

	sets the number of vals

- setMined(val)

	same thing for whether there's a mine on this node

- setFlagged(val)

	setter for flagged

the UI has:

- init(n)

	Initialises the entire system ( n is the number of mines )

- install(selector)

	places the UI inside the HTML element found in the selector