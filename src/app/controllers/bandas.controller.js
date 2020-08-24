const bandaschema = require('./../models/bandas.model')
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

class Banda {
    //alterando a partir daqui
    visualizarBandas(req, res) {
        bandaschema.find({})
            .populate('musicas')
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    res.status(200).send({ message: 'Bandas successfully recovered', banda: data })
                }
            })
    }

    visualizarUmaBanda(req, res) {
        const body = req.body
        const { name } = req.params

        bandaschema.findOne({ name })
            .populate('musicas')
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: 'Error processing your request', error: err })
                } else {
                    res.status(200).send({ message: `Banda ${name} successfully recovered`, banda: data })
                }
            })
    }

    // Método para inserir um dado no banco de dados
    criarBanda(req, res) {
        const body = req.body

        bandaschema.create(body, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a requisição", error: err })
            } else {
                res.status(201).send({ message: "Banda criada com sucesso no banco de dados", banda: data })
            }
        })
    }

    // Método para visualizar todos os dados do banco de dados, utilizando QueryParams para definir o valor
    // a serprocessado na função para definir os campos que devem ser buscados
    visualizarBandas(req, res) {
        const campos = req.query.campos

        bandaschema.find({}, definirCamposDeBusca(campos), (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).send({ message: "Todos as músicas foram recuperadas com sucesso", bandas: data })
            }
        })
    }

    // Método para visualizar apenas um dado de acordo com o parâmetro obrigatório especificado na URL
    visualizarUmaBanda(req, res) {
        const nome = req.params.banda

        bandaschema.findOne({ nomeBanda: nome }, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
            } else {
                res.status(200).send({ message: `A banda ${nome} foi recuperado com sucesso`, banda: data })
            }
        })
    }

    atualizarUmaBanda(req, res) {
        const nomeDaBandaParaSerAtualizada = req.params.banda
        const novoNomeDaBanda = req.body.nomeBanda

        bandaschema.updateOne({ nomeBanda: nomeDaBandaParaSerAtualizada }, { $set: req.body }, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar sua atualização", error: err })
            } else {
                if(data.n > 0) {
                    bandaschema.findOne({nomeBanda: novoNomeDaBanda}, (error, result) => {
                        if(err){
                            res.status(500).send({message: "Houve um erro ao processar sua busca na banda atualizada", error: error})
                        } else {
                            res.status(200).send({message: ` A banda ${nomeDaBandaParaSerAtualizada} teve seu nome atualizada para ${novoNomeDaBanda}`, banda: result})
                        }
                    })
                }
            }
        })
    }

    apagarUmaBanda(req, res){
        const nomeDaBandaParaSerApagada = req.params.banda

        bandaschema.deleteOne({nomeBanda: nomeDaBandaParaSerApagada}, (err) => {
            if(err){
                res.status(500).send({message: "Houve um erro ao apagar uma banda", error: err})
            } else {
                res.status(200).send({message: `A banda ${nomeDaBandaParaSerApagada} foi apagada com sucesso`})
            }
        })
    }
}

module.exports = new Banda()