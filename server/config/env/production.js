'use strict';

module.exports = {
  db: {
    dbName: process.env.DBNAME,
    username : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    dialect: "postgres",
    port : 5432
  }
};
