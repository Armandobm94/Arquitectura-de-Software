const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride=require('method-override');
const app = express();
mongoose.connect("mongodb://arqui:arqui@ds157487.mlab.com:57487/arquisw");
/*
var Queue = require('queuejs');
var queue = new Queue();*/
/*
var schema = mongoose.Schema;
//crear esquema
var userSchema = new schema({
name: String,
username:{type: String, required: true, unique: true},
password: {type: String, required: true},
admin: Boolean,
location: String,
meta:{
    age: Number,
    website: String
},
created_at: Date,
updated_at: Date
});
userSchema.methods.dudify = function(){
    
}
//crear el modelo usando el esquema
var User = mongoose.model('User', userSchema);
//hacerlo usable en la app node
module.exports = User;
*/

/*
app.get("/add", (req, res) => {
    queue.enq(10);
    queue.enq(5);
    console.log(queue.size()); // 2 
    console.log(queue.peek()); // 10
    console.log(queue.size());
    console.log(queue.deq()); // 10 
    console.log(queue.size());
    res.send("ok");
});
*/
const consumo=require('./routes/consumo');
const usuario=require('./routes/usuario');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use('/api', consumo);
app.use('/usuario',usuario);


app.get("/start", (req, res) => {
    res.send("ok");
});

app.listen(3000, () => {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
        console.log("Escuchando el el puerto : 3000");
    });
});

