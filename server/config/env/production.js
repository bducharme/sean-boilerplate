'use strict';

module.exports = {
  db: {
    dbName: process.env.DBNAME,
    username : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    host : process.env.DBHOST,
    dialect: "postgres",
    port : 5432
  }
};
