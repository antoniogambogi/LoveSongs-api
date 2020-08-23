const express = require('express')
const route = express.Router()
const Musica = require('./../controllers/musicas.controller')

route.post('/criar', Musica.criarMusica)
route.get('/visualizarTodas', Musica.visualizarMusicas)
route.get('/visualizarUma/:musica', Musica.visualizarUmaMusica)

module.exports = route