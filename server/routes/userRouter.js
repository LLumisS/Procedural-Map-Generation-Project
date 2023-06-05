'use strict';

const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth('admin'), userController.get);
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', auth(), userController.check);

module.exports = router;
