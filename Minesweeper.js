/*****
	Minesweeper.js

	It's Minesweeper!
	MIIIIIIIIIIIIIIIIIIIINESWEEPER
	
	Uses JQuery because it's useful
	**/


/**
	First things first: the grid code
**/

var Grid=function(numRows,numColumns){
	//generate the html elements
	this.HTMLelt=$('<table></table>');
	var row=$('<tr></tr>');
	//time to create the grid
	for(var i=0;i<numRows;i++){
		//initialse the row
		var curRow=row.clone();
		for(var j=0;j<numRows;j++){
			curRow.append($('<td>'+i+','+j+'</td>'));
		}
		this.HTMLelt.append(curRow);
	}
}

