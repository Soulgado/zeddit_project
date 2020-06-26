var pgp = require("pg-promise")();
require('dotenv').config();

const env = process.env;

var db = pgp(`postgres://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_APP_NAME}`);

module.exports = db;
