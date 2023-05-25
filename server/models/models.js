const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id:       {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login:    {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
});

const Map = sequelize.define('map', {
    id:     {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    shared: {type: DataTypes.BOOLEAN, defaultValue: false}

});

const Matrix = sequelize.define('matrix', {
    id:          {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    physical:    {type: DataTypes.STRING, unique: true},
    moisture:    {type: DataTypes.STRING, unique: true},
    temperature: {type: DataTypes.STRING, unique: true},
    bioms:       {type: DataTypes.STRING, unique: true}
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

User.hasMany(Map);
Map.belongsTo(User);

User.hasMany(Mark);
Mark.belongsTo(User);

User.hasMany(Save);
Save.belongsTo(User);

Map.hasMany(Mark);
Mark.belongsTo(Map);

Map.hasMany(Save);
Save.belongsTo(Map);

Matrix.hasOne(Map);
Map.belongsTo(Matrix);

Map.hasOne(Rating);
Rating.belongsTo(Map);

module.exports = {
    User,
    Map,
    Matrix,
    Mark,
    Rating,
    Save
}