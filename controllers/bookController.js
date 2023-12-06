const Book = require('../models/book')
const { createCustomError } = require('../errors/custom-error')

const getAllBooks = async (req, res) => {
  let query = {}

  if (req.query.title) {
    query.title = { $regex: new RegExp(req.query.title, 'i') }
  }

  if (req.query.author) {
    query.author = { $regex: new RegExp(req.query.author, 'i') }
  }

  if (req.query.publicationYear) {
    query.publicationYear = req.query.publicationYear
  }

  if (req.query.availability !== undefined) {
    query.availability = req.query.availability === 'true'
  }

  const books = await Book.find(query)

  res.status(200).json({ success: true, data: books })
}

const getBookById = async (req, res, next) => {
  const bookId = req.params.bookId
  const book = await Book.findById(bookId)
  if (!book) {
    return next(createCustomError('Book not found', 404))
  }
  res.status(200).json({ success: true, data: book })
}

const createBook = async (req, res, next) => {
  const newBook = new Book(req.body)
  const savedBook = await newBook.save()
  res.status(201).json({ success: true, data: savedBook })
}


const updateBook = async (req, res, next) => {
  const bookId = req.params.bookId
  const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true })
  if (!updatedBook) {
    return next(createCustomError('Book not found', 404))
  }
  res.status(200).json({ success: true, data: updatedBook })
}

const deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId
  const deletedBook = await Book.findByIdAndDelete(bookId)
  if (!deletedBook) {
    return next(createCustomError('Book not found', 404))
  }
  res.status(200).json({ success: true, data: deletedBook })
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
}
