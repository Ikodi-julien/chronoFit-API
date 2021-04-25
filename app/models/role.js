const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Role extends Model {};

Role.init({
  name: DataTypes.TEXT,
  
}, {
  sequelize,
  tableName: 'role'
})

module.exports = Role;