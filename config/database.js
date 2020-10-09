const config = require("./index");

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
  },
  production: {
    use_env_variable:
      "postgres://dvdqgvhemqvvnj:6c3c451a5b508e9ded4dcc38e86924aa9b17cc43312a561cfb52d0e9b359e4ed@ec2-3-210-178-167.compute-1.amazonaws.com:5432/ddi8sj63mpq6mu",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};
