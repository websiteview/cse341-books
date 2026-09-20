import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
} from '../models/authors.js';

// GET /authors
const getAuthorsHandler = async (req, res) => {
  console.log('GET /authors HANDLER CALLED');
  try {
    const authors = await getAllAuthors();
    console.log('AUTHORS:', authors);

    return res.status(200).json(authors);
  } catch (error) {
    console.error('GET /authors failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// GET /authors/:id
const getAuthorByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const author = await getAuthorById(requestedId);

    if (!author) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('GET /authors/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// POST /authors
const createAuthorHandler = async (req, res) => {
  try {
    const {
      id,
      name,
      birthYear
    } = req.body;

    // Validate required fields
    if (!id || !name || birthYear === undefined) {
      return res.status(400).json({
        message: 'id, name, and birthYear are required'
      });
    }

    // Validate birthYear is a number
    if (typeof birthYear !== 'number') {
      return res.status(400).json({
        message: 'birthYear must be a number'
      });
    }

    // Check if the ID already exists
    const existingAuthor = await getAuthorById(id);

    if (existingAuthor) {
      return res.status(400).json({
        message: 'An author with this id already exists'
      });
    }

    const newAuthor = {
      id,
      name,
      birthYear
    };

    const result = await createAuthor(newAuthor);

    if (!result.insertedId) {
      return res.status(500).json({
        message: 'Unable to create author'
      });
    }

    return res.status(201).json(newAuthor);

  } catch (error) {
    console.error('POST /authors failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// PUT /authors/:id
const updateAuthorHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const {
      name,
      birthYear
    } = req.body;

    // Validate required fields
    if (!name || birthYear === undefined) {
      return res.status(400).json({
        message: 'name and birthYear are required'
      });
    }

    // Validate birthYear is a number
    if (typeof birthYear !== 'number') {
      return res.status(400).json({
        message: 'birthYear must be a number'
      });
    }

    const updatedAuthor = {
      name,
      birthYear
    };

    const result = await updateAuthor(
      requestedId,
      updatedAuthor
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    const author = await getAuthorById(requestedId);

    return res.status(200).json(author);

  } catch (error) {
    console.error('PUT /authors/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// DELETE /authors/:id
const deleteAuthorHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    // Check if author exists
    const author = await getAuthorById(requestedId);

    if (!author) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    // Check if the author still has books
    const hasBooks = await authorHasBooks(requestedId);

    if (hasBooks) {
      return res.status(409).json({
        message: 'Cannot delete author because the author has books'
      });
    }

    const result = await deleteAuthor(requestedId);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    return res.status(204).send();

  } catch (error) {
    console.error('DELETE /authors/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler
};