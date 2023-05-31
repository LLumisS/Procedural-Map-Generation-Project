'use strict';

const { User } = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, role) => jwt.sign(
  { id, role },
  process.env.SECRET_KEY,
  { expiresIn: '24h' },
);

class UserController {
  async get(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json({ users });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async registration(req, res, next) {
    const { login, password, role } = req.body;
    if (!login || !password || !role) {
      return next(ApiError.badRequest('User data expected'));
    }

    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      return next(ApiError.badRequest('User already signed up'));
    }

    const rounds = 5;
    const hashPassword = await bcrypt.hash(password, rounds);
    const user = await User.create({ login, password: hashPassword, role });

    const token = generateJwt(user.id, user.role);

    return res.json({ token });
  }

  async login(req, res) {

  }

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest('User ID expected'));
    }
    res.json(id);
  }
}

module.exports = new UserController();
