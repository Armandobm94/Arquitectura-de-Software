const mongoose=require('mongoose'),
	Schema=mongoose.Schema;
//const ObjectId = Schema.ObjectId;
var consumoSchema=new Schema({
    //id: ObjectId,
	usuario:String,
	nrosuministro:String,
	consumos:[{
	}]
});

module.exports=mongoose.model('consumos',consumoSchema);