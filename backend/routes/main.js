const express = require('express');
const router = express.Router();

const homeRouter = require('./home');
const profileRouter = require('./profile');

router.use('/', homeRouter);
router.use('/profile', profileRouter);

module.exports = router;