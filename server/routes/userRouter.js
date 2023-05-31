'use strict';

const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get('/', checkRole('admin'), userController.get);
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;
