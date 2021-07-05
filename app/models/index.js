const Category = require('./category');
const Training = require('./training');
const Exercice = require('./exercice');
const Role = require('./role');
const User = require('./user');
const TrainingDone = require('./trainingDone');

/*-----------------------------------*/
Category.hasMany(Training, {
  as: 'trainings',
  foreignKey: 'category_id'
});

Training.belongsTo(Category, {
  as: 'category',
  foreignKey: 'category_id'
});

User.hasMany(Training, {
  as: 'trainings_created',
  foreignKey: 'creator_id'
});

Training.belongsTo(User, {
  as: 'creator',
  foreignKey: 'creator_id'
});

Training.hasMany(TrainingDone, {
  as: 'trainings_done',
  foreignKey: 'training_origin_id'
});

TrainingDone.belongsTo(Training, {
  as: 'training_origin',
  foreign_key: 'training_origin_id'
});

Role.hasMany(User, {
  as: 'users',
  foreignKey: 'role_id'
});

User.belongsTo(Role, {
  as: 'role',
  foreignKey: 'role_id'
});

User.hasMany(TrainingDone, {
  as: 'trainings_done',
  foreignKey: 'user_id'
});

TrainingDone.belongsTo(User, {
  as: 'done_by',
  foreignKey: 'user_id'
})
/*------------------------------------*/
module.exports = {
  Category,
  Training, 
  Exercice, 
  Role, 
  User, 
  TrainingDone
  };