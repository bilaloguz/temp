const express = require('express'),
    controller = require('../controllers/controller'),
    router = express.Router();

router.get('/login', controller.showUserLogin);
router.post('/login', controller.doUserLogin);
router.get('/logout', controller.auth, controller.userLogout);
router.get('/', controller.auth, controller.home);
router.post('/', controller.auth, controller.addRoom);
router.post('/room/delete', controller.auth, controller.deleteRoom);
router.post('/room/edit', controller.auth, controller.editRoom);
router.post('/user/add', controller.auth, controller.addUser);
router.post('/user/delete', controller.auth, controller.deleteUser);
router.post('/user/edit', controller.auth, controller.editUser);
module.exports = router;