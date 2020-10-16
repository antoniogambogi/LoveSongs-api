const express = require('express')
const route = express.Router()
const Banda = require('./../controllers/banda.controller')

route.get('/listarTodas', Banda.buscarTodasAsBandas)
route.get('/listarUma/:nomeBanda', Banda.buscarUmaBandaPeloNome)
route.post('/criar', Banda.criarUmaBanda)
route.get('/validarNomeBanda', Banda.validarNomeBanda)
route.delete('/apagar/:bandId', Banda.deleteOne)

module.exports = route