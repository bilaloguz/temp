const { Router } = require('express'),
    router = Router(),
    controllers = require('../controllers/appController');

//router.get('/home', mid.controllers.requiresLogin, controllers.Homepagestuff)
router.get('/', controllers.login);
router.get('logout', mid.controllers.requiresLogin, controllers.logout)
module.exports = router;
