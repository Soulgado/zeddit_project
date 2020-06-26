var pgp = require("pg-promise")();
require('dotenv').config();

const env = process.env;

const cn = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  max: 30
};

var db = pgp(cn);

module.exports = db;
