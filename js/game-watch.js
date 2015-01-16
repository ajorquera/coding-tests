// the cell 
function Cell(x, y, status) {

    //this.status = arguments[0] || false;
this.status = status || false;
    this.heartBeatStatus = false;

    this.x_pos = x;
    this.y_pos = y;

    this.cellName = 'cell[' + this.x_pos + '][' + this.y_pos + ']';


    watch(this,"heartBeatStatus",function(){
    	console.log('just beating');
    });
}

Cell.prototype={
	'beat':function(){
		if (this.heartBeatStatus==false ){
			this.heartBeatStatus=true;
		}else{
			this.heartBeatStatus=false;
		}

	}



};


$(document).ready(function(){

	var simple_cell=new Cell();

	$('body').keypress(function(event) {
		console.log(event.which);
	});




});




//simple_cell.beat();


