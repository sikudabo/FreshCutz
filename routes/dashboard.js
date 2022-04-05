const router = require('express').Router();

router.route('/dashboard').get((req, res) => {
    res.status(200).send('Congratulations. You have reached the dashboard endpoint');
}); 

module.exports = router;