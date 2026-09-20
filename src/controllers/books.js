import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../models/books.js';

import { getDb } from '../db/connect.js';

// GET /books
const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// GET /books/:id
const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// POST /books
const createBookHandler = async (req, res) => {
  try {
    const {
      id,
      authorId,
      title,
      publicationDate
    } = req.body;

    // Validate required fields
    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'id, authorId, title, and publicationDate are required'
      });
    }

    // Check if the author exists
    const db = getDb();
    const author = await db.collection('authors').findOne({
      id: authorId
    });

    if (!author) {
      return res.status(400).json({
        message: 'Invalid authorId: author does not exist'
      });
    }

    // Check if the book ID already exists
    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'A book with this id already exists'
      });
    }

    // Create the new book
    const newBook = {
      id,
      authorId,
      title,
      publicationDate
    };

    const result = await createBook(newBook);

    if (!result.insertedId) {
      return res.status(500).json({
        message: 'Unable to create book'
      });
    }

    return res.status(201).json(newBook);

  } catch (error) {
    console.error('POST /books failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// PUT /books/:id
const updateBookHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const {
      authorId,
      title,
      publicationDate
    } = req.body;

    // Validate required fields
    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({
        message: 'authorId, title, and publicationDate are required'
      });
    }

    // Check if the author exists
    const db = getDb();
    const author = await db.collection('authors').findOne({
      id: authorId
    });

    if (!author) {
      return res.status(400).json({
        message: 'Invalid authorId: author does not exist'
      });
    }

    // Data to update
    const updatedBook = {
      authorId,
      title,
      publicationDate
    };

    const result = await updateBook(
      requestedId,
      updatedBook
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    // Return the updated book
    const book = await getBookById(requestedId);

    return res.status(200).json(book);

  } catch (error) {
    console.error('PUT /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// DELETE /books/:id
const deleteBookHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const result = await deleteBook(requestedId);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    // 204 means successful deletion with no response body
    return res.status(204).send();

  } catch (error) {
    console.error('DELETE /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};