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

Training.belongsToMany(Exercice, {
  as: 'exercices',
  through: 'training_has_exercice',
  foreignKey: 'training_id',
  otherKey: 'exercice_id'
});

Exercice.belongsToMany(Training, {
  as: 'trainings',
  through: 'training_has_exercice',
  foreignKey: 'exercice_id',
  otherKey: 'training_id'
});

User.hasMany(Training, {
  as: 'trainings_created',
  foreignKey: 'creator_id'
});

Training.belongsTo(User, {
  as: 'creator',
  foreignKey: 'creator_id'
});

Training.belongsToMany(User, {
  as: 'done_by',
  through: 'user_has_training',
  foreignKey: 'training_id',
  otherKey: 'user_id'
})

User.belongsToMany(Training, {
  as: 'trainings',
  through: 'user_has_training',
  foreignKey: 'user_id',
  otherKey: 'training_id'
})

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
  as: 'user',
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