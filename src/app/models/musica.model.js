const {Schema, model} = require('mongoose')

const MusicaSchema = new Schema({
    nome: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
        trim: true
    },

    album: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 25,
        trim: true
    },
    
    anoMusica: {
        type: Date
    },

    letra: {
        type: String,
        trim: true
    },

    video: {
        type: String,
        required: true,
        trim: true
    },

    banda: {
        type: Schema.Types.ObjectId,
        ref: 'Banda',
        required: true
    }

},
    
    {
       timestamps: true,
       versionKey: false 
    }
)
module.exports = model('Musica', MusicaSchema)