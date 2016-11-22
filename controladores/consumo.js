var mongoose=require('mongoose');
var Consumo=mongoose.model('consumos');
var Queue = require('queuejs');
var queue = new Queue();


var rptaregistroConsumoPorUsuario = function (mensaje,codigo) {
    
    return {
        status: {
            msg: mensaje,
            cod:codigo
        }
    }

};
var Cola = function (nrosuministro,fechamedicion,consumo) {
    
    return {
                nrosuministro:nrosuministro,
                fechamedicion: fechamedicion,
                consumo:consumo
            
    }

};




//traer todos los consumos de la bd 
exports.obtenerTodosLosConsumosdeUsuarios=function(req,res){
	Consumo.find(function(err,consumos){
		if(err) res.send(500,err.message);
		
		console.log('GET/consumos')
				res.status(200).jsonp(consumos);
			});
};
//obtener un solo consumo
exports.obtenerLosConsumosUsuario = function(req, res) { 
   
    Consumo.findById(req.params.id,function(err, consumo) {
    var rpta2={};
    
    if(err) res.send(500, err.message);
         console.log(req.body); 
    console.log('POST /consumo/'+ req.params.id)
        res.status(200).jsonp(consumo);

    });
};


//registrar un consumo
exports.agregarUnConsumoAlusuarioyvalidar=function(req,res){
	console.log('POST');

	
        Consumo.findOne({ nrosuministro: req.body.nrosuministro }, (err, dato) => {
             if(err) res.send(500, err.message);
            var rpta = {}
            var cola={}
            if (dato) {
                      rpta = rptaregistroConsumoPorUsuario( "Existe el número de suministro,todo bien! ", 1)
                      res.status(200).jsonp(rpta);
                        cola=Cola(req.body.nrosuministro,req.body.fechamedicion,req.body.consumo);
                                //encolar la cola     
                                queue.enq(cola);
                                 console.log('Tamaño de la cola :'+queue.size());
                                 console.log(queue);

                    /*Consumo.findOneAndUpdate({nrosuministro:req.body.nrosuministro},{ $push: {'consumos': {
                        fechamedicion:req.body.fechamedicion,consumo:req.body.consumo,}}},
                        {safe: true, upsert: true, new : true},
                        function(err, consumo) {
                            console.log(err);
                              
                     });*/
                       

                
                   
                
            } else {
                
                        rpta = rptaregistroConsumoPorUsuario( "No existe el número de suministro a procesar!", 0)
                    res.status(200).jsonp(rpta);
            
                }
                
           
            });
        
		
	};	
    exports.procesarCola=function(req,res){
         console.log(queue)   ;
         res.send("ok");
    }
     

    //metodo para agregar datos a la cola 

   /* exports.agregarUnconsumoalacola=function(req,res){
        console.log("gg");
        res.send("ok"); 
    }*/

//actualizar un consumo
	 exports.actualizarUnConsumoDelUsuario=function(req,res){


	 	Consumo.findByIdAndUpdate({_id:req.params.id,'nrosuministro':req.params.nrosuministro},{ $push
	 		: {'consumos': {
	 		nrosuministro:req.body.nrosuministro,	
		  consumo:req.body.consumo,
		 	fechamedicion:req.body.fechamedicion}}},
		 	{safe: true, upsert: true, new : true},
       	 function(err, consumo) {
            console.log(err);
            	res.status(200).jsonp(consumo);	
        	});

	 };
//borrar un consumo
	

exports.deleteUsuario = function(req, res) {  
    Consumo.findById(req.params.id, function(err, consumo) {
        consumo.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};