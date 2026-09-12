import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  return await getDb().collection('books').find({}).toArray();
};

export { getAllBooks };