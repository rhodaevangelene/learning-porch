const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes = require('./home.js');

router.use('/users', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;