const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    User.findAll({})
    .then(dbPostData => {
          //pass a single post object into the homepage template
          console.log(dbPostData[0]);
            res.render('homepage', {
              loggedIn: req.session.loggedIn
            });
      }).catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


module.exports = router;