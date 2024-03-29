'use strict';

require('dotenv').config();

const { Map, SharedMap, SavedMap, Mark } = require('../models/models');
const ApiError = require('../error/ApiError');
const mapController = require('../controllers/mapController');
const auth = require('../middleware/auth');

const shareNew = mapController.shareNew;
const shareOld = mapController.shareOld;

const saveNew = mapController.saveNew;
const saveOld = mapController.saveOld;

const rate = mapController.rate;

describe('POST New Share Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should share a new map and return sharedMap in the response',
    async () => {
      const req = {
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
        .mockResolvedValue({ id: 1, matrix: 'filename.jpg' });
      const createSharedMapMock = jest
        .spyOn(SharedMap, 'create')
        .mockResolvedValue({ id: 1, mapId: 1, rating: null });

      await shareNew(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(createMapMock).toHaveBeenCalledTimes(1);
      expect(createSharedMapMock).toHaveBeenCalledTimes(1);
      expect(req.files.matrix.mv).toHaveBeenCalled();

      expect(res.json).toHaveBeenCalledWith(
        { sharedMap: { id: 1, mapId: 1, rating: null } }
      );
    });

  it('should return a bad request error if an exception occurs', async () => {
    const req = {
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

    await shareNew(req, res, next);

    expect(next).toHaveBeenCalledWith(ApiError.badRequest('Some error'));
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe('POST Old Share Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should share an old map and return sharedMap in the response',
    async () => {
      const req = {
        body: {
          mapId: 2,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      const findOneSharedMapMock = jest
        .spyOn(SharedMap, 'findOne').mockResolvedValue(null);
      const createSharedMapMock = jest
        .spyOn(SharedMap, 'create').mockResolvedValue(
          { id: 1, mapId: 2, rating: null }
        );

      await shareOld(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(findOneSharedMapMock).toHaveBeenCalledTimes(1);
      expect(createSharedMapMock).toHaveBeenCalledTimes(1);

      expect(res.json).toHaveBeenCalledWith({ id: 1, mapId: 2, rating: null });
    });

  it('should return a bad request error if mapId is not provided', async () => {
    const req = {
      body: {},
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    await shareOld(req, res, next);

    expect(next).toHaveBeenCalledWith(ApiError.badRequest('Map ID expected'));
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return a bad request error if the map is already shared',
    async () => {
      const req = {
        body: {
          mapId: 2,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      jest.spyOn(SharedMap, 'findOne').mockResolvedValue({ mapId: 2 });

      await shareOld(req, res, next);

      expect(next).toHaveBeenCalledWith(ApiError.badRequest('Already saved'));
      expect(res.json).not.toHaveBeenCalled();
    });

  it('should return a bad request error if an exception occurs', async () => {
    const req = {
      body: {
        mapId: 1,
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    jest.spyOn(SharedMap, 'findOne').mockRejectedValue(new Error('Some error'));

    await shareOld(req, res, next);

    expect(next).toHaveBeenCalledWith(ApiError.badRequest('Some error'));
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe('POST New Save Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save a new map and return savedMap in the response', async () => {
    const req = {
      body: {
        userId: 1,
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
      .mockResolvedValue({ id: 2, matrix: 'filename.jpg' });
    const createSavedMapMock = jest
      .spyOn(SavedMap, 'create')
      .mockResolvedValue({ id: 1, mapId: 2, userId: 1 });

    await saveNew(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(createMapMock).toHaveBeenCalledTimes(1);
    expect(createSavedMapMock).toHaveBeenCalledTimes(1);
    expect(req.files.matrix.mv).toHaveBeenCalled();

    expect(res.json)
      .toHaveBeenCalledWith({
        savedMap: { id: 1, mapId: 2, userId: 1 }
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
        userId: 1,
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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save an old map and return the savedMap in the response',
    async () => {
      const req = {
        body: {
          userId: 1,
          mapId: 1,
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
        .mockResolvedValue({ id: 1, mapId: 1, userId: 1 });

      await saveOld(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(findOneMock).toHaveBeenCalledTimes(1);
      expect(createSavedMapMock).toHaveBeenCalledTimes(1);

      expect(res.json).toHaveBeenCalledWith(
        { id: 1, mapId: 1, userId: 1 }
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
          userId: 1,
          mapId: 1,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      jest.spyOn(SavedMap, 'findOne')
        .mockResolvedValue({ id: 1, mapId: 1, userId: 1 });

      await saveOld(req, res, next);

      expect(next).toHaveBeenCalledWith(ApiError.badRequest('Already saved'));
      expect(res.json).not.toHaveBeenCalled();
    });

  it('should return a bad request error if an exception occurs', async () => {
    const req = {
      body: {
        userId: 1,
        mapId: 1,
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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new mark if it does not exist', async () => {
    const req = {
      body: {
        value: 4,
        userId: 1,
        sharedMapId: 2,
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    const findOneMarkMock = jest
      .spyOn(Mark, 'findOne').mockResolvedValueOnce(null);
    const createMarkMock = jest
      .spyOn(Mark, 'create').mockResolvedValueOnce(
        { value: 4, sharedMapId: 2, userId: 1 }
      );

    await rate(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(findOneMarkMock).toHaveBeenCalledTimes(1);
    expect(createMarkMock).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith(
      { mark: { value: 4, sharedMapId: 2, userId: 1 } }
    );
  });

  it('should update an existing mark if it exists', async () => {
    const req = {
      body: {
        value: 5,
        userId: 1,
        sharedMapId: 2,
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    let findOneMarkMock = jest
      .spyOn(Mark, 'findOne').mockResolvedValueOnce(
        { value: 4, sharedMapId: 2, userId: 1 }
      );
    const updateMarkMock = jest
      .spyOn(Mark, 'update').mockResolvedValueOnce(true);
    findOneMarkMock = jest
      .spyOn(Mark, 'findOne').mockResolvedValueOnce(
        { value: 5, sharedMapId: 2, userId: 1 }
      );

    await rate(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(findOneMarkMock).toHaveBeenCalledTimes(2);
    expect(updateMarkMock).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith(
      { mark: { value: 5, sharedMapId: 2, userId: 1 } }
    );
  });

  it('should return a bad request error if an exception occurs', async () => {
    const req = {
      body: {
        value: 5,
        userId: 1,
        sharedMapId: 2,
      },
    };

    const res = {
      json: jest.fn(),
    };

    const next = jest.fn();

    jest.spyOn(Mark, 'findOne').mockRejectedValue(new Error('Some error'));

    await rate(req, res, next);

    expect(next).toHaveBeenCalledWith(ApiError.badRequest('Some error'));
    expect(res.json).not.toHaveBeenCalled();
  });
});
