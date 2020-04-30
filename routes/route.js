const express = require('express'),
    controller = require('../controllers/controller')
    router = express.Router();

router.get('/login', controller.showUserLogin);
router.post('/login', controller.doUserLogin);
router.get('logout', controller.userLogout);
router.get('/', controller.home);
router.post('/', controller.addRoom);

module.exports = router;