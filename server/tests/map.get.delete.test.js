'use strict';

require('dotenv').config();

const { Map, SharedMap, SavedMap, Mark } = require('../models/models');
const ApiError = require('../error/ApiError');
const mapController = require('../controllers/mapController');
const auth = require('../middleware/auth');

const getShared = mapController.getShared;
const getSaved = mapController.getSaved;

const deleteShared = mapController.deleteShared;
const deletedSaved = mapController.deleteSaved;

describe('GET Shares Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of shared maps with ratings and marks', async () => {
    const req = {
      query: {
        userId: 1,
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    const findAllSharedMapMock = jest
      .spyOn(SharedMap, 'findAll').mockResolvedValue([
        { id: 1, mapId: 1, rating: null },
        { id: 2, mapId: 2, rating: null },
      ]);

    const findAllMarksMock = jest
      .spyOn(Mark, 'findAll').mockResolvedValue([
        { id: 1, value: 5, userId: 1 },
        { id: 2, value: 4, userId: 2 },
      ]);

    const updateSharedMapMock = jest
      .spyOn(SharedMap, 'update')
      .mockResolvedValue(null);

    const findAndCountAllSharedMapMock = jest
      .spyOn(SharedMap, 'findAndCountAll')
      .mockResolvedValue({ rows: [
        { id: 1, mapId: 1, rating: 4.5 },
        { id: 2, mapId: 2, rating: 4.5 },
      ], count: 2 });

    const findAllMapMock = jest
      .spyOn(Map, 'findAll')
      .mockResolvedValue([
        { id: 1, matrix: 'filename.jpg' },
        { id: 2, matrix: 'filename.jpg' },
      ]);

    const findOneMarkMock = jest
      .spyOn(Mark, 'findOne')
      .mockResolvedValue({ value: 5 });

    await getShared(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(findAllSharedMapMock).toHaveBeenCalledTimes(1);
    expect(updateSharedMapMock).toHaveBeenCalledTimes(2);
    expect(findAndCountAllSharedMapMock).toHaveBeenCalledTimes(1);
    expect(findAllMapMock).toHaveBeenCalledTimes(1);
    expect(findAllMarksMock).toHaveBeenCalledTimes(2);
    expect(findOneMarkMock).toHaveBeenCalledTimes(2);

    expect(res.json).toHaveBeenCalledWith({
      count: 2,
      rows: [
        {
          id: 1,
          rating: 4.5,
          createdAt: undefined,
          updatedAt: undefined,
          mapId: 1,
          matrix: 'filename.jpg',
          mark: 5,
        },
        {
          id: 2,
          rating: 4.5,
          createdAt: undefined,
          updatedAt: undefined,
          mapId: 2,
          matrix: 'filename.jpg',
          mark: 5,
        },
      ],
    });
  });

  it('should return a bad request error if an exception occurs', async () => {
    const req = {
      query: {
        userId: 1,
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    jest.spyOn(SharedMap, 'findAll').mockRejectedValue(new Error('Some error'));

    await getShared(req, res, next);

    expect(next).toHaveBeenCalledWith(ApiError.badRequest('Some error'));
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe('GET Saves Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of saved maps', async () => {
    const req = {
      query: {
        id: 1,
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    const findAllSavedMapMock = jest
      .spyOn(SavedMap, 'findAll').mockResolvedValue([
        { id: 1, mapId: 2, userId: 1 },
        { id: 5, mapId: 4, userId: 1 },
      ]);

    const findAndCountAllMapMock = jest
      .spyOn(Map, 'findAndCountAll').mockResolvedValue({
        count: 2,
        rows: [
          { id: 2, matrix: 'testfile1.jpg' },
          { id: 4, matrix: 'testfile2.jpg' },
        ],
      });

    await getSaved(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(findAllSavedMapMock).toHaveBeenCalledTimes(1);
    expect(findAndCountAllMapMock).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith({
      maps: {
        count: 2,
        rows: [
          { id: 2, matrix: 'testfile1.jpg' },
          { id: 4, matrix: 'testfile2.jpg' },
        ],
      },
    });
  });

  it('should return a bad request error if an exception occurs', async () => {
    const req = {
      query: {
        id: 1,
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    jest.spyOn(SavedMap, 'findAll').mockRejectedValue(new Error('Some error'));

    await getSaved(req, res, next);

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
