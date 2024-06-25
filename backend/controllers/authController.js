require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware para autentificar o usuário
function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {return res.status(401).json({ message: 'Access denied' })}
    
    const secret = process.env.SECRET;
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next(null, decoded);
    }
    catch (e) {res.status(400).json({ message: 'Invalid token' })};
};

module.exports = checkToken;