
const Book = require('../controllers/book')

module.exports = app => {
    app.route('/books').get(Book.listByQuery);
    app.route('/books/:bookId').get(Book.getById);
    app.route('/books').post(Book.post)
    app.route('/books/:bookId').delete(Book.deleteBook)
};
