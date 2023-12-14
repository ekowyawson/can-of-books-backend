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
  author: {
    type: String,
    trim: true,
    default: 'Unknown'
  },
  status: {
    type: String,
    enum: ['Available', 'Checked Out', 'Reserved', 'Lost'],
    default: 'Available',
  },
  similarTitles: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: 'None'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;