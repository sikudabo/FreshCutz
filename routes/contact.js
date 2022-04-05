const router = require('express').Router();
const dotenv = require('dotenv').config();
const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: dotenv.parsed.emailService,
    auth: {
        user: dotenv.parsed.shopEmail,
        pass: dotenv.parsed.shopEmailPass,
    },
});

router.route('/api/contact').post((req, res) => {
    const { firstName, lastName, msg, phoneNumber } = req.body;

    const emailMessage = `Message from ${firstName} ${lastName} \n Phone number: ${phoneNumber} \n \n \n Message: \n ${msg}`;

    const mailOptions = {
        from: dotenv.parsed.shopEmail,
        to: 'lakingsdodgers@gmail.com',
        subject: 'FreshCutz customer contact message alert',
        text: emailMessage,
    };

    console.log('Email is:', dotenv.parsed.shoEmail);
    console.log('Password is:', dotenv.parsed.shopEmailPass);

    transporter.sendMail(mailOptions, err => {
        if (err) {
            console.log('Error processing contact email');
            console.log(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.status(200).send('success');
        }
    });
});

module.exports = router;