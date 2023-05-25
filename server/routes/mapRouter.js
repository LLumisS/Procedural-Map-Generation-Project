const Router = require('express');
const router = new Router();
const mapController = require('../controllers/mapController');

router.post('/', mapController.create);
router.get('/', mapController.getShared);
router.delete('/', mapController.delete);

module.exports = router;