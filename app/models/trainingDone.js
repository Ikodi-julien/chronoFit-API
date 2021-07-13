const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class TrainingDone extends Model {};

TrainingDone.init({
  duration: DataTypes.INTEGER
}, {
  sequelize,
  tableName: 'trainingDone'
})

module.exports = TrainingDone;