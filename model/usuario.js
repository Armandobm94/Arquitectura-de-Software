const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

var schemaUsuario = new Schema({
    //id: ObjectId,
    usuario: {type: String , require: true},
    pwd: {type: String, require: true},
    tipo: {type: Number, require: true}
});

module.exports = mongoose.model("usuarios",schemaUsuario);