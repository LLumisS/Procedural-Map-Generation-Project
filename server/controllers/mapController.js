const {Map} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class MapController {
    async create(req, res, next) {
        try {
            const { shared } = req.body;
            const { matrix } = req.files;
            let fileName = uuid.v4() + ".jpg";
            matrix.mv(path.resolve(__dirname, '..', 'static', fileName));
    
            const map = await Map.create({matrix: fileName, shared: shared});
            return res.json(map);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getShared(req, res) {
        try {
            const maps = await Map.findAll({where: {shared: true}});
            return res.json(maps);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new MapController();
