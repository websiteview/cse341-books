import { getAllBooks, getBookById } from '../models/books.js';

const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    res.status(500).json({ message: 'Failed to get books' });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Error getting book:', error);
    return res.status(500).json({ message: 'Failed to get book' });
  }
};

export { getBooks, getBook };