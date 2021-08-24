'use-strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigSchema = Schema({
    categorias: [{type:Object,required:true}],
    titulo: {type:String,required:true},
    logo:{type:String,required:true},
    serie:{type:Number,required:true},
    correlativo:{type:Number,required:true},

    
    



});

module.exports = mongoose.model('config',ConfigSchema);
