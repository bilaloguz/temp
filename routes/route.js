const express = require('express'),
    controller = require('../controllers/controller')
    router = express.Router();

router.get('/login', controller.showUserLogin);
router.post('/login', controller.doUserLogin);
router.get('/logout',controller.auth, controller.userLogout);
router.get('/',controller.auth, controller.home);
router.post('/',controller.auth, controller.addRoom);

module.exports = router;