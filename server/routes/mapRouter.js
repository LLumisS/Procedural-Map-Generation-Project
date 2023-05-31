'use strict';

const Router = require('express');
const router = new Router();
const mapController = require('../controllers/mapController');
const checkRole = require('../middleware/checkRole');

router.get('/shared', mapController.getShared);
router.get('/saved', mapController.getSaved);

router.post('/savenew', mapController.saveNew);
router.post('/saveold', mapController.saveOld);

router.post('/sharenew', mapController.shareNew);
router.post('/shareold', mapController.shareOld);

router.post('/rate', mapController.rate);

router.delete('/saved', mapController.deleteSaved);
router.delete('/shared', checkRole('admin'), mapController.deleteShared);

module.exports = router;
