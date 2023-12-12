const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: false
    }
})

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;