/*****
	Minesweeper.js

	It's Minesweeper!
	MIIIIIIIIIIIIIIIIIIIINESWEEPER
	
	Uses JQuery because it's useful
	**/

/**
	Just some Utility functions
  **/

//randomInt:returns a random integer in [0;n[
 
var randomInt=function(n){
    return Math.floor(Math.random()*n);
}

/**
	First things first: the grid code
**/

var Grid=function(numRows,numColumns){
	//store the dimensions of the grid
	this.dim={rows:numRows,cols:numColumns};
	//generate the html elements
	this.HTMLelt=$('<table></table>')
		.addClass('grid');
	//at the same time, generate the internal table to store the mines
	this.nodes=[];
	var row=$('<tr></tr>');
	//time to create the grid
	for(var i=0;i<numRows;i++){
		//initialse the row
		var curRow=row.clone();
		var curNodes=[];
		for(var j=0;j<numRows;j++){
			var curCell=$('<td></td>')
							.addClass('node');
			var cellText=$('<span>?</span>')
							.addClass('hidden');
			curCell.append(cellText);
			curCell.data('id',j+i*numRows);
			curNodes.push(new Node(curCell,j+i*numRows));
			curRow.append(curCell);
		}
		this.HTMLelt.append(curRow);
		this.nodes.push(curNodes);
	}
	//init. of nodes and HTMLelt: done
}

//returns the node with a certain id (which should be unique)
Grid.prototype.getNode=function(id){
   /**                  
     	x-->
	  y [0] [1] [2] [3] [4] |
	  | [5] [6] [7] [8] [9] |
	    [ ] [ ] [ ] [ ] [ ] numRows
	    [ ] [ ] [ ] [ ] [ ] |
	    [ ] [ ] [ ] [ ] [ ] |
		-----numColumns----
		
	  x=id%numColumns
	  y=(id-x)/numColumns //this is guaranteed to be an integer.... I think
	**/
	var x=id%this.dim.cols;
	var y=(id-x)/this.dim.rows;
	return this.nodes[y][x];					
}

/**
	Places n mines on nodes that have not been clicked or mined yet
 **/
Grid.prototype.setMines=function(n){
	if(n<=0){
		return;
	}else{
		while(n>0){
			//check out that stylin' drawing in getNode to see the y/rows correspondence
			var y=randomInt(this.dim.rows);
			var x=randomInt(this.dim.cols);
			if(this.nodes[y][x].checked==false && this.nodes[y][x].mine==false){
				this.nodes[y][x].setMined(true);
				n--;
			}
		}
	}
}

Grid.prototype.neighborsOf=function(id){
	/***
		x-->
	  y [0] [1] [2] [3] [4] |
	  | [5] [6] [7] [8] [9] |
	    [ ] [ ] [ ] [ ] [ ] numRows
	    [ ] [ ] [ ] [ ] [ ] |
	    [ ] [ ] [ ] [ ] [ ] |
		-----numColumns----

		**/

	var rV=[];
	var x=id%this.dim.cols;
	var y=(id-x)/this.dim.rows;
	if(x>0){
		rV.push(this.nodes[y][x-1]);
		if(y>0){
			rV.push(this.nodes[y-1][x-1]);
		}
		if(y<(this.dim.rows-1)){
			rV.push(this.nodes[y+1][x-1]);
		}
	}
	if(x<(this.dim.cols-1)){
		rV.push(this.nodes[y][x+1]);
		if(y>0){
			rV.push(this.nodes[y-1][x+1]);
		}
		if(y<(this.dim.rows-1)){
			rV.push(this.nodes[y+1][x+1]);
		}
	}
	if(y>0){
		rV.push(this.nodes[y-1][x]);
	}
	if(y<(this.dim.rows-1)){
		rV.push(this.nodes[y+1][x]);
	}
	return rV;
}


Grid.prototype.click=function(id){
	var mine=this.getNode(id);
	if(mine.flagged){//if there's a flag, left click disabled
		return;
	}
	if(mine.mine){
		//GAME OVER MAN!
		console.log("game over");
		return "game over";
	}
	mine.setChecked(true);
	mine.dElt.children().removeClass('hidden');
	if(mine.num==0){// if there are no mines around, we click again
		//it's that effect from minesweeper of revealing many tiles at once
		var neighbors=this.neighborsOf(mine.id);
		for(var i=0;i<neighbors.length;i++){
			if(!neighbors[i].checked){
				this.click(neighbors[i].id);
			}
		}
	}
	return "good";
}

/**
  function to deal with rightclicks**/
Grid.prototype.rightclick=function(id){
	var node=this.getNode(id);
	if(node.checked){//if it's clicked we don't need to flag it
		return;
	}
	node.setFlagged(!node.flagged);//we're toggling the flag!
}
Grid.prototype.init=function(n){
	this.setMines(n);
	//setting up the values of the nodes
	for(var id=0;id<this.dim.cols*this.dim.rows;id++){
		var node=this.getNode(id);
		if(!node.mine){
			var neighbors=this.neighborsOf(id);
			var count=0;
			for(var j=0;j<neighbors.length;j++){
				if(neighbors[j].mine){
					count++;
				}
			}
			node.setNum(count);
		}
	}
}
/**
	Now might be a good time to define the Node object
 **/

var Node=function(dElt,id,mine){
	this.dElt=dElt;
	this.id=id;
	this.checked=false;
	this.flagged=false;
	this.mine=(mine===undefined?false:mine);
	this.num=0;//to be set later
}

Node.prototype.setChecked=function(val){
	//basic setter code, which is meant to also affect the mines accordingly
	//this is pretty self-explanatory 
	if(val===this.checked){
		return;
	}
	this.checked=val;
	if(val===true){
		this.dElt.addClass('checked');	
	}else{
		this.dElt.removeClass('checked');
	}
}

Node.prototype.setNum=function(val){
	//see above
	if(val==0){
		this.dElt.children().html(' ');
	}else{
		this.dElt.children().html(val);
	}
	this.num=val;
}

Node.prototype.setMined=function(val){
	//see above
	if(val===this.mine){
		return;
	}
	this.mine=val;
	if(val===true){
		this.dElt.addClass('mined');	
	}else{
		this.dElt.removeClass('mined');
	}
}

Node.prototype.setFlagged=function(val){
	if(val===this.flagged){
		return;
	}
	this.flagged=val;
	if(val===true){
		this.dElt.children().removeClass('hidden').html('F');
	}
	else{
		this.dElt.children().addClass('hidden');
		this.setNum(this.num);
	}
}

var UI=function(numRows,numColumns){
	this.grid=new Grid(numRows,numColumns);
	var that=this;
	this.grid.HTMLelt.on('click','.node',
		function(evt){
			//when a node is clicked...
			//first I need to look up its id
			var $this=$(this);
			var id=$this.data('id');
			//now I can run the game logic
			var rV=that.grid.click(id);
			console.log('ran with id '+id);
		});
	this.grid.HTMLelt.on('contextmenu','.node',
		function(evt){
			console.log('right click');
			var id=$(this).data('id');
			that.grid.rightclick(id);
			evt.preventDefault();
		});
}

UI.prototype.init=function(n){
	this.grid.init(n);
}

UI.prototype.install=function(selector){
	$(selector).append(this.grid.HTMLelt);
}