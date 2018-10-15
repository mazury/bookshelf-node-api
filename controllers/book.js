const Book = require('../models/book');

async function listByQuery (req, res, next) {
    try {
        const books = await Book.find(req.query);
        if (!books[0]) {
            throw new Error('API Couldn\'t find data for given query');
        }

        res.status(200).send(books);
    } catch (err) {
        next(err);
    }
}

async function getById (req, res, next) {
    try {
        const book = await Book.findById(req.params.bookId);
        res.status(200).send(book);
    } catch (err) {
        if (err.name === 'CastError') {
            err.message = 'Book ID is not valid';
        }
        next(err);
    }
}

async function post (req, res, next) {
    try {
        await Book.create(req.body);
        res.status(200).json('Book created succesfully.');
    } catch (err) {
        if (err.code === 11000) {
            err.code = 500;
            err.message = 'Book already exists.';
        }
        next(err);
    }
}

async function deleteBook (req, res, next) {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            throw new Error('Book does not exist.');
        }
        res.status(200).json('Book deleted succesfully.');
    } catch (err) {
        next(err);
    }
}

module.exports = { listByQuery, getById, post, deleteBook };
