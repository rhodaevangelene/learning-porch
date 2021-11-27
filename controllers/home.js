const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Books } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    User.findAll({})
    .then(dbPostData => {
          //pass a single post object into the homepage template
            res.render('homepage', {
              loggedIn: req.session.loggedIn
            });
      }).catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }

  res.render('homepage');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }

  res.render('signup');
});

router.get('/bookshelf', (req, res) => {
  if (req.session.loggedIn) {
    res.render('bookshelf');
      return;
  }

  
});

router.get('/booklist', (req, res) => {
  if (req.session.loggedIn) {
    res.render('booklist');
      return;
  }

  
});

module.exports = router;