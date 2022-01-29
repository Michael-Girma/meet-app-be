var dotenv = require("dotenv").config({
  path: __dirname + '/process.env'
})

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "slush",
    "host": "127.0.0.1",
    "dialect": "postgres"
    
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    // "username": "root",
    // "password": null,
    // "database": "database_production",
    // "host": "127.0.0.1",
    // "dialect": "mysql"
    "use_env_variable": "DATABASE_URL"
  }
}
