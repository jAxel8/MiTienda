'use-strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    
    cliente: {type: Schema.ObjectId,ref:'cliente',required:true},
    destinatario: {type: String,required:true},
    dni: {type: String,required:true},
    zip: {type: String,required:true},
    telefono: {type: String,required:true},
    direccion: {type: String,required:true},
    pais: {type: String,required:false},
    estado: {type: String,required:false},
    ciudad: {type: String,required:false},
    distrito: {type: String,required:false},
    principal: {type: Boolean,required:false},
    createdAt: {type: Date, default: Date.now, require :true}
    
    



});

module.exports = mongoose.model('direccion',DireccionSchema);
