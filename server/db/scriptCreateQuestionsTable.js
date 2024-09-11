const fs = require('fs');
const csv = require('csv-parser');
//const { pool } = require("./db/dbConfig");
const { pool } = require("./dbConfig");

pool.query(`CREATE TABLE question_bank (
    id INTEGER PRIMARY KEY,
    question TEXT,
    a TEXT,
    b TEXT,
    c TEXT,
    d TEXT,
    ans TEXT,
    level TEXT);`,

   [], (dberr, dbres) => {

    if (dberr) {
    console.log(dberr);
    }
    else {
    res.json({mssg : `createdtable question_bank`});
    }
})
    


    