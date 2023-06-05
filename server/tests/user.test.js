'use strict';

require('dotenv').config();
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models/models');
const userRouter = require('../routes/userRouter');
const errorHandler = require('../middleware/errorHandler');
const sequelize = require('../db');

const app = express();
app.use(express.json());
app.use('/user', userRouter);

app.use(errorHandler);

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync();
});

describe('Registration Test', () => {
  const user = {
    login: 'testuser',
    password: 'newpassword',
    role: 'user',
  };

  afterAll(async () => {
    await User.destroy({ where: { login: 'testuser' } });
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/user/registration')
      .send(user)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  it('should return an error for missing user data', async () => {
    const response = await request(app)
      .post('/user/registration')
      .send({})
      .expect(404);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User data expected');
  });

  it('should return an error for already registered user', async () => {
    const response = await request(app)
      .post('/user/registration')
      .send(user)
      .expect(404);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User already signed up');
  });
});

describe('Login Test', () => {
  const user = {
    login: 'testuser',
    password: 'newpassword',
    role: 'user',
  };

  beforeAll(async () => {
    await request(app)
      .post('/user/registration')
      .send(user)
      .expect(200);
  });

  afterAll(async () => {
    await User.destroy({ where: { login: 'testuser' } });
  });

  it('should return a token for a successful login', async () => {
    const response = await request(app)
      .post('/user/login')
      .send(user)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  it('should return an error for missing user data', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({})
      .expect(404);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User data expected');
  });

  it('should return an error for an incorrect password', async () => {
    const incorrectUser = {
      login: 'testuser',
      password: 'incorrectpassword'
    };

    const response = await request(app)
      .post('/user/login')
      .send(incorrectUser)
      .expect(404);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Incorrect password');
  });

  it('should return an error for a non-existent user', async () => {
    const incorrectUser = {
      login: 'nonexistentuser',
      password: 'newpassword'
    };

    const response = await request(app)
      .post('/user/login')
      .send(incorrectUser)
      .expect(404);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User not found');
  });
});

describe('Check Test', () => {
  it('should return a token for a valid user', async () => {
    const user = {
      id: 1,
      role: 'admin',
    };

    const id = 1;
    const role = 'admin';

    const response = await request(app)
      .get('/user/auth')
      .set('Authorization', `Bearer ${jwt.sign(
        { id, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' },
      )}`)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  it('should return an error for an invalid or missing token', async () => {
    const response = await request(app)
      .get('/user/auth')
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Not authorized');
  });
});
