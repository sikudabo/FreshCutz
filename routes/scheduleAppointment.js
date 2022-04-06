const router = require('express').Router();
const nodeMailer = require('nodemailer');
const stripe = require('stripe')(process.env.clientSecret);
const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.connect(process.env.localDbUri);

const transporter = nodeMailer.createTransport({
    service: process.env.emailService,
    auth: {
        user: process.env.shopEmail,
        pass: process.env.shopEmailPass,
    },
});

router.route('/api/stripe/pay').post(async (req, res) => {
    const { currentStyle, firstName, lastName, currentDate, phoneNumber, isCreditPayment, id } = req.body;
    const haircutStyles = [
        {
            type: 'Razor Line',
            price: 12.00 * 100,
        },
        {
            type: 'Mohawk',
            price: 25.00 * 100,
        },
        {
            type: 'Low Cut Taper',
            price: 15.00 * 100,
        },
        {
            type: 'Bald Fade',
            price: 15.00 * 100,
        },
        {
            type: 'Clean Shave',
            price: 12.00 * 100,
        },
    ];

    let stylePrice = _.find(haircutStyles, style => style.type === currentStyle);
    console.log('The style price is:', stylePrice);
    try {
        if (isCreditPayment) {
            const payment = await stripe.paymentIntents.create({
                amount: stylePrice.price,
                currency: 'USD',
                description: `Haircut payment. Haircut Type is ${currentStyle}`,
                payment_method: id,
                confirm: true,
            });
            const emailMessage = `First name: ${firstName} \n Last name: ${lastName} \n Haircut type: ${currentStyle} \n Appointment Date: ${currentDate} \n Contact: ${phoneNumber} \n Payment method: ${isCreditPayment ? 'Credit Card' : 'Cash' }`;
            const mailOptions = {
                from: process.env.shopEmail,
                to: 'lakingsdodgers@gmail.com',
                subject: 'FreshCutz appointment scheduled',
                text: emailMessage,
            };

            transporter.sendMail(mailOptions, err => {
                if (err) {
                    console.log('Error processing contact email');
                    console.log(err.message);
                    res.status(500).send('Internal server error');
                } else {
                    res.status(200).send('success');
                }
            });
            console.log('The payment is:', payment);
            res.status(200).send('success');
        } else {
        const emailMessage = `First name: ${firstName} \n Last name: ${lastName} \n Haircut type: ${currentStyle} \n Appointment Date: ${currentDate} \n Contact: ${phoneNumber} \n Payment method: ${isCreditPayment ? 'Credit Card' : 'Cash' }`;
        const mailOptions = {
            from: process.env.shopEmail,
            to: 'lakingsdodgers@gmail.com',
            subject: 'FreshCutz appointment scheduled',
            text: emailMessage,
        };

        transporter.sendMail(mailOptions, err => {
            if (err) {
                console.log('Error processing contact email');
                console.log(err.message);
                res.status(500).send('Internal server error');
            } else {
                res.status(200).send('success');
            }
        });

            res.status(200).send('success');
        }
    } catch(e) {
        console.log('Error processing stripe payment:', e.message);
        res.status(500).json({ message: 'failed payment', error: e.message });
    }
});

module.exports = router;