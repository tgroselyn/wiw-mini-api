//setup
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

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
    let sqlQuery = `INSERT INTO "shifts" ("start", "end") VALUES ($1, $2);`;
    let sqlValues = [req.body.start, req.body.end]
    pool.query(sqlQuery, sqlValues)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log('error from shiftRouter POST:', err);
            res.sendStatus(500);
        })
});

module.exports = router;