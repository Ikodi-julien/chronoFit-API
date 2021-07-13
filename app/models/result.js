const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Result extends Model {};

Result.init({
  duration: DataTypes.INTEGER,
  weight: DataTypes.INTEGER,
  reps: DataTypes.INTEGER,
}, {
  sequelize,
  tableName: 'result'
})

module.exports = Result;