//set up router
const express = require('express');
const router = express.Router();

//login creates cookie session key for "user"
router.post('/login', (req, res) => {
    console.log('logging in as', req.body.username);
    req.session.user = req.session.user || '';
    req.session.user = req.body.username;
    res.sendStatus(200);
})

//get user info, in this case "user" (Falsy value, Employee, or Manager)
router.get('/', (req, res) => {
    console.log('getting user info');
    req.session.user = req.session && req.session.user || '';
    const { user } = req.session;
    res.send({ user });
})

module.exports = router;
