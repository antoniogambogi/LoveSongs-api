const express = require('express')
const route = express.Router()
const Musica = require('./../controllers/musica.controller')

route.post('/criar', Musica.criarMusica)
route.get('/listarTodas', Musica.buscarTodasAsMusicas)
route.get('/listarUma/:nomeMusica', Musica.buscarUmaMusicaPeloNome)
route.get('/validarNomeMusica', Musica.validarNomeMusica)
route.delete('/apagar/:songId', Musica.delete)

module.exports = route