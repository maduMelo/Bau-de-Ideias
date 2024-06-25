const express = require('express');
const router = express.Router();

const PublicController = require('../controllers/publicController');


// GET - open home page
router
    .route('/')
    .get((req, res) => PublicController.getHome(req, res));

// POST - create account
router
    .route('/register')
    .post((req, res) => PublicController.createAccount(req, res));

// POST - log into account
router
    .route('/login')
    .post((req, res) => PublicController.logIntoAccount(req, res));


module.exports = router;