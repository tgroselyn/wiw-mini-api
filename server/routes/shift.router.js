//setup
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//get shifts
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "shifts";`;
    pool.query(sqlText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('error from shiftRouter GET:', err);
            res.sendStatus(500);
        })
});

module.exports = router;