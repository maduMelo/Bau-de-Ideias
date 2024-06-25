const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routers
const routes = require('./routes/main');
app.use('/', routes)

// DB Connection
const connection = require('./db/connection');
connection();

// Starting server
app.listen(5000, () => console.log('server listening on port 5000'));

module.exports = app;



// Para rodar o backend: npm run start

// Concluído: crud, validação de usuário, conexão com o mongoDB e com o AWS 