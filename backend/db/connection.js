const mongoose = require('mongoose');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.d6rmid3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function main() {
    try {
        //await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.d6rmid3.mongodb.net/`);
        await mongoose.connect(connectionString);
        console.log('Connected to the database')
    }
    catch (error) {console.log(error)};
};

module.exports = main;