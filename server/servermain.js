const express = require('express');
const router = express.Router();
const { pool } = require("./db/dbConfig");
const path = require('path');

const middleware= (req, res, next) => {
    next();
}

// send list of all courses
router.get('/allQuestions',middleware, async (req, res) => {
// const courses = await Course.find({});
console.log("Getting all questions");
pool.query(`SELECT id,question,a,b,c,d,level FROM question_bank WHERE used = 0 ORDER BY "id" ASC`, [], (dberr, dbres) => {
    if (dberr) {
        console.log(dberr);
    }

    // if no question found, send empty
    if (dbres.rows.length == 0) {
    res.json({questions : []});
    }

    
    // successfully all questions
    else {
        // console.log(dbres.rows);
    var easy = [];
    var medium = [];
    var hard = [];
    var num_easy = 3;
    var num_medium = 6;
    var num_hard = 3;
    var i = 0;
    var que = null;
    var questions = dbres.rows;
    while(i<questions.length && (num_easy + num_medium + num_hard > 0) ) {
        que = questions[i];
        if(que.level == "e" && num_easy > 0){
           easy.push(que); 
           num_easy -= 1;
        }
        else if(que.level == "m" && num_medium > 0){
            medium.push(que); 
            num_medium -= 1;
        }
        else if(que.level == "h" && num_hard > 0){
            hard.push(que); 
            num_hard -= 1;
         }
        i += 1;
    }  
    const combineQuestion = easy.concat(medium,hard);
    res.json({questions : combineQuestion });

    }
})
});

//////new table

router.post('/createtable',middleware, async (req, res) => {
    username = req.body.username;
    pool.query(`CREATE TABLE ${username} (
        id INTEGER PRIMARY KEY,
        correct TEXT,
        attempted TEXT);`,
    
       [], (dberr, dbres) => {

        if (dberr) {
        console.log(dberr);
        }
        else {
        res.json({mssg : `createdtable ${username}`});
        }
    })
    });
////answers matching
router.post('/saveanswer',middleware, async (req, res) => {
    var attempted_ans = req.body.text;
    var username = req.body.username;
    var qid = req.body.qid;

    pool.query(`SELECT ans FROM question_bank WHERE "id"=$1;`,[qid],  (dberr, dbres) => {

        if (dberr) {
        console.log(dberr);
        }
        else {
            var correct_ans = dbres.rows[0].ans;//fetching just ans so it is in 0th pos
            console.log(correct_ans);
            pool.query(`INSERT INTO "${username.toLowerCase()}" ("id", "correct","attempted")
            VALUES ($1, $2, $3)`, [qid,correct_ans,attempted_ans],
            
                 (dberr, dbres) => {
        
                if (dberr) {
                console.log(dberr);
                }
                else {
                pool.query(`UPDATE question_bank
                SET used =1
                WHERE id =$1;
                `,[qid], 
                (dberr, dbres) => {
        
                    if (dberr) {
                    console.log(dberr);
                    }
                    else{
                        res.json({mssg : `attemted_ans ${attempted_ans} ${qid}`, result: correct_ans == attempted_ans });
                        
                    }
                }
                )
                }
            })

        }})

   
    });

    router.get('/getcorrectanswer/:qid',middleware, async (req, res) => {
            var qid = req.params.qid;
           // console.log(qid);
            pool.query(`SELECT ans FROM question_bank WHERE "id"=$1;`,
        
           [qid], (dberr, dbres) => {
            
            if (dberr) {
            console.log(dberr);
            }
            else {
            var correct_ans = dbres.rows[0].ans;

            res.json({mssg : `${correct_ans}`});
            }
        })
        });

        router.get('/num_attempted/:username',middleware, async (req, res) => {
            var username = req.params.username;
           // console.log(qid);
            pool.query(`SELECT * FROM ${username};`,
        

           [], (dberr, dbres) => {
            
            if (dberr) {
            console.log(dberr);
            }
            else {
            var num_attempted = dbres.rows.length;
            res.json({num_attempted : `${num_attempted}`});
            }
        })
        });
    

// console.log("Getting all questions");
// pool.query(`SELECT * FROM question_bank ORDER BY "id" ASC`, [], (dberr, dbres) => {
//     if (dberr) {
//     throw dberr;
//     }

//     // if no question found, send empty
//     if (dbres.rows.length == 0) {
//     res.json({courses : []});
//     }

    
//     // successfully all courses
//     else {
//         console.log(dbres.rows);
//     res.json({courses : dbres.rows});
//     }
// })

module.exports = router