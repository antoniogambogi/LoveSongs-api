const banda = require('./../models/banda.model')
const musica = require('./../models/musica.model')

class Banda {

    buscarTodasAsBandas(req, res) {
        banda.find({})
            .sort({ nome: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: "Houve um erro ao processar sua requisição", error: err })
                } else {
                    if (data.length <= 0) {
                        res.status(200).send({ message: "Não foram encontradas bandas para exibir" })
                    } else {
                        res.status(200).send({ message: "Bandas recuperadas com sucesso", data: data })
                    }
                }
            })
    }

    buscarUmaBandaPeloNome(req, res) {
        const { nomeBanda } = req.params

        if (nomeBanda == undefined || nomeBanda == 'null') {
            res.status(400).send({ message: "O nome da banda é obrigatório" })
        }

        banda.findOne({ nome: nomeBanda })
            .populate('musicas', { nome: 1, video: 1, genero: 1 })
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                } else {
                    if (data == null) {
                        res.status(200).send({ message: `A banda ${nomeBanda} não existe no banco de dados` })
                    } else {
                        res.status(200).send({ message: `A banda ${nomeBanda} possui músicas cadastradas`, data: data })
                    }
                }
            })
    }

    criarUmaBanda(req, res) {
        const reqBody = req.body

        banda.create(reqBody, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error, err })
            } else {
                res.status(200).send({ message: "Banda criada com sucesso", data: data })
            }
        })
    }

    validarNomeBanda(req, res) {
        const nome = req.query.nome.replace(/%20/g, " ")

        banda.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição" })
            } else {
                if (result.length > 0) {
                    res.status(200).send({ message: "Já existe uma banda cadastrada com esse nome", data: result.length })
                } else {
                    res.status(200).send({ message: "Banda disponível", data: result.length })
                }
            }
        })
    }

    updateBand(req, res) {
        const { bandId } = req.params
        const reqBody = req.body

        banda.updateOne({ _id: bandId }, { $set: reqBody }, (err, band) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
            } else {
                res.status(200).send({ message: "banda atualizada com sucesso", data: band })
            }
        })
    }

    deleteBand(req, res) {
        const { bandId } = req.params;

        banda.findOne({ _id: bandId }, (err) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
            } else {
                musica.deleteMany({ banda: bandId }, (err) => {
                    if (err) {
                        res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                    } else {
                        banda.deleteOne({ _id: bandId }, (err, band) => {
                            if (err) {
                                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
                            } else {
                                res.status(200).send({ message: "Banda apagada com sucesso", data: band })
                            }
                        })
                    }
                })
            }
        })
    }
}

module.exports = new Banda()