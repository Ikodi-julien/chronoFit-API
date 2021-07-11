const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Training extends Model {};

Model.init({
  name: DataTypes.TEXT,
  isBenchmark: DataTypes.BOOLEAN,
}, {
  sequelize,
  tableName: 'training'
})

module.exports = Training;