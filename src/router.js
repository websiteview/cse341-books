import express from 'express';

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
} from './controllers/books.js';

const router = express.Router();

// GET all books
router.get('/books', getBooksHandler);

// GET one book
router.get('/books/:id', getBookByIdHandler);

// CREATE a book
router.post('/books', createBookHandler);

// UPDATE a book
router.put('/books/:id', updateBookHandler);

// DELETE a book
router.delete('/books/:id', deleteBookHandler);

export default router;