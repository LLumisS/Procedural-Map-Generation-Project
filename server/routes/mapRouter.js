'use strict';

const Router = require('express');
const router = new Router();
const mapController = require('../controllers/mapController');
const auth = require('../middleware/auth');

router.get('/shared', mapController.getShared);
router.get('/saved', mapController.getSaved);

router.post('/savenew', mapController.saveNew);
router.post('/saveold', mapController.saveOld);

router.post('/sharenew', mapController.shareNew);
router.post('/shareold', mapController.shareOld);

router.post('/rate', mapController.rate);

router.delete('/saved', mapController.deleteSaved);
router.delete('/shared', auth('admin'), mapController.deleteShared);

module.exports = router;
