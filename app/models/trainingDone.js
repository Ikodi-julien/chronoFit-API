const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class TrainingDone extends Model {};

TrainingDone.init({
  exoList: DataTypes.JSON
}, {
  sequelize,
  tableName: 'training_done'
})

module.exports = TrainingDone;