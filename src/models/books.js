import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  return await getDb().collection('books').find({}).toArray();
};

const getBookById = async (bookId) => {
  return await getDb().collection('books').findOne({ id: bookId });
};

export { getAllBooks, getBookById };