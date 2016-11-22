const express=require('express'),
	app=express(),
	mongoose=require('mongoose');


var models=require('../model/consumo')(app, mongoose);
var consumoCTRL = require('../controladores/consumo');


//router
var consumo=express.Router();



//metodos CRUD CONSUMO Y CONSUMO POR USUARIO
consumo.route('/consumosusuarios')
	  	.get(consumoCTRL.obtenerTodosLosConsumosdeUsuarios)
	  	
consumo.route('/consumos/:id')
	  .get(consumoCTRL.obtenerLosConsumosUsuario)
	  .delete(consumoCTRL.deleteUsuario)
consumo.route('/consumos/')	  
	  .post(consumoCTRL.agregarUnConsumoAlusuarioyvalidar)

	  consumo.route('/cola/')
	  			.get(consumoCTRL.procesarCola)

consumo.route('/consumos/:id/:nrosuministro')
	 	.put(consumoCTRL.actualizarUnConsumoDelUsuario)
//.delete(consumoCTRL.deleteConsumoPorUsuario)
module.exports=consumo;