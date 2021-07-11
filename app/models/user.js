const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class User extends Model {};

User.init({
  pseudo: DataTypes.TEXT,
  firstname: DataTypes.TEXT,
  lastname: DataTypes.TEXT,
  password: DataTypes.TEXT,
  email: DataTypes.TEXT,
}, {
  sequelize,
  tableName: 'user'
})

module.exports = User;