const router = require('express').Router();
const { json } = require('sequelize/dist');
const sequelize = require('../config/connection');
const { User, Books, Library } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    User.findAll({})
    .then(dbPostData => {
          //pass a single object into the homepage template
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
  if(req.session.loggedIn) {
    console.log("finding all books");
    Books.findAll({})
    .then(response => {
      if(!response) {
        res.status(404).json({ message: 'No books found' });
        return;
      }
      console.log("allbooks added " + JSON.stringify(response));
      res.render('bookshelf', {books: response, loggedIn: req.session.loggedIn});
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

router.get('/booklist', (req, res) => {
  if(req.session.loggedIn) {
    console.log("Finding books for user: " + req.session.user_id);
    User.findOne({
      where: {
        id: req.session.user_id
      },
      include: Books
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No books found for this user' });
          return;
        }
        console.log("Books: " + JSON.stringify(dbUserData.Books));
        res.render('booklist', {books: dbUserData.Books, loggedIn: req.session.loggedIn});
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