const {Schema, model} = require('mongoose')

const MusicaSchema = new Schema({
    nomeMusica: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true
    },
    
    anoMusica: {
        type: Number,
        maxlength: 4,
        minlength: 2,
        required: false
    },

    nomeBanda: [{
        type: Schema.Types.ObjectId,
        ref: 'bandaschema'
    }]
},
    
    {
       timestamps: true,
       versionKey: false 
    }
)
module.exports = model('musicaschema', MusicaSchema)