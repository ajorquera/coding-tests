var Matrix = {

    //cell surface size in px^2
    cellsBodySize: 20,

    cellsBodies:[],
    cells: [],

    //diemnsion of matrix elements (cells) 
    m: 0,
    n: 0,
    //the current status of all the cells 
    cells_status: [],

    //the estatus of the nex cells generations
    next_gen_status: [],

    //isolated group off cells
    cells_prefix: 'cell',


    randomSeed: function() {
        var rnd_sed = false;
        this.cells_status = [];
        var row = [];

        //we check for the dimension 
        if (this.m > 1 && this.n > 1) {

            for (var j = this.n - 1; j >= 0; j--) {
                row = [];
                for (var i = this.m - 1; i >= 0; i--) {
                    row.push(Boolean(_.random(0, 1)));
                };
                this.cells_status.push(row);
            };



        } else {
            console.log('you have not set the matrix dimension, or one of them is set to 1 ')
        }
        //Boolean(_.random(0, 1));

        console.log('seeded!');
    },


    build: function() {

        //modify from http://www.acnenomor.com/5001030p1/how-can-i-group-and-animate-individual-rows-on-this-raphael-canvas
        
        var paperWidth = this.cellsBodySize * this.m;
        var paperHeight = this.cellsBodySize * this.n;
        var current_cell = {}
      

        var paper = Raphael($("#game_container")[0], paperWidth, paperHeight);

       for (var j = 0; j < this.n; j++) {
            // Begin loop for rows
            this.cellsBodies[j] = [];
            this.cells[j]=[];
            for (var i = 0; i < this.m; i++) {

                


                // Scaling up to draw a rectangle at (x,y)
                var x = i * this.cellsBodySize;
                var y = j * this.cellsBodySize;

                // For every column and row, a square is drawn at an (x,y) location 
                this.cellsBodies[j][i] = paper.rect(x, y, this.cellsBodySize, this.cellsBodySize);
                this.cellsBodies[j][i].attr("stroke", "#cccccc").node.setAttribute("id", this.cells_prefix + "_" + i + "_" + j)
                
                //current.status = this.cells_status[j][i];
                current = new Cell(i, j, this);
                current.showStatus();
                ////console.log(i);
                this.cells[j][i] = current;
                console.log(j+","+i+" "+current.status+" - "+this.cells_status[j][i] );





                //console.log(this.cellsBodies[i][j].id());
            }


        }







    }



}


console.log(Matrix.cells_status);
Matrix.m = 4;
Matrix.n = 2;
Matrix.randomSeed();
console.log(Matrix.cells_status);

Matrix.build();


$("#game_container").find("svg").css({
    "border-style": "solid",
    "border-width": "5px",
    "border-color": "#ccc",
});
