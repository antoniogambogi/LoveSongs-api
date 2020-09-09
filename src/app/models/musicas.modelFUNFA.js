const {Schema, model} = require('mongoose')

const MusicaSchema = new Schema({
    nomeMusica: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true
    },
    nomeBanda: {
        type: String,
        required: true,
        maxlength: 25,
        trim: true
    },
    albumMusica: {
        type: String,
        required: false,
        maxlength: 25,
        trim: true
    },
    generoBanda: {
        type: String,
        required: false,
        maxlength: 40,
        trim: true
    },
    anoMusica: {
        type: Number,
        maxlength: 4,
        minlength: 2,
        required: false
    }
},
    {
       timestamps: true,
       versionKey: false 
    }
)
module.exports = model('musicaschema', MusicaSchema)