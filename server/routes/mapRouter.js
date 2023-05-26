const Router = require('express');
const router = new Router();
const mapController = require('../controllers/mapController');

router.get('/shared', mapController.getShared);
router.get('/saved', mapController.getSaved);

router.post('/savenew', mapController.saveNew);
router.post('/saveold', mapController.saveOld);

router.post('/sharenew', mapController.shareNew);
router.post('/shareold', mapController.shareOld);

router.post('/rate', mapController.rate);

router.delete('/', mapController.delete);

module.exports = router;