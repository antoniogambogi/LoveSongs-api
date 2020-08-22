const musicaschema = require('./../models/musicas.model')

class Musica {
    criarMusica(req, res) {
        const body = req.body

        musicaschema.create(body, (err, data) => {
            if(err){
                res.status(500).send({message: "Houve um erro ao processar a requisição", error: err})
            }else{
                res.status(201).send({message: "Música criada com sucesso no banco de dados", musica: data})
            }
        })
    }
}

module.exports = new Musica()