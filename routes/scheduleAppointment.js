const router = require('express').Router();
const dotenv = require('dotenv').config();
const nodeMailer = require('nodemailer');
const stripe = require('stripe')(dotenv.parsed.clientSecret);
const haircutTypes = require('../models/haircutTypes');
const mongoose = require('mongoose');

mongoose.connect(dotenv.parsed.localDbUri);

const transporter = nodeMailer.createTransport({
    service: dotenv.parsed.emailService,
    auth: {
        user: dotenv.parsed.shopEmail,
        pass: dotenv.parsed.shopEmailPass,
    },
});

router.route('/api/stripe/pay').post(async (req, res) => {
    const { haircutType, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount: 5000,
            currency: 'USD',
            description: 'Haircut payment',
            payment_method: id,
            confirm: true,
        });
        console.log('The payment is:', payment);
        res.status(200).send('success');
    } catch(e) {
        console.log('Error processing stripe payment:', e.message);
        res.status(500).json({ message: 'failed payment', error: e.message });
    }
});

module.exports = router;