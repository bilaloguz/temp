const express = require('express'),
    { isAuth } = require('../lib/auth'),
    { currentUserIs } = require('../lib/catchCurrentUser'),
    { checkRole } = require('../lib/checkRole'),
    controller = require('../controllers/controller');

const router = express.Router();

router.post('/login',  controller.login);
router.get('/logout', controller.logout);
//      room routes
router.get('/rooms', isAuth, currentUserIs, controller.getRooms);
router.post('/room', isAuth, currentUserIs, controller.addRoom);
router.get('/room/:id', isAuth, currentUserIs, controller.getRoom);
router.delete('/room', isAuth, currentUserIs, controller.deleteRoom);
router.put('/room', isAuth, currentUserIs, controller.editRoom);
//      user routes
router.get('/users', isAuth, currentUserIs, controller.getUsers)
router.post('/user', isAuth, currentUserIs, checkRole('admin'), controller.addUser)
router.get('/user/:id', isAuth, currentUserIs, controller.getUser)
router.delete('/user', isAuth, currentUserIs, checkRole('admin'), controller.deleteUser)
router.put('/user', isAuth, currentUserIs, checkRole('admin'), controller.editUser);

module.exports = router;