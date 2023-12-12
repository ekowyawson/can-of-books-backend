const express = require('express')
const router = express.Router()
const Book = require('../models/Book.js');

const newBook = new Book({
    title: 'BumfukEgypt',
    description: 'A book about Egypt.',
    status: 'Available'
})

const booksData = [
    {
      title: 'Book 1',
      description: 'Description for Book 1',
      status: 'Available',
    },
    {
      title: 'Book 2',
      description: 'Description for Book 2',
      status: 'Checked Out',
    },
    {
      title: 'Book 3',
      description: 'Description for Book 3',
      status: 'Reserved',
    },
];

// @desc    Add books
// @route   POST /books
router.get('/books', async (req, res) => {
    try {
      const createdBooks = await Book.create(booksData);
      console.log('Three new books have been created:', createdBooks);
      res.json(createdBooks);
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;