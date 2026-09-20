import { getDb } from '../db/connect.js';

// GET all authors
const getAllAuthors = async () => {
  const db = getDb();

  const collection = db.collection('authors');

  const authors = await collection.find({}).toArray();

  return authors;
};

// GET author by custom ID
const getAuthorById = async (authorId) => {
  const db = getDb();

  const collection = db.collection('authors');

  const author = await collection.findOne({
    id: authorId
  });

  return author;
};

// CREATE author
const createAuthor = async (newAuthor) => {
  const db = getDb();

  const collection = db.collection('authors');

  const result = await collection.insertOne(newAuthor);

  return result;
};

// UPDATE author
const updateAuthor = async (authorId, updatedAuthor) => {
  const db = getDb();

  const collection = db.collection('authors');

  const result = await collection.updateOne(
    { id: authorId },
    { $set: updatedAuthor }
  );

  return result;
};

// DELETE author
const deleteAuthor = async (authorId) => {
  const db = getDb();

  const collection = db.collection('authors');

  const result = await collection.deleteOne({
    id: authorId
  });

  return result;
};

// Check if author has books
const authorHasBooks = async (authorId) => {
  const db = getDb();

  const collection = db.collection('books');

  const book = await collection.findOne({
    authorId
  });

  return !!book;
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
};