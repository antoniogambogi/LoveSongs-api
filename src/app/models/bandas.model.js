const {Schema, model} = require('mongoose')

const BandaSchema = new Schema({

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

    nomeMusica: {
        type: Schema.Types.ObjectId,
        ref: 'musicaSchema'
    }
},
    {
       timestamps: true,
       versionKey: false 
    }
)
module.exports = model('bandaschema', BandaSchema)