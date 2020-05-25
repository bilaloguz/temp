const express = require('express'),
    auth = require('../../middlewares/auth'),
    router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        return res.render('home');
    } catch (err) {
        console.error(err.message);
    }
})

router.get('/login', async (req, res) => {
    try {
        return res.render('login');
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;