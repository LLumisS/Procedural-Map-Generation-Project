'use strict';

const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login:    { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role:     { type: DataTypes.STRING }
});

const SavedMap = sequelize.define('saved_map', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Map = sequelize.define('map', {
  id:     { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  matrix: { type: DataTypes.STRING }
});

const SharedMap = sequelize.define('shared_map', {
  id:     { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.DOUBLE }
});

const Mark = sequelize.define('mark', {
  id:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.INTEGER, allowNull: false }
});

User.hasMany(SavedMap);
SavedMap.belongsTo(User);

User.hasMany(Mark);
Mark.belongsTo(User);

SharedMap.hasMany(Mark);
Mark.belongsTo(SharedMap);

Map.hasMany(SavedMap);
SavedMap.belongsTo(Map);

Map.hasMany(SharedMap);
SharedMap.belongsTo(Map);

module.exports = {
  User,
  SavedMap,
  Map,
  SharedMap,
  Mark
};
