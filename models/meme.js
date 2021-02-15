const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    caption: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('meme', memeSchema);