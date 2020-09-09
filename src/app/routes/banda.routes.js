const express = require('express')
const route = express.Router()
const Banda = require('./../controllers/banda.controller')

route.get('/listarTodas', Banda.buscarTodasAsBandas)
route.get('/listarUma/:nomeBanda', Banda.buscarAsMusicasDeUmaBandaPeloNomeDela)

module.exports = route