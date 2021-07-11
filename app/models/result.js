const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Result extends Model {};

Model.init({
  duration: DataTypes.INTEGER,
  weight: DataTypes.INTEGER,
  reps: DataTypes.INTEGER,
}, {
  sequelize,
  tableName: 'training'
})

module.exports = Result;