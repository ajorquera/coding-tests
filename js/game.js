// the cell 
function Cell(x, y) {
    this.status = status || false;
    this.x_pos = x;
    this.y_pos = y;
    this.name = "cell_" + x + "_" + y + "";
    this.body = $('#' + this.name);
}
//its methods
Cell.prototype = {
    toggleStatus: function() {
        if (this.status == false) {
            this.status = true;
        } else {
            this.status = false;
        }

    },
    showStatus: function() {

        if (this.status == true) {
            this.body.html('o');
        } else {
            this.body.html('-');
        }

    },
    dna: function(aliveNeighbors) {

        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            this.status = false;
        }
        if (aliveNeighbors == 3) {
            this.status = true;
        }


    },
    beat: function(cellsNews) {
        this.status = cellsNews[this.x_pos][this.y_pos];

        this.showStatus();
        this.dna(this.aliveNeighbors(cellsNews));
        this.showStatus();
        ////console.log(this.status);
        return this.status;
    },
    aliveNeighbors: function(neighbors) {
        var count = 0;
        var x = 0;
        var y = 0;
        ////console.log(neighbors[0][0]);
        ////console.log(this.name);
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {

                x = i + this.x_pos;
                y = j + this.y_pos;
                ////console.log(x+" "+y);
                //fixing the coordinates so the cells live in a toroidal surface
                if (x < 0) {
                    x = neighbors[this.x_pos].length - 1;
                } else if (x > neighbors[this.x_pos].length - 1) {
                    x = 0;
                }
                if (y < 0) {
                    y = neighbors.length - 1;
                } else if (y > neighbors.length - 1) {
                    y = 0;
                }


                if (x == this.x_pos && y == this.y_pos) {
                    ////console.log("no cuenta :" + x + " " + y);
                } else {
                    ////console.log(x + " " + y);
                    ////console.log(neighbors[x][y]);
                    if (neighbors[x][y] == true) {
                        count++;
                    }
                }




            };
        };

        ////console.log(count);
        return count;


    }

};



var cellsNews = [
    [false, true, false, false, false, false, false, false, false, false],
    [false, false, true, false, false, false, false, false, false, false],
    [true, true, true, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false]

];

var universe = ''; //document.getElementsByTagName('body');

var pre_cells = [];
var cells = [];

var current = {};


$(document).ready(function() {


    //we just init the thing
    for (var i = 0; i < cellsNews.length; i++) {
        ////console.log(i);
        //universe=universe+'<tr>';
        $('#gamefield').append('<tr>');
        pre_cells = [];
        for (var j = 0; j < cellsNews.length; j++) {

            ////console.log(i+'_'+j);
            //universe=universe+'<td id="cell_'+i+'_'+j+'">0</td>';
            $('#gamefield').append('<td id="cell_' + i + '_' + j + '">0</td>');
            current = new Cell(i, j);
            current.status = cellsNews[i][j];
            current.showStatus();
            ////console.log(i);
            pre_cells.push(current);


        };
        cells.push(pre_cells);
        //universe=universe+'</tr>';
        $('#gamefield').append('</tr>');
    };




    var pressed_key = 112;



    $('body').keypress(function(event) {
        pressed_key = event.which;
        //console.log("pressed_key: " + event.which);
    });

    var pre_hotCellNews = [];
    var hotCellNews = [];

    var iterator = function() {
        hotCellNews = [];
        for (var i = 0; i < cellsNews.length; i++) {
            ////console.log(i);
            pre_hotCellNews = [];
            //console.log(cellsNews.length);
            for (var j = 0; j < cellsNews.length; j++) {
                //console.log(i + " " + j);
                current = cells[i][j];
                ////console.log(current.name + " " + current.status);
                ////console.log(current.aliveNeighbors(cellsNews));
                pre_hotCellNews.push(current.beat(cellsNews));
                //console.log(current.name + " " + current.status);

            }

            hotCellNews.push(pre_hotCellNews);
        }
        cellsNews = hotCellNews;
    }

    var iterations = 1;

    setInterval(function() {

        if (pressed_key == 112) {
            iterator();
            iterations++;
            console.log("generaciones =" + iterations);
        }
    }, 300)

    //iterator();




    //console.log(hotCellNews);

    //$('#gamefield').;

});