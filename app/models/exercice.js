const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Exercice extends Model {};

Exercice.init({
  name: DataTypes.TEXT,
  description: DataTypes.TEXT,
  isBenchmark: DataTypes.BOOLEAN,
  
}, {
  sequelize,
  tableName: "exercice"
})

module.exports = Exercice;