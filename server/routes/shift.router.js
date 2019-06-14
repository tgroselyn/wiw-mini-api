//router setup
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const overlap = require('../modules/overlap');

//delete all shifts from the database
//must be logged in as Manager
router.delete('/', (req, res) => {
    if (req.session.user === 'Manager') {
        let deleteQuery = `DELETE FROM "shifts";`;
        pool.query(deleteQuery)
            .then(result => {
                res.sendStatus(204);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
})

//get all shifts, ordered by start date/time
router.get('/', (req, res) => {
    let sqlQuery = `SELECT * FROM "shifts" ORDER BY "start" ASC;`;
    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

//post a shift
//must be logged in as Manager
router.post('/', (req, res) => {
    if (req.session.user === 'Manager') {
        //get existing shifts first
        const getQuery = `SELECT * FROM "shifts" ORDER BY "start" ASC;`;
        pool.query(getQuery).then(result => {
            //then, loop through them to see if new shift overlaps
            const overlapResult = result.rows.map(shift => {
                return overlap(req.body.start, req.body.end, shift.start, shift.end);
            })
            //quit if overlap detected
            if (overlapResult.includes(true)) {
                res.send('Overlap'); 
            } else {
                //if no overlaps, post the new shift
                const postQuery = `INSERT INTO "shifts" ("start", "end", "title") VALUES ($1, $2, $3);`;
                const postValues = [req.body.start, req.body.end, req.body.title];
                pool.query(postQuery, postValues)
                    .then(postResult => {
                        res.sendStatus(201);
                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(500);
                    });
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;