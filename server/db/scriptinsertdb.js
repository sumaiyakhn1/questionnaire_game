const fs = require('fs');
const csv = require('csv-parser');
//const { pool } = require("./db/dbConfig");
const { pool } = require("./dbConfig");

const filename = process.argv[2];

// Path to your CSV file
const csvFilePath = `./db/${filename}`;
// const csvFilePath = './db/question_bank - Sheet1.csv';

const questions = []; // Array to store JSON objects

//fs library used for r/w files
//pipe is i/o stream where we r/w
//row contains a single line of a file
//we are pushing each row to the questions array
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
          questions.push(row);    
    })

   // this prints whole file
    .on('end', () => {
        // console.log('CSV file reading completed.');
        // console.log('questions:', questions);
        // console.log(questions[0].a);
        questions.forEach((question) => {
            pool.query(
                `INSERT INTO question_bank (id, question, a, b, c, d, ans, level)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING id;`,
                [
                    question.id,
                    question.question,
                    question.a,
                    question.b,
                    question.c,
                    question.d,
                    question.ans,
                    question.level,
                ],
                (err, dbres) => {
                    if (err) {
                        //console.error(err);
                    } else {
                        console.log(`Question inserted with ID: ${dbres.rows[0].id}`);
                        // Handle success (e.g., send a response to the client)
                    }
                }
            );
        });
    });

    


    