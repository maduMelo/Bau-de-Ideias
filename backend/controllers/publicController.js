const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

const PublicController = {
    getHome: async (_, res) => {
        try {
            res.json({ message: 'Welcome to the homepage' })
        }
        catch (err) {res.status(500).json({ message: e.message })};
    },

    createAccount: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Checando campos obrigatórios
            if (!username) {return res.status(422).json({ message: 'Username is required' })};
            if (!password) {return res.status(422).json({ message: 'Password is required' })};

            // Checando se usuário existe
            const userExists = await User.findOne({ username: username });
            if (userExists) {return res.status(409).json({ message: 'Username already exists' })};

            // Criptografando senha do usuário
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Criando usuário no banco de dados
            const user = new User({ username, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: 'Account created' })
        }
        catch (e) {res.status(500).json({ message: e.message })};
    },

    logIntoAccount: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Checando campos obrigatórios
            if (!username) {return res.status(422).json({ message: 'Username is required' })};
            if (!password) {return res.status(422).json({ message: 'Password is required' })};

            // Checando se usuário existe
            const userExists = await User.findOne({ username: username });
            if (!userExists) {return res.status(401).json({ message: 'Invalid username or password' })};

            // Checando senha
            const isValidPassword = await bcrypt.compare(password, userExists.password);
            if (!isValidPassword) {return res.status(401).json({ message: 'Invalid username or password' })};

            // Gerando token de acesso
            const secret = process.env.SECRET
            const token = jwt.sign({ id: userExists._id }, secret, { expiresIn: '1h' });

            res.status(200).json({ message: "User successfully authenticated", token })
        }
        catch (e) {res.status(500).json({ message: e.message })};
    }
};


module.exports = PublicController;