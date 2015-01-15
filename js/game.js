// the cell 
function Cell() {
    for (var i = 0; i < arguments.length; i++) {
        alert(arguments[i]);
    }

    this.status = arguments[0] || false;
    this.NeighborsCellsStatus = [];


    var arg_rest = _.rest(arguments);
    for (var i = 0; i < 8; i++) {

        this.NeighborsCellsStatus[i] = arg_rest[i] || false;



    }
    console.log(this.NeighborsCellsStatus);
    /*
  _.each(_.rest(arguments),function(item,index){
  	this.NeighborsCellsStatus[index]=item||false;
  });*/




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
    liveNeighborsNumber: function() {
        var count = 0;
        _.each(this.NeighborsCellsStatus, function(item, index) {
            if (item == true) {
                count++;
            }
            //console.log(count);
        });
        return count;
    }


};






$(document).ready(function() {

    var cell = new Cell(false, true, false, true);


    cell.toggleStatus();

    console.log(cell.liveNeighborsNumber());



});