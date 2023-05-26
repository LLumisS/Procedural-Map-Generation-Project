const Router = require('express');
const router = new Router();
const mapController = require('../controllers/mapController');

router.post('/', mapController.create);
router.get('/shared', mapController.getShared);
router.get('/saved', mapController.getSaved);
router.delete('/', mapController.delete);

module.exports = router;