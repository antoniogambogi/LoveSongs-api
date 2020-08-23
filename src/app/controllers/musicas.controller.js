const musicaschema = require('./../models/musicas.model')

function definirCamposDeBusca(campos){
    if(campos == 'musicaGenero'){
        return {nomeMusica: 1, generoBanda: 1}
    }else if(campos == 'nomeMusica'){
        return{nomeMusica: 1}
    }else{
        return null
    }
}

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

    visualizarMusicas(req, res){
        const campos = req.query.campos

        musicaschema.find({}, definirCamposDeBusca(campos), (err, data) => {
            if(err){
                res.status(500).send({message: "Houve um erro ao processar sua requisição", error: err})
            }else{
                res.status(200).send({message: "Todos as músicas foram recuperadas com sucesso", musicas: data})
            }
        })
    }

    visualizarUmaMusica(req, res){
        const nome = req.params.musica

        musicaschema.find({nomeMusica: nome}, (err, data) => {
            if(err){
                res.status(500).send({message: "Houve um erro ao processar sua requisição", error: err})
            }else{
                res.status(200).send({message: `Música ${nome} foi recuperado com sucesso`, musica: data})
            }
        })
    }
}

module.exports = new Musica()