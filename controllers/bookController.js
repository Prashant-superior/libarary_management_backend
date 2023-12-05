// controllers/bookController.js
const Book = require('../models/bookModel')
const asyncWrapper = require('../middleware/asyncWrapper')
const { createCustomError } = require('../utils/customError')

// Function to get all books with search and filter options
const getAllBooks = asyncWrapper(async (req, res) => {
  let query = {}

  // Handle search by title
  if (req.query.title) {
    query.title = { $regex: new RegExp(req.query.title, 'i') }
  }

  // Handle filter by author
  if (req.query.author) {
    query.author = { $regex: new RegExp(req.query.author, 'i') }
  }

  // Handle filter by publication year
  if (req.query.publicationYear) {
    query.publicationYear = req.query.publicationYear
  }

  // Handle availability filter
  if (req.query.availability !== undefined) {
    query.availability = req.query.availability === 'true'
  }

  const books = await Book.find(query)

  res.status(200).json({ success: true, data: books })
})

// Function to get a book by ID
const getBookById = asyncWrapper(async (req, res, next) => {
  const bookId = req.params.bookId
  const book = await Book.findById(bookId)
  if (!book) {
    return next(createCustomError('Book not found', 404))
  }
  res.status(200).json({ success: true, data: book })
})

// Function to create a new book
const createBook = asyncWrapper(async (req, res, next) => {
  const newBook = new Book(req.body)
  const savedBook = await newBook.save()
  res.status(201).json({ success: true, data: savedBook })
})


// Function to update a book
const updateBook = asyncWrapper(async (req, res, next) => {
  const bookId = req.params.bookId
  const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true })
  if (!updatedBook) {
    return next(createCustomError('Book not found', 404))
  }
  res.status(200).json({ success: true, data: updatedBook })
})

// Function to delete a book
const deleteBook = asyncWrapper(async (req, res, next) => {
  const bookId = req.params.bookId
  const deletedBook = await Book.findByIdAndDelete(bookId)
  if (!deletedBook) {
    return next(createCustomError('Book not found', 404))
  }
  res.status(200).json({ success: true, data: deletedBook })
})

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
}
