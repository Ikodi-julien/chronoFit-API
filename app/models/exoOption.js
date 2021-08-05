const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class ExoOption extends Model {};

ExoOption.init({
  iteration: DataTypes.INTEGER,
  duration: DataTypes.INTEGER,
  weight: DataTypes.INTEGER,
  reps: DataTypes.INTEGER,
}, {
  sequelize,
  tableName: 'exooption'
})

module.exports = ExoOption;