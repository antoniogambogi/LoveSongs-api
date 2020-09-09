const express = require('express')
const route = express.Router()
const Banda = require('./../controllers/bandas.controller')

route.post('/criar', Banda.criarBanda)
route.get('/visualizarTodas', Banda.visualizarBandas)
route.get('/visualizarUma/:banda', Banda.visualizarUmaBanda)
route.put('/atualizarUma/:banda', Banda.atualizarUmaBanda)
route.delete('/apagarUma/:banda', Banda.apagarUmaBanda)

module.exports = route