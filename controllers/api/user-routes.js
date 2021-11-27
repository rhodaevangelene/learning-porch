const router = require('express').Router();
const { BOOLEAN } = require('sequelize/dist');
const { User, Books } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com, password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if(!dbUserData) {
      res.status(400).json({ message: 'No user with taht email address!'});
      return;
    }

    // verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      //declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user:dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if(req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
})

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /users/1/books
// GET all books for user
router.get('/:id/book', (req, res) => {
  console.log("Listing all books for user: ", req.params.id);
  Books.findAll({
    where: {
      user_id: req.params.id
    },
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No books found for this user' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /users/1/books
// Add Book for a user {}
router.post('/:id/book', async (req, res) => {
    console.log("Adding new book for user: ", req.params.id);
    console.log(req.body);

    var book = req.body;
    book.user_id = req.params.id;
    book.read = false;

    const _book = await Books.create(book)
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    
    res.json(_book);
  });

// PUT /users/1/books
// Update Book for a user
// Sample Request to update read state { "id": 2, "read": true }
// Sample Request to update title, author and read state { "id": 2, "book_title": "Title 2", "author_name": "Author 2", "read": true }
router.put('/:id/book', async (req, res) => {
  console.log("Updating book for user: ", req.params.id);
  console.log(req.body);

  const _book = await Books.update(req.body, 
    {
      where: {
        id: req.body.id,
        user_id: req.params.id
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  res.json(_book);
});

// DELETE /users/1/books/1
router.delete('/:id/book/:book_id', async (req, res) => {
  console.log("Deleting Book: ", req.params.book_id);
  console.log(req.body);

  const _book = await Books.destroy(
    {
      where: {
        id: req.params.book_id,
        user_id: req.params.id
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  res.json(_book);
});

module.exports = router;