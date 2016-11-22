var mongoose=require('mongoose');
var User=mongoose.model('usuarios');
const database = process.env.MONGO_URL || 'mongodb://arqui:arqui@ds157487.mlab.com:57487/arquisw';
	
exports.obtenerUsuarios=function(req,res){
		

	
	//var db = mongoose.connection;
	User.find(function(err,usuario){
		if(err) res.send(500,err.message);
		console.log(usuario);
		console.log('GET/usuarios')
				res.status(200).jsonp(usuario);
				
			});
};


var rptalogin = function (user, mensaje, codigo) {
	return {
		status: {
			msg: mensaje,
			cod: codigo
		},
		user: {
			username: user,
			password:null
		}
	}

};

var rptaregistro = function (mensaje, codigo) {
	return {
		status: {
			msg: mensaje,
			cod: codigo
		}
	}

};


//método para validar el login
exports.validLogin=function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	var passEncriptada = encriptar(username,password)

	//var passdesEncriptada=desencriptar(username,passdesEncriptada)
	User.findOne({username:username},(err,user)=>{
		var rpta={}
		//console.log(passdesEncriptada)

		if(user){
			if(user.password==passEncriptada){
				if(err) return res.status(500).send(err.message);

				rpta=rptalogin(req.body.username,"Login exitoso",1)
				res.status(200).jsonp(rpta);	
			}else{
				if(err) return res.status(500).send(err.message);
				rpta=rptalogin(req.body.username,"Contraseña incorrecta",0)
				res.status(200).jsonp(rpta);	
			}
			
		}else{
			
			rpta=rptalogin(req.body.username,"No existe el usuario ",0)
			res.status(200).jsonp(rpta);
	
			

		}
		

	});
			

};


//funcion para encriptar
function encriptar(user, pass) {
   var crypto = require('crypto')
   // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
   var hmac = crypto.createHmac('sha512', user).update(pass).digest('hex')
   return hmac
}
/*function desencriptar(user,password){
 var crypto = require('crypto')
  var decipher = crypto.createDecipher('sha512',user).update(password).digest('utf8')
  return decipher;
}*/

exports.registrarUsuario=function(req,res){
		console.log("registro exitoso!");
		var rpta={};
		//var usuario=new User(req.body);
		var username=req.body.username;
		var password=req.body.password;
		var tipo=req.body.tipo;
		var passEncriptada=encriptar(username,password);
		User.findOne({username:username},function(err,usuario){
			if(!usuario){
				var user=new User({
					username:username,
					password:passEncriptada,
					tipo:tipo
				})
					 user.save((err) => {
		 				if(err) return res.status(500).send(err.message);
            		rpta = rptaregistro("Registro realizado!", 1);
					res.status(200).jsonp(rpta);
        });

			}else{
				if(err) return res.status(500).send(err.message);
				rpta = rptaregistro("Usuario existe!", 0);

				res.status(200).jsonp(rpta);

			}
			
		})
			
	
	
}

exports.eliminarUsuario=function(req,res){
	User.findById(req.params.id, function(err, consumo) {
        consumo.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};
exports.actualizarUsuario=function(req,res){


	 	User.findByIdAndUpdate({_id:req.params.id},{ $push
	 		: {
	 		username:req.body.username,	
		  password:req.body.password,
		  tipo:req.body.tipo}},
		 	{safe: true, upsert: true, new : true},
       	 function(err, usuario) {
            console.log(err);
            	res.status(200).jsonp(usuario);	
        	});

	 };