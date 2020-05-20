const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthorized } = require('../modules/authorization-middleware');
const router = express.Router();

router.get('/', rejectUnauthorized, (req, res) => {
    console.log('req.user:', req.user);
    pool.query('SELECT * FROM "secret";')
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;