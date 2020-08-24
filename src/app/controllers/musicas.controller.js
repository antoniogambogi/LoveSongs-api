const musicaschema = require('./../models/musicas.model')

// Função para definir quais campos devem ser buscados ao realizar um find no banco de dados
function definirCamposDeBusca(campos) {
    if (campos == 'musicaGenero') {
        return { nomeMusica: 1, generoBanda: 1 }
    } else if (campos == 'nomeMusica') {
        return { nomeMusica: 1 }
    } else {
        return null
    }
}

class Musica {
// alterando a partir daqui
    visualizarMusicas(req, res) {
        musicaschema.find({})
            .populate('bandas')
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Erro ao processar sua requisição', error: err })
                } else {
                    res.status(200).send({ message: 'Músicas recuperadas som sucesso', musica: data })
                }
            })
    }

    visualizarUmaMusica(req, res) {
        const { name } = req.params

        musicaschema.findOne({ name })
            .populate('bandas')
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    res.status(200).send({ message: `Música ${name} successfully recovered`, musica: data })
                }
            })
    }


    // Método para inserir um dado no banco de dados - CÓDIGO CERTO DAQUI PRA BAIXO
    criarMusica(req, res) {
        const body = req.body

        musicaschema.create(body, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a requisição", error: err })
            } else {
                res.status(201).send({ message: "Música criada com sucesso no banco de dados", musica: data })
            }
        })
    }

    // Método para visualizar todos os dados do banco de dados, utilizando QueryParams para definir o valor
    // a serprocessado na função para definir os campos que devem ser buscados
    visualizarMusicas(req, res) {
        const campos = req.query.campos

        musicaschema.find({}, definirCamposDeBusca(campos), (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).send({ message: "Todos as músicas foram recuperadas com sucesso", musicas: data })
            }
        })
    }

    // Método para visualizar apenas um dado de acordo com o parâmetro obrigatório especificado na URL
    visualizarUmaMusica(req, res) {
        const nome = req.params.musica

        musicaschema.findOne({ nomeMusica: nome }, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).send({ message: `A música ${nome} foi recuperado com sucesso`, musica: data })
            }
        })
    }

    atualizarUmaMusica(req, res) {
        const nomeDaMusicaParaSerAtualizada = req.params.musica
        const novoNomeDaMusica = req.body.nomeMusica

        musicaschema.updateOne({ nomeMusica: nomeDaMusicaParaSerAtualizada }, { $set: req.body }, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua atualização", error: err })
            } else {
                if(data.n > 0) {
                    musicaschema.findOne({nomeMusica: novoNomeDaMusica}, (error, result) => {
                        if(err){
                            res.status(500).send({message: "Houve um erro ao processar sua busca na música atualizada", error: error})
                        } else {
                            res.status(200).send({message: ` A música ${nomeDaMusicaParaSerAtualizada} teve seu nome atualizada para ${novoNomeDaMusica}`, musica: result})
                        }
                    })
                }
            }
        })
    }

    apagarUmaMusica(req, res){
        const nomeDaMusicaParaSerApagada = req.params.musica

        musicaschema.deleteOne({nomeMusica: nomeDaMusicaParaSerApagada}, (err) => {
            if(err){
                res.status(500).send({message: "Houve um erro ao apagar uma música", error: err})
            } else {
                res.status(200).send({message: `A música ${nomeDaMusicaParaSerApagada} foi apagada com sucesso`})
            }
        })
    }
}

module.exports = new Musica()