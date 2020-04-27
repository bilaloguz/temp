const { Router } = require('express'),
    router = Router(),
    auth = require('../middleware/auth'),
    controllers = require('../controllers/appController');

router.get('/u', auth, controllers.showUsers)//dummy
router.get('/', auth, controllers.home);
router.get('/login', controllers.showLogin);
router.post('/api/login', controllers.doLogin);
router.post('/api/room/add', controllers.addRoom);
router.post('/api/room/delete', controllers.deleteRoom);


module.exports = router;