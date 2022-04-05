const router = require('express').Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { HaircutTypes } = require('../models');

mongoose.connect(dotenv.parsed.localDbUri);

router.route('/api/haircut-styles').get((req, res) => {
    HaircutTypes.find({}, {}, (err, results) => {
        if (err) {
            console.log('Critical error in haircut styles route', err.message);
            res.status(500).send('Internal server error');
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;