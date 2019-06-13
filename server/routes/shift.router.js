//setup
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const overlap = require('../modules/overlap');

//get all shifts, ordered by start date/time
router.get('/', (req, res) => {
    let sqlQuery = `SELECT * FROM "shifts" ORDER BY "start" ASC;`;
    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('error from shiftRouter GET:', err);
            res.sendStatus(500);
        })
});

//post a shift
router.post('/', (req, res) => {
    //get existing shifts first
    const getQuery = `SELECT * FROM "shifts" ORDER BY "start" ASC;`;
    pool.query(getQuery).then(result => {
        //then, loop through them to see if any overlap - abort
        // for (let shift of result.rows) {
        //     if (overlap(req.body.start, req.body.end, shift.start, shift.end)){
        //         console.log('overlapping shift');
        //         res.sendStatus(500);
        //     }
        // }
        const overlapResult = result.rows.map(shift => {
            return overlap(req.body.start, req.body.end, shift.start, shift.end);
        })

        //if no overlaps, post the new shift
        if (!overlapResult.includes(true)) {
            const postQuery = `INSERT INTO "shifts" ("start", "end") VALUES ($1, $2);`;
            const postValues = [req.body.start, req.body.end];
            pool.query(postQuery, postValues)
                .then(postResult => {
                    res.sendStatus(201);
                })
                .catch(err => {
                    console.log('error from shiftRouter POST:', err);
                    res.sendStatus(500);
                })
        } else {
            console.log('overlap detected')
            res.send('overlap');
        }

    }).catch(err => {
        console.log('error from the shiftRouter POST:', err);
        res.sendStatus(500);
    })
});

module.exports = router;