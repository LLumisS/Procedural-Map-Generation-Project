'use strict';

const { Map, SavedMap, SharedMap, Mark } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

async function deleteMap(mapToDelete, mapToCheck, next, mapId, userId) {
  const condition = userId ? { userId, mapId } : { mapId };
  const deletedMap = await mapToDelete.destroy({ where: condition });

  if (!deletedMap) {
    next(ApiError.badRequest('Map not found'));
  }

  const used = await mapToCheck.findOne({ where: { mapId } });
  if (!used) {
    await Map.destroy({ where: { id: mapId } });
  }

  return deletedMap;
}

class MapController {
  async saveNew(req, res, next) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return next(ApiError.badRequest('User ID expected'));
      }
      const { matrix } = req.files;
      const fileName = uuid.v4() + '.jpg';
      matrix.mv(path.resolve(__dirname, '..', 'static', fileName));

      const map = await Map.create({ matrix: fileName });
      const mapId = map.id;
      const savedMap = await SavedMap.create({ mapId, userId });

      return res.json({ savedMap });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async saveOld(req, res, next) {
    try {
      const { userId, mapId } = req.body;
      if (!mapId || !userId) {
        return next(ApiError.badRequest('User ID and Map ID expected'));
      }
      let savedMap = await SavedMap.findOne({ where: { userId, mapId } });
      if (savedMap) {
        return next(ApiError.badRequest('Already saved'));
      }

      savedMap = await SavedMap.create({ userId, mapId });
      return res.json(savedMap);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async shareNew(req, res, next) {
    try {
      const { matrix } = req.files;
      const fileName = uuid.v4() + '.jpg';
      matrix.mv(path.resolve(__dirname, '..', 'static', fileName));

      const map = await Map.create({ matrix: fileName });
      const mapId = map.id;
      const sharedMap = await SharedMap.create({ mapId });

      return res.json({ sharedMap });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async shareOld(req, res, next) {
    try {
      const { mapId } = req.body;
      if (!mapId) {
        return next(ApiError.badRequest('Map ID expected'));
      }
      let sharedMap = await SharedMap.findOne({ where: { mapId } });
      if (sharedMap) {
        return next(ApiError.badRequest('Already saved'));
      }

      sharedMap = await SharedMap.create({ mapId });
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
      const offset = (page - 1) * limit;

      const shared = await SharedMap.findAll();
      const sharedIds = shared.map(element => element.id);
      for (const id of sharedIds) {
        const marks = await Mark.findAll({ where: { sharedMapId: id } });
        let sum = 0;
        let n = 0;
        for (const mark of marks) {
          sum += mark.value;
          n++;
        }
        const rating = n ? sum / n : 0;
        await SharedMap.update({ rating }, { where: { id } });
      }

      const sharedMap = await SharedMap.findAndCountAll({ limit, offset });
      return res.json(sharedMap);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getSaved(req, res, next) {
    try {
      const { id } = req.query;
      let { limit, page } = req.query;
      if (!id) {
        return next(ApiError.badRequest('User ID expected'));
      }
      page = page || 1;
      limit = limit || 5;
      const offset = (page - 1) * limit;

      const saved = await SavedMap.findAll({
        where: { userId: id }, limit, offset
      });
      const savedId = saved.map(element => element.mapId);
      const maps = await Map.findAndCountAll({
        where: { id: savedId }, limit, offset
      });

      return res.json({ maps });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async rate(req, res, next) {
    try {
      const { value, userId, sharedMapId } = req.body;
      const condition = { where: { userId, sharedMapId } };
      let mark = await Mark.findOne(condition);
      if (mark) {
        await Mark.update({ value }, condition);
        mark = await Mark.findOne(condition);
      } else {
        mark = await Mark.create({ value, userId, sharedMapId });
      }

      return res.json({ mark });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteSaved(req, res, next) {
    try {
      const { userId, mapId } = req.body;

      const deletedMap = await deleteMap(
        SavedMap, SharedMap, next, mapId, userId
      );

      return res.json({ deletedMap });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteShared(req, res, next) {
    try {
      const { mapId } = req.body;

      const deletedMap = await deleteMap(SharedMap, SavedMap, next, mapId, 0);

      await Mark.destroy({ where: { mapId } });

      return res.json({ deletedMap });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new MapController();
