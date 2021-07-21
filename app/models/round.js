const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Round extends Model {}

Round.init({
  iteration: DataTypes.INTEGER,
  duration: DataTypes.INTEGER,
}, {
  sequelize,
  tableName: 'round'
})

module.exports = Round;