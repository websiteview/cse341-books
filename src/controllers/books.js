import { getAllBooks } from '../models/books.js';

const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    res.status(500).json({ message: 'Failed to get books' });
  }
};

export { getBooks };