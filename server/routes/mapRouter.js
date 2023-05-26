const Router = require('express');
const router = new Router();
const mapController = require('../controllers/mapController');

router.post('/', mapController.create);
router.get('/shared', mapController.getShared);
router.get('/saved', mapController.getSaved);
router.post('/save', mapController.save);
router.post('/rate', mapController.rate);
router.post('/share', mapController.share);
router.delete('/', mapController.delete);

module.exports = router;