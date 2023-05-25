const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id:       {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login:    {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
});

const Map = sequelize.define('map', {
    id:     {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    matrix: {type: DataTypes.STRING},
    shared: {type: DataTypes.BOOLEAN}
});

const Mark = sequelize.define('mark', {
    id:    {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.INTEGER, allowNull: false}
});

const Rating = sequelize.define('rating', {
    id:    {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.DOUBLE}
});

const Save = sequelize.define('save', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

User.hasMany(Mark);
Mark.belongsTo(User);

User.hasMany(Save);
Save.belongsTo(User);

Map.hasMany(Mark);
Mark.belongsTo(Map);

Map.hasMany(Save);
Save.belongsTo(Map);

Map.hasOne(Rating);
Rating.belongsTo(Map);

module.exports = {
    User,
    Map,
    Mark,
    Rating,
    Save
}