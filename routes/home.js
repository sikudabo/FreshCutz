const router = require('express').Router();

router.route('/home').get((req, res) => {
    console.log('I am being hit');
    res.status(200).json({ username: 'sikudabo', password: 'password' });
});

module.exports = router;