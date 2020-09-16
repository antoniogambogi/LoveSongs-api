const {Schema, model} = require('mongoose')

const BandaSchema = new Schema({
    nome: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },

    genero: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true
    },

    imagem: {
        type: String,
        trim: true
    },

    musicas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Musica'
        }
    ]
},
    {
        versionKey: false,
        timestamps: true
    }
)
module.exports = model('Banda', BandaSchema)