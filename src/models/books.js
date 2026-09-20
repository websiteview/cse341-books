import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');

  const books = await collection.find({}).toArray();

  return books;
};

const getBookById = async (bookId) => {
  const db = getDb();
  const collection = db.collection('books');

  const book = await collection.findOne({
    id: bookId
  });

  return book;
};

const createBook = async (newBook) => {
  const db = getDb();
  const collection = db.collection('books');

  const result = await collection.insertOne(newBook);

  return result;
};

const updateBook = async (bookId, updatedBook) => {
  const db = getDb();
  const collection = db.collection('books');

  const result = await collection.updateOne(
    { id: bookId },
    { $set: updatedBook }
  );

  return result;
};

const deleteBook = async (bookId) => {
  const db = getDb();
  const collection = db.collection('books');

  const result = await collection.deleteOne({
    id: bookId
  });

  return result;
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};