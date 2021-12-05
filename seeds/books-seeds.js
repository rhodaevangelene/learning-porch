const { Books } = require('../models');

const booksData = [
  {
    book_title: 'Harry Potter and the Sourcerers Stone',
    author_name: 'JK Rowling',
  },
  {
    book_title: 'A History of Ancient Egypt',
    author_name: 'Marc Van De Mieroop',
  },
  {
    book_title: 'A Cultural History of the Modern Age',
    author_name: 'Egon Friedell',
  },
  {
    book_title: 'Engineering Mathematics',
    author_name: 'C W. Evans',
  },
  {
    book_title: 'An Introduction to Mathematical Proofs',
    author_name: 'Nicholas A. Loehr',
  },
  {
    book_title: 'Understanding Numbers',
    author_name: 'Marianne Freiberger',
  },
  {
    book_title: 'Classic Computer Science Problems in Python',
    author_name: 'David Kopec',
  },
  {
    book_title: 'Modern Physics',
    author_name: 'Jeremy I Pfeffer',
  },
  {
    book_title: 'Physics: A Students Companion',
    author_name: 'Lowry Kirkby',
  },
  {
    book_title: 'Philosophy and Computer Science',
    author_name: 'Timothy Colburn',
  },
  {
    book_title: 'Introduction to Coding Theory',
    author_name: 'Jurgen Bierbrauer',
  },
];

const seedBooks = () => Books.bulkCreate(booksData);

module.exports = seedBooks;