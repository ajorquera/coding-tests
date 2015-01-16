// the cell 
function Cell(x, y, status) {

    //this.status = arguments[0] || false;
this.status = status || false;
    this.heartBeatStatus = false;

    this.x_pos = x;
    this.y_pos = y;

    this.cellName = 'cell[' + this.x_pos + '][' + this.y_pos + ']';






    var beatwatcher=eObserve(this);

    beatwatcher.on('update',function(changes){
        console.log(changes.object.heartBeatStatus);
        
    });

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
    //this will triger intersting things
    heartBeat: function() {
        if (this.heartBeatStatus == false) {



            //this.showingstatus();



            this.heartBeatStatus = true;
        } else {
            this.heartBeatStatus = false;
        }


    },



    showingstatus:function(){
        var string_status='';
        if (this.status=true){
            string_status='alive !';
        }else{
            string_status='fucking dead ';
        }
        console.log("im the cell "+this.cellName+" and i'm "+string_status);
    },
    dna:function(livearraoud){

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







var simple_cell=new Cell(0,0,true);

simple_cell.toggleStatus();

console.log(simple_cell);


  
    setInterval(function() {
        simple_cell.heartBeat();
    }, 800);



});