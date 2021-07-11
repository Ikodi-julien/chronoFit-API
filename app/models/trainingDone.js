const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class TrainingDone extends Model {};

TrainingDone.init({
  duration: DataTypes.INTEGER
}, {
  sequelize,
  tableName: 'training_done'
})

module.exports = TrainingDone;