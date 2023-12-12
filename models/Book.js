const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Checked Out', 'Reserved', 'Lost'],
    default: 'Available',
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;