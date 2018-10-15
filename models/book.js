const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    library: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Book', Book);
