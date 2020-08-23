const express = require('express')
const route = express.Router()
const Musica = require('./../controllers/musicas.controller')

route.post('/criar', Musica.criarMusica)

module.exports = route