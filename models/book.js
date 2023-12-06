// models/bookModel.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  quantity: { type: Number, default: 1 }, // New field for book quantity
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
