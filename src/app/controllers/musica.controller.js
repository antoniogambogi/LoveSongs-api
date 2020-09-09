const musica = require('./../models/musica.model')

class Musica {

    // Método para visualizar todos os dados do banco de dados, utilizando QueryParams para definir o valor
    // a serprocessado na função para definir os campos que devem ser buscados
    buscarTodasAsMusicas(req, res) {

        musica.find({})
            .populate('banda', { nome: 1, video: 1 })
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

        if(nomeMusica == undefined || nomeMusica == 'null'){
            res.status(400).send({message: "O nome da música da música é obrigatório"})
        }

        musica.find({ nome: nomeMusica })
            .populate('banda', { nome: 1, video: 1 })
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
        const body = req.body

        musica.create(body, (err, data) => {
            if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a requisição", error: err })
            } else {
                res.status(201).send({ message: "Música criada com sucesso no banco de dados", musica: data })
            }
        })
    }

}

module.exports = new Musica()