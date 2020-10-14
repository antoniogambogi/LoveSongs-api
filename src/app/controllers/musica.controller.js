const musica = require('./../models/musica.model')
const banda = require('./../models/banda.model')

class Musica {

    // Método para visualizar todos os dados do banco de dados, utilizando QueryParams para definir o valor
    // a serprocessado na função para definir os campos que devem ser buscados
    buscarTodasAsMusicas(req, res) {

        musica.find({})
            .populate('banda', { nome: 1, imagem: 1, genero: 1 })
            .sort({ nome: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: "Não existem músicas cadastradas na base de dados" })
                    } else {
                        res.status(200).send({ message: "Todos as músicas foram recuperadas com sucesso", data: data })
                    }

                }
            })
    }

    // Método para visualizar apenas um dado de acordo com o parâmetro obrigatório especificado na URL
    buscarUmaMusicaPeloNome(req, res) {
        const { nomeMusica } = req.params

        if (nomeMusica == undefined || nomeMusica == 'null') {
            res.status(400).send({ message: "O nome da música da música é obrigatório" })
        }

        musica.findOne({ nome: nomeMusica })
            .populate('banda', { nome: 1, imagem: 1, genero: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: "Música não encontrada na base de dados" })
                    } else {
                        res.status(200).send({ message: `A música ${nomeMusica} foi recuperado com sucesso`, data: data })
                    }
                }
            })
    }

    // Método para inserir um dado no banco de dados
    criarMusica(req, res) {
        const reqBody = req.body
        const idBanda = reqBody['banda']

        musica.create(reqBody, (err, musica) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
            } else {
                banda.findById(idBanda, (err, banda) => {
                    if (err) {
                        res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                    } else {
                        banda.musicas.push(musica)
                        banda.save({}, (err) => {
                            if (err) {
                                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                            } else {
                                res.status(201).send({ message: "Música criado com sucesso", data: musica })
                            }
                        })
                    }
                })
            }
        })
    }

    validarNomeMusica(req, res) {
        const nome = req.query.nome.replace(/%20/g, " ")

        musica.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
            } else {
                if (result.length > 0) {
                    res.status(200).send({ message: "Já existe uma música cadastrada com esse nome", data: result.length })
                } else {
                    res.status(200).send({ message: "Música disponível", data: result.length })
                }
            }
        })
    }

    update(req, res) {
        const { songId } = req.params
        const reqBody = req.body
        const bandId = reqBody['banda']

        musica.updateOne({ _id: songId }, { $set: reqBody }, (err, musica) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
            } else {
                banda.findOne({ musicas: songId }, (err, result) => {
                    if (err) {
                        res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
                    } else {
                        if (result['_id'] == bandId) {
                            res.status(200).send({ message: "A música foi atualizada som sucesso", data: musica })
                        } else {
                            result.musicas.pull(songId)
                            result.save({}, (err) => {
                                if (err) {
                                    res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
                                } else {
                                    banda.findById(bandId, (err, banda) => {
                                        if (err) {
                                            res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
                                        } else {
                                            banda.musicas.push(songId)
                                            banda.save({}, (err) => {
                                                if (err) {
                                                    res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
                                                } else {
                                                    res.status(200).send({ message: "A música foi atualizada som sucesso", data: musica })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    delete(req, res) {
        const { songId } = req.params

        banda.findOne({ musicas: songId }, (err, banda) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
            } else {
                banda.musicas.pull(songId)
                banda.save((err) => {
                    if (err) {
                        res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                    } else {
                        musica.deleteOne({ _id: songId }, (err, result) => {
                            if (err) {
                                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                            } else {
                                res.status(200).send({ message: "A música foi apagada com sucesso", data: result })
                            }
                        })
                    }
                })
            }
        })
    }

}
module.exports = new Musica()