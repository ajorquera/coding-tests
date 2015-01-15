// the cell 
function Cell (status){
	this.status = status || false ;

}
//its methods
Cell.prototype ={
	toggleStatus:function(){
		if (this.status==false){
			this.status=true;
		}else{
			this.status=false;
		}
		
	},
	logStatus:function(){
		console.log("cell status :"+this.status );
	}

};






$(document).ready(function() {

var cell= new Cell();

cell.logStatus();
cell.toggleStatus();
cell.logStatus();
	


});