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

router.get('/courses', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }

  res.render('homepage');
});


router.get('/bookshelf', (req, res) => {
  res.render('bookshelf', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/booklist', (req, res) => {
  if(req.session.loggedIn) {
    console.log("Finding books for user: " + req.session.user_id);
    Books.findAll({
      where: {
        user_id: req.session.user_id
      },
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No books found for this user' });
          return;
        }
        console.log("Books: " + JSON.stringify(dbUserData));
        res.render('booklist', {books: dbUserData.map(dbUserData => dbUserData.toJSON()), loggedIn: req.session.loggedIn});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  else {
    res.status(401).end();
  }
});

module.exports = router;