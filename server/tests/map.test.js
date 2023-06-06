'use strict';

require('dotenv').config();

const uuid = require('uuid');
const path = require('path');

const { Map, SharedMap, SavedMap, Mark } = require('../models/models');
const mapController = require('../controllers/mapController');
const auth = require('../middleware/auth');

const getShared = mapController.getShared;
const getSaved = mapController.getSaved;

const shareNew = mapController.shareNew;
const shareOld = mapController.shareOld;

const saveNew = mapController.saveNew;
const saveOld = mapController.saveOld;

const rate = mapController.rate;

const deleteShared = mapController.deleteShared;
const deletedSaved = mapController.deleteSaved;

describe('GET Shares Test', () => {

});

describe('GET Saves Test', () => {

});

describe('POST Share Test', () => {

});

describe('POST Save Test', () => {

});

describe('POST Mark Test', () => {

});

describe('DELETE Share Test', () => {

});

describe('DELETE Save Test', () => {

});
