/*
*We start with the smallest part of the, a simple cell 
*avascript is classless but we can "prototype" to get 
*something 
*similar to a Cell class
*/
function Cell(x, y,parent) {

    //life status
    this.status = parent.cells_status[y][x]||false;       //status || false;
    
    //it place in the universe
    this.x_pos = x;
    this.y_pos = y;


    
    
    //mig be usefull if we want more than one grid 
    //of cell independently 
    this.name_prefix=parent.cells_prefix;
    //string cell name
    this.name = this.name_prefix+"_" + x + "_" + y + "";

    //yay!! this cell just posses a body 
    //from the browser DOM
    console.log(parent.cellsBodies);
    this.body = parent.cellsBodies[y][x];
}
//then we add some methods
Cell.prototype = {
    //would the mehtod name be more explicit ?
    toggleStatus: function() {
        if (this.status == false) {
            this.status = true;
        } else {
            this.status = false;
        }

    },
    //i like to separate the logic from th view, this 
    //just show the grafic representation of a cell status

    showStatus: function() {
console.log(this.body);
        if (this.status == true) {

            this.body.attr("fill", "#dfdfdf");
        } else {
            this.body.attr("fill", "#fff");;
        }

    },
    //mig be the core of a cell
    //this just determines whereas a cell is alive or dead
    dna: function(aliveNeighbors) {

        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            this.status = false;
        }
        if (aliveNeighbors == 3) {
            this.status = true;
        }


    },
    //this will triger importan things when its called
    beat: function() {
        

        this.status = parent.cells_status[this.x_pos][this.y_pos];

        this.showStatus();
        this.dna(this.aliveNeighbors(parent.cells_status));
        this.showStatus();
        ////console.log(this.status);
        return this.status;
    }
    

};
