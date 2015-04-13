/*
 *We start with the smallest part of the, a simple cell
 *avascript is classless but we can "prototype" to get
 *something
 *similar to a Cell class
 */
function Cell(x, y, parent) {
    this.parent = parent;
    this.true_color = "#cfcfcf",
    this.false_color = "#ffffff",


    this.animation=this.parent.animation;
    this.anim_true = Raphael.animation({
        "fill": "#ccc",
        opacity: 1
    }, this.parent.delay);

    this.anim_false = Raphael.animation({
        "fill": "#fff",
        opacity: 1
    }, this.parent.delay);


    //life status
    this.status = parent.cells_status[y][x] || false; //status || false;

    //it place in the universe
    this.x_pos = x;
    this.y_pos = y;




    //mig be usefull if we want more than one grid 
    //of cell independently 
    this.name_prefix = parent.cells_prefix;
    //string cell name
    this.name = this.name_prefix + "_" + x + "_" + y + "";

    //yay!! this cell just posses a body 
    //from the browser DOM

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

        if (this.status == true) {
            if (this.animation == true) {
                this.body.animate(this.anim_true); //.attr("fill", this.true_color);
            } else {
                this.body.attr("fill", this.true_color);
            }

        } else {
            if (this.animation == true) {
                this.body.animate(this.anim_false);
            } else {
                this.body.attr("fill", this.false_color);
            }
        }

    },
    //mig be the core of a cell
    //this just determines whereas a cell is alive or dead
    dna: function(aliveNeighbors) {
        //console.log(aliveNeighbors)
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            this.status = false;
        }
        if (aliveNeighbors == 3) {
            this.status = true;
        }


    },
    //this will triger importan things when its called
    beat: function() {

        //console.log(this.parent);
        //this.status = parent.cells_status[this.y_pos][this.x_pos];

        //this.showStatus();
        this.dna(this.aliveNeighbors());
        this.showStatus();
        ////console.log(this.status);
        return this.status;
    },
    //determine the number of alive menbers of the neighborhood
    aliveNeighbors: function() {
        var count = 0;
        var x = 0;
        var y = 0;
        ////console.log(this.parent.cells_status[0][0]);
        ////console.log(this.name);
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {

                x = i + this.x_pos;
                y = j + this.y_pos;

                //fixing the coordinates so the cells live in a toroidal surface world
                if (x < 0) {
                    x = this.parent.m - 1;
                } else if (x > this.parent.m - 1) {
                    x = 0;
                }
                if (y < 0) {
                    y = this.parent.n - 1;
                } else if (y > this.parent.n - 1) {
                    y = 0;
                }


                if (x == this.x_pos && y == this.y_pos) {
                    ////console.log("no cuenta :" + x + " " + y);
                } else {
                    ////console.log(x + " " + y);
                    ////console.log(this.parent.cells_status[x][y]);
                    if (this.parent.cells_status[y][x] == true) {
                        count++;
                    }
                }




            };
        };
        return count;
    }


};