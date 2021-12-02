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
  res.render('booklist', {
    loggedIn: req.session.loggedIn
  });
});

 
const items = [];

router.get("/notes", function (req, res) {
  
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const day = today.toLocaleDateString("en-US", options);
  res.render("list.ejs", {loggedIn: req.session.loggedIn, kindOfDay: day, newListItems: items });
});

router.post("/notes", function (req, res) {
  item = req.body.newItem;
  items.push(item);
  res.redirect("/notes");
});

module.exports = router;