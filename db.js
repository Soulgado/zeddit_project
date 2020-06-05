var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:admin@127.0.0.1:5432/postgres");

module.exports = db;
