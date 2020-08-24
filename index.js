// Importando dependências necessárias para rodar a API.
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const database = require('./src/config/database')

// Importando rotas da aplicação.
const MusicasRoutes = require('./src/app/routes/musicas.routes')
const BandasRoutes = require('./src/app/routes/bandas.routes')

// Configurando o body parser da API.
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type: 'application/json'}))

// Configurando o CORS da API.
app.use(cors())

// Configurando cabeçalhos de response padrão.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Configurando o endpoint / para responder um JSON com uma mensagem.
app.get('/', (req, res) => {
    res.send({message: `API LoveSongs tocando na porta ${PORT}`})
})

app.use('/musicas', MusicasRoutes)
app.use('/bandas', BandasRoutes)

// Configurando o endpoint * que é retornado quando uma URL requisita não existe.
app.use('*', (req, res) => {
    res.send({message: 'API LoveSongs não encontrada!'})
})

// Iniciando o servidor da API na porta configurada na varíavel de ambiente ou 3000.
app.listen(PORT, () => console.log(`API LoveSongs tocando na porta ${PORT}`))