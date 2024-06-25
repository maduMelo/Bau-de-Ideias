const express = require('express');
const router = express.Router();

const checkToken = require('../controllers/authController');
const PrivateController = require('../controllers/privateController');
const upload = require('../db/multer');

// Private Routes /profile


// GET - open personal homepage
router
    .route('/')
    .get(checkToken, (req, res) => PrivateController.getPersonalPage(req, res))

// POST - create new idea
router
    .route('/')
    .post(checkToken, upload.single('file'), (req, res) => PrivateController.createIdea(req, res))

// PUT - update existing idea
router
    .route('/:id')
    .put(checkToken, (req, res) => PrivateController.updateIdea(req, res))

// DELETE - delete existing idea
router
    .route('/:id')
    .delete(checkToken, (req, res) => PrivateController.deleteIdea(req, res))


module.exports = router;