const { Map, Rating, Save } = require('../models/models');
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
            const rating = await Rating.findAll();
            return res.json({ maps, rating });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getSaved(req, res, next) {
        try {
            const { id } = req.query;
            if(!id) {
                return next(ApiError.badRequest('User ID expected'));
            }

            const saved = await Save.findAll({ where: { userId: id } });
            const savedId = saved.map(element => element.mapId);
            const maps = await Map.findAll({ where: { id: savedId } });

            return res.json({ maps });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res) {

    }
}

module.exports = new MapController();
