import express from 'express';

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
} from './controllers/books.js';

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Returns a list of all books.
 *     responses:
 *       200:
 *         description: A list of books
 *       500:
 *         description: Internal server error
 */
router.get('/books', getBooksHandler);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Returns a single book using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book found successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Creates a new book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - author
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1"
 *               author:
 *                 type: string
 *                 example: "J.R.R. Tolkien"
 *               title:
 *                 type: string
 *                 example: "The Hobbit"
 *               publicationDate:
 *                 type: string
 *                 example: "1937-09-21"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Missing required fields or book ID already exists
 *       500:
 *         description: Internal server error
 */
router.post('/books', createBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Updates an existing book using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - title
 *               - publicationDate
 *             properties:
 *               author:
 *                 type: string
 *                 example: "J.R.R. Tolkien"
 *               title:
 *                 type: string
 *                 example: "The Hobbit"
 *               publicationDate:
 *                 type: string
 *                 example: "1937-09-21"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.put('/books/:id', updateBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes a book using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/books/:id', deleteBookHandler);

export default router;