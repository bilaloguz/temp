const { Router } = require('express'),
    router = Router(),
    controllers = require('../controllers/appController');

router.get('/', controllers.home);
router.get('/login', controllers.showLogin);
router.post('/api/login', controllers.doLogin);
router.post('/api/room/add', controllers.addRoom);
router.post('/api/room/delete', controllers.deleteRoom);


module.exports = router;