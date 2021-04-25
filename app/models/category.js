const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Category extends Model {};

Category.init({
  name: DataTypes.TEXT,
  
}, {
  sequelize,
  tableName: 'category'
})

module.exports = Category;