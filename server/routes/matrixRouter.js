const Router = require('express');
const router = new Router();
const matrixController = require('../controllers/matrixController');

router.post('/', matrixController.create)
router.get('/', matrixController.get)

module.exports = router;