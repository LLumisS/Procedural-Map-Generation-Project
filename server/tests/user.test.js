'use strict';

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/models');
const ApiError = require('../error/ApiError');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const registration = userController.registration;
const login = userController.login;
const check = userController.check;

jest.mock('bcrypt', () => ({
  hash: jest.fn((password, rounds) => Promise.resolve(`hashed:${password}`)),
  compareSync: jest.fn(),
}));

describe('Registration Test', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        login: 'testuser',
        password: 'newpassword',
        role: 'user',
      },
    };
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user and return a token', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    User.create = jest.fn().mockResolvedValue({
      id: 1,
      login: 'testuser',
      role: 'user',
    });
    const generateJwtMock = jest
      .spyOn(jwt, 'sign')
      .mockReturnValue('testtoken');

    await registration(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ where: { login: 'testuser' } });
    expect(User.create).toHaveBeenCalledWith({
      login: 'testuser',
      password: 'hashed:newpassword',
      role: 'user',
    });
    expect(generateJwtMock).toHaveBeenCalledWith(
      { id: 1, role: 'user' },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
    expect(res.json).toHaveBeenCalledWith({ token: 'testtoken' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return an error for missing user data', async () => {
    req.body = {};

    await registration(req, res, next);

    expect(User.findOne).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      ApiError.badRequest('User data expected')
    );
  });

  it('should return an error for already registered user', async () => {
    User.findOne = jest.fn().mockResolvedValue({});

    await registration(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ where: { login: 'testuser' } });
    expect(User.create).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      ApiError.badRequest('User already signed up')
    );
  });
});

describe('Login Test', () => {
  const user = {
    id: 1,
    login: 'testuser',
    password: 'hashed:newpassword',
    role: 'user',
  };

  const generateJwtMock = jest.spyOn(jwt, 'sign').mockReturnValue('testtoken');
  const compareSyncMock = jest.spyOn(bcrypt, 'compareSync');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a token for a successful login', async () => {
    const findOneMock = jest
      .spyOn(User, 'findOne')
      .mockResolvedValue(user);
    compareSyncMock.mockReturnValue(true);

    const req = {
      body: {
        login: 'testuser',
        password: 'newpassword',
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await login(req, res, next);

    expect(findOneMock).toHaveBeenCalledWith({ where: { login: 'testuser' } });
    expect(compareSyncMock).toHaveBeenCalledWith('newpassword', user.password);
    expect(generateJwtMock).toHaveBeenCalledWith(
      { id: 1, role: 'user' },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
    expect(res.json).toHaveBeenCalledWith({ token: 'testtoken' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return an error for missing user data', async () => {
    const req = {
      body: {},
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(
      ApiError.badRequest('User data expected'));
  });

  it('should return an error for user not found', async () => {
    const findOneMock = jest.spyOn(User, 'findOne').mockResolvedValue(null);

    const req = {
      body: {
        login: 'testuser',
        password: 'newpassword',
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await login(req, res, next);

    expect(findOneMock).toHaveBeenCalledWith({ where: { login: 'testuser' } });
    expect(next).toHaveBeenCalledWith(ApiError.badRequest('User not found'));
  });

  it('should return an error for incorrect password', async () => {
    const findOneMock = jest
      .spyOn(User, 'findOne')
      .mockResolvedValue(user);
    compareSyncMock.mockReturnValue(false);

    const req = {
      body: {
        login: 'testuser',
        password: 'wrongpassword',
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await login(req, res, next);

    expect(findOneMock).toHaveBeenCalledWith({ where: { login: 'testuser' } });
    expect(compareSyncMock)
      .toHaveBeenCalledWith('wrongpassword', user.password);
    expect(next).toHaveBeenCalledWith(
      ApiError.badRequest('Incorrect password'));
  });
});

describe('Check Test', () => {
  const user = {
    id: 1,
    login: 'testuser',
    role: 'user',
  };

  const generateJwtMock = jest.spyOn(jwt, 'sign').mockReturnValue('testtoken');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a token for a valid user', async () => {
    const req = {
      user,
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await check(req, res, next);

    expect(generateJwtMock).toHaveBeenCalledWith(
      { id: 1, role: 'user' },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
    expect(res.json).toHaveBeenCalledWith({ token: 'testtoken' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return an error for an invalid or missing token', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = check;

    await auth()(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized' });
  });
});
