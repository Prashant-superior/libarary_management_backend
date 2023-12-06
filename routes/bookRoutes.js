// routes/bookRoutes.js
const express = require('express');
const bookRouter = express.Router();

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController')


// Define routes for book management
bookRouter.route('/')
  .get(getAllBooks) // Admin-only route
  .post(createBook); // Admin-only route

bookRouter.route('/:bookId')
  .get(getBookById) // Admin-only route
  .put(updateBook) // Admin-only route
  .delete(deleteBook); // Admin-only route

module.exports = bookRouter;