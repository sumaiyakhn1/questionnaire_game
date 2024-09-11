require("dotenv").config()
// import * as dotenv from 'dotenv';
// dotenv.config();

//postgre library importing....pool object create persistent(live) connection(multiple req/res can be done)
const { Pool } = require("pg");

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: connectionString
});

module.exports = { pool };