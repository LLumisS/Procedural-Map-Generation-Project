const { Map, SavedMap, SharedMap, Mark } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class MapController {
    async saveNew(req, res, next) {
        try {
            const { userId } = req.body;
            if(!userId) {
                return next(ApiError.badRequest('User ID and Map ID expected'));
            }
            const { matrix } = req.files;
            let fileName = uuid.v4() + ".jpg";
            matrix.mv(path.resolve(__dirname, '..', 'static', fileName));

            const map = await Map.create({matrix: fileName});
            const mapId = map.id;
            const savedMap = await SavedMap.create({mapId: mapId, userId: userId});

            return res.json({ savedMap });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async saveOld(req, res, next) {
        try {
            const { userId, mapId } = req.body;
            if(!mapId || !userId) {
                return next(ApiError.badRequest('User ID and Map ID expected'));
            }
            let savedMap = await SavedMap.findOne({where: { userId: userId, mapId: mapId }});
            if(savedMap) {
                return next(ApiError.badRequest('Already saved'));
            }
    
            savedMap = await SavedMap.create({ userId: userId, mapId: mapId });
            return res.json(savedMap);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async shareNew(req, res, next) {
        try {
            const { matrix } = req.files;
            let fileName = uuid.v4() + ".jpg";
            matrix.mv(path.resolve(__dirname, '..', 'static', fileName));

            const map = await Map.create({matrix: fileName});
            const mapId = map.id;
            const sharedMap = await SharedMap.create({mapId: mapId});

            return res.json({ sharedMap });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async shareOld(req, res, next) {
        try {
            const { mapId } = req.body;
            if(!mapId) {
                return next(ApiError.badRequest('User ID and Map ID expected'));
            }
            let sharedMap = await SharedMap.findOne({where: { mapId: mapId }});
            if(sharedMap) {
                return next(ApiError.badRequest('Already saved'));
            }
    
            sharedMap = await SharedMap.create({ mapId: mapId });
            return res.json(sharedMap);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getShared(req, res, next) {
        try {
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 5;
            let offset = (page - 1) * limit;

            const sharedMap = await SharedMap.findAndCountAll({ limit, offset });
            return res.json(sharedMap);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getSaved(req, res, next) {
        try {
            let { id, limit, page } = req.query;
            if(!id) {
                return next(ApiError.badRequest('User ID expected'));
            }
            page = page || 1;
            limit = limit || 5;
            let offset = (page - 1) * limit;

            const saved = await SavedMap.findAll({ where: { userId: id }, limit, offset });
            const savedId = saved.map(element => element.mapId);
            const maps = await Map.findAndCountAll({ where: { id: savedId }, limit, offset });

            return res.json({ maps });
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

    async delete(req, res) {

    }
}

module.exports = new MapController();
