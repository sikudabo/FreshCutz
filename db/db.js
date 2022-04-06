const mongoose = require('mongoose');
const { HaircutTypes } = require('../models');

mongoose.connect(process.env.localDbUri);


HaircutTypes.updateMany({ transactions: {$exists: 1 }}, {$unset: { transactions: 0 }}, (err, results) => {
    if (err) {
        console.log(err.message);
        mongoose.connection.close();
        return;
    }

    console.log('Updated results are:', results);
    mongoose.connection.close();
});