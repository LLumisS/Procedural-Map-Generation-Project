const { Map, Rating, Save, Mark } = require('../models/models');
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

    async getShared(req, res, next) {
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

    async share(req, res, next) {
        try {
            const { id, shared } = req.body;
            const condition = { where: { id: id } };
            await Map.update({ shared: shared }, condition);
            const map = await Map.findOne(condition);

            return res.json({ map });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async rate(req, res, next) {
        try {
            const { value, userId, mapId } = req.body;
            const condition = { where: { userId: userId, mapId: mapId } };
            let mark = await Mark.findOne(condition);
            if (mark) {
                await Mark.update({ value: value }, condition);
                mark = await Mark.findOne(condition);
            } else {
                mark = await Mark.create({ value: value, userId: userId, mapId: mapId});
            }
            
            return res.json({ mark });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async save(req, res, next) {
        try {
            const { userId, mapId } = req.body;
            const condition = {where: { userId: userId, mapId: mapId }};
            if(!mapId || !userId) {
                return next(ApiError.badRequest('User ID and Map ID expected'));
            }
            let save = await Save.findOne(condition);
            if(save) {
                return next(ApiError.badRequest('Already saved'));
            }
    
            save = await Save.create({ userId: userId, mapId: mapId });
            return res.json(save);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res) {

    }
}

module.exports = new MapController();
