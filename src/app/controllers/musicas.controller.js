const musicaschema = require('./../models/musicas.model')

// Função para definir quais campos devem ser buscados ao realizar um find no banco de dados
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

    // Método para inserir um dado no banco de dados
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

    // Método para visualizar todos os dados do banco de dados, utilizando QueryParams para definir o valor
    // a serprocessado na função para definir os campos que devem ser buscados
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

    // Método para visualizar apenas um dado de acordo com o parâmetro obrigatório especificado na URL
    visualizarUmaMusica(req, res){
        const nome = req.params.musica

        musicaschema.findOne({nomeMusica: nome}, (err, data) => {
            if(err){
                res.status(500).send({message: "Houve um erro ao processar sua requisição", error: err})
            }else{
                res.status(200).send({message: `Música ${nome} foi recuperado com sucesso`, musica: data})
            }
        })
    }

    atualizarUmaMusica(req, res){
        const nome = req.params.musica

        musicaschema.updateOne({nomeMusica: nome}, {$set: req.body}, (err, data) => {
            if(err){
                res.status(500).send({message: "Houve um erro ao processar sua requisição", error: err})
            }else{
                res.status(200).send({message: `Música ${nome} foi atualizada com sucesso`})
            }
        })
    }

}

module.exports = new Musica()