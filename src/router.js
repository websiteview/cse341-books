import express from 'express';

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
} from './controllers/books.js';

import {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler
} from './controllers/authors.js';

const router = express.Router();

/* =========================
   BOOKS
========================= */

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
 *     description: Returns a single book using its custom ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom ID of the book
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
 *     description: Creates a new book with a reference to an existing author.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: "b1"
 *               authorId:
 *                 type: string
 *                 example: "a1"
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
 *         description: Missing required fields, duplicate ID, or invalid authorId
 *       500:
 *         description: Internal server error
 */
router.post('/books', createBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Updates an existing book and its author reference.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: "a1"
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
 *         description: Missing required fields or invalid authorId
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
 *     description: Deletes a book using its custom ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom ID of the book
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/books/:id', deleteBookHandler);


/* =========================
   AUTHORS
========================= */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Returns a list of all authors.
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Internal server error
 */
router.get('/authors', getAuthorsHandler);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     description: Returns a single author using its custom ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom ID of the author
 *     responses:
 *       200:
 *         description: Author found successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.get('/authors/:id', getAuthorByIdHandler);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Creates a new author.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: "a1"
 *               name:
 *                 type: string
 *                 example: "J.R.R. Tolkien"
 *               birthYear:
 *                 type: number
 *                 example: 1892
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Missing or invalid fields, or duplicate ID
 *       500:
 *         description: Internal server error
 */
router.post('/authors', createAuthorHandler);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     description: Updates an existing author.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom ID of the author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: "J.R.R. Tolkien"
 *               birthYear:
 *                 type: number
 *                 example: 1892
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Missing or invalid fields
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.put('/authors/:id', updateAuthorHandler);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author only if the author has no books.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom ID of the author
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author cannot be deleted because they have books
 *       500:
 *         description: Internal server error
 */
router.delete('/authors/:id', deleteAuthorHandler);

console.log('AUTHOR ROUTES ARE IN ROUTER');

export default router;