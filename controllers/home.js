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
    res.render('bookshelf', {loggedIn: req.session.loggedIn});
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

router.post('/booklist/add', (req, res) => {
  if(req.session.loggedIn) {
    console.log("Adding Books for user: " + req.session.user_id);
    console.log("req: " + JSON.stringify(req.body));
    Books.upsert(
      {
        id: req.body.id,
        book_title: req.body.title,
        author_name: req.body.author,
        book_link: req.body.book_link,
        image: req.body.image
      }
    )
    .then(function(rows){
      Library.upsert(
        {
          book_id: req.body.id,
          user_id: req.session.user_id,
          read: false
        }
      )
      .then(function(rows){
        res.redirect("/booklist");
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
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

router.post('/booklist/toggle', (req, res) => {
  if(req.session.loggedIn) {
    console.log("Toggling read status books for user: " + req.session.user_id);
    console.log("req: " + JSON.stringify(req.body));
    Library.update(
      {read: req.body.read},
      {where: {id: req.body.id}}
    )
      .then(function(rows){
        res.redirect("/booklist");
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

router.post('/booklist/delete', (req, res) => {
  if(req.session.loggedIn) {
    console.log("Toggling read status books for user: " + req.session.user_id);
    console.log("req: " + JSON.stringify(req.body));
    Library.destroy(
      {where: {id: req.body.id}}
    )
      .then(function(rows){
        res.redirect("/booklist");
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