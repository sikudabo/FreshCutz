// This model will show a mapping between haircuts and their associated prices.
const mongoose = require('mongoose');

const haircutTypesSchema = mongoose.Schema({
    style: String,
    price: Number,
},
{
    collection: 'haircutTypes',
});

const HaircutTypes = mongoose.model('HaircutTypes', haircutTypesSchema);

module.exports = HaircutTypes;