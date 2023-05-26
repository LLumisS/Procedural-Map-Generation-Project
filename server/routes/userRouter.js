const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.get('/', userController.get);
router.post('/', userController.registration);
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', userController.check);

module.exports = router;