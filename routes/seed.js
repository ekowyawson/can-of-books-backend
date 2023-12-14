const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');


// @desc    Get all books
// @route   GET /books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// @desc    Create book
// @route   POST /books/add
router.post('/addBook', async (req, res) => {
  try {
    let body = req.body;
    // Check if a book with the same title already exists
    const existingBook = await Book.find({ title: body.title });
    
    if (existingBook) {
      body.similarTitles = existingBook.length;
      // Create book and update the similarTitles numbers to match
      const newBook = await Book.create(body);
      await Book.updateMany(
        {"title": body.title},
        {"$set":{"similarTitles": existingBook.length}}
      );

      res.status(200).send(newBook);
    } else {
      // If the book doesn't exist, create it
      const newBook = await Book.create(body);
      res.status(200).send(newBook);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// @desc    Update a book by ID
// @route   PUT /books/:id
router.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const msg = ['Book updated:', updatedBook];
    res.json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// @desc    Delete a book by ID
// @route   DELETE /books/:id
router.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const existingBooks = await Book.find({ title: deletedBook.title });
    
    if (existingBooks) {
      let existingBooksCount = 0;

      if(existingBooks.length > 1) {
        existingBooksCount = existingBooks.length;
      }

      await Book.updateMany(
        {"title": deletedBook.title},
        {"$set":{"similarTitles": existingBooksCount}}
      );
    }

    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
