'use-strict'

var express = require('express');
var adminController = require('../controllers/AdminController');
var auth = require('../middlewares/authenticate');

var api = express.Router();

api.post('/registro_admin',adminController.registro_admin);
api.post('/login_admin',adminController.login_admin);
api.get('/obtener_mensajes_admin',auth.auth,adminController.obtener_mensajes_admin);
api.put('/cerrar_mensaje_admin/:id',auth.auth,adminController.cerrar_mensaje_admin)



// VENTAS 

api.get('/obtener_ventas_admin/:desde?/:hasta?',auth.auth,adminController.obtener_ventas_admin);

//KPI

api.get('/kpi_ganancias_mensuales/',auth.auth,adminController.kpi_ganancias_mensuales);

module.exports = api;