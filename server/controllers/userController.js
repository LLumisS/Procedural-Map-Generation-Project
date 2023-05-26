const { User } = require('../models/models');
const ApiError = require('../error/ApiError');

class UserController {
    async get (req, res, next) {
        try {
            const users = await User.findAll();
            return res.json({ users });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async registration(req, res, next) {
        try {
        const { login, password } = req.body;
        if(!login || !password) {
            return next(ApiError.badRequest('User data expected'));
        }

        const user = await User.create({ login: login, password: password });
        return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res) {
        
    }

    async check(req, res, next) {
        const {id} = req.query;
        if(!id) {
            return next(ApiError.badRequest('User ID expected'));
        }
        res.json(id);
    }
}

module.exports = new UserController();
