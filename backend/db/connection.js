const mongoose = require('mongoose');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.d6rmid3.mongodb.net/`);
        console.log('Connected to the database')
    }
    catch (error) {console.log(error)};
};

module.exports = main;