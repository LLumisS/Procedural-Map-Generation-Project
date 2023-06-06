'use strict';

require('dotenv').config();

const uuid = require('uuid');
const path = require('path');

const { Map, SharedMap, SavedMap, Mark } = require('../models/models');
const ApiError = require('../error/ApiError');
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

describe('POST New Share Test', () => {

});

describe('POST Old Share Test', () => {

});

describe('POST New Save Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save a new map and return savedMap in the response', async () => {
    const req = {
      body: {
        userId: '1',
      },
      files: {
        matrix: {
          mv: jest.fn(),
        },
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    const createMapMock = jest
      .spyOn(Map, 'create')
      .mockResolvedValue({ id: '1', matrix: 'filename.jpg' });
    const createSavedMapMock = jest
      .spyOn(SavedMap, 'create')
      .mockResolvedValue({ id: '1', mapId: '1', userId: '1' });

    await saveNew(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(createMapMock).toHaveBeenCalledTimes(1);
    expect(createSavedMapMock).toHaveBeenCalledTimes(1);
    expect(req.files.matrix.mv).toHaveBeenCalled();

    expect(res.json)
      .toHaveBeenCalledWith({
        savedMap: { id: '1', mapId: '1', userId: '1' }
      });
  });

  it('should return a bad request error if userId is missing', async () => {
    const req = {
      body: {},
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    await saveNew(req, res, next);

    expect(next).toHaveBeenCalledWith(ApiError.badRequest('User ID expected'));
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return a bad request error if an exception occurs', async () => {
    const req = {
      body: {
        userId: '1',
      },
      files: {
        matrix: {
          mv: jest.fn(),
        },
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    jest.spyOn(Map, 'create').mockRejectedValue(new Error('Some error'));

    await saveNew(req, res, next);

    expect(next).toHaveBeenCalledWith(ApiError.badRequest('Some error'));
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe('POST Old Save Test', () => {
  it('should save an old map and return the savedMap in the response',
    async () => {
      const req = {
        body: {
          userId: '1',
          mapId: '1',
        },
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      const findOneMock = jest
        .spyOn(SavedMap, 'findOne')
        .mockResolvedValue(null);
      const createSavedMapMock = jest
        .spyOn(SavedMap, 'create')
        .mockResolvedValue({ id: '1', mapId: '1', userId: '1' });

      await saveOld(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(findOneMock).toHaveBeenCalledTimes(1);
      expect(createSavedMapMock).toHaveBeenCalledTimes(1);

      expect(res.json).toHaveBeenCalledWith(
        { id: '1', mapId: '1', userId: '1' }
      );
    });

  it('should return a bad request error if userId or mapId is missing',
    async () => {
      const req = {
        body: {},
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      await saveOld(req, res, next);

      expect(next).toHaveBeenCalledWith(
        ApiError.badRequest('User ID and Map ID expected'));
      expect(res.json).not.toHaveBeenCalled();
    });

  it('should return a bad request error if the map is already saved',
    async () => {
      const req = {
        body: {
          userId: '1',
          mapId: '1',
        },
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      jest.spyOn(SavedMap, 'findOne')
        .mockResolvedValue({ id: '1', mapId: '1', userId: '1' });

      await saveOld(req, res, next);

      expect(next).toHaveBeenCalledWith(ApiError.badRequest('Already saved'));
      expect(res.json).not.toHaveBeenCalled();
    });

  it('should return a bad request error if an exception occurs', async () => {
    const req = {
      body: {
        userId: '1',
        mapId: '1',
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    jest.spyOn(SavedMap, 'findOne')
      .mockRejectedValue(new Error('Some error'));

    await saveOld(req, res, next);

    expect(next).toHaveBeenCalledWith(ApiError.badRequest('Some error'));
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe('POST Mark Test', () => {

});

describe('DELETE Share Test', () => {

});

describe('DELETE Save Test', () => {

});
