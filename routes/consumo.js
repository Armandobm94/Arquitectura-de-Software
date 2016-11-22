const express=require('express'),
	app=express(),
	mongoose=require('mongoose');


//exportar modelos y controladores
	var modelsUsuario=require('../model/usuario')(app, mongoose);
	
	var usuarioCTRL=require('../controladores/usuario');

	//variable user como router
	var usuario=express.Router();
	

//metodos del usuario
usuario.route('/usuarios/')
	.get(usuarioCTRL.obtenerUsuarios)
usuario.route('/login/')
	.post(usuarioCTRL.validLogin)

	
usuario.route('/usuario/:id/')
	.delete(usuarioCTRL.eliminarUsuario)
	.put(usuarioCTRL.actualizarUsuario)

usuario.route('/registro/')
	.post(usuarioCTRL.registrarUsuario)

module.exports=usuario;