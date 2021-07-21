const Category = require('./category');
const Training = require('./training');
const Round = require('./round');
const Exercice = require('./exercice');
const Role = require('./role');
const User = require('./user');
const TrainingDone = require('./trainingDone');
const Result = require('./result');

/*-----------------------------------*/
Category.hasMany(Training, {
  as: 'trainings',
  foreignKey: 'categoryId'
});

Training.belongsTo(Category, {
  as: 'category',
  foreignKey: 'categoryId'
});
/*---------------------------------*/
Training.hasMany(Round, {
  foreignKey: 'trainingId',
  as: 'rounds',
});
Round.belongsTo(Training, {
  foreignKey: 'trainingId',
  as: 'training',
});
/*---------------------------------*/
Round.belongsToMany(Exercice, {
  foreignKey: 'roundId',
  otherKey: 'exerciceId',
  as: 'exercices',
  through: 'round_has_exercices'
});
Exercice.belongsToMany(Round, {
  foreignKey: 'exerciceId',
  otherKey: 'roundId',
  as: 'rounds',
  through: 'round_has_exercices'
});
/*----------------------------------*/
Exercice.hasMany(Result, {
  foreignKey: 'exerciceId',
  as: 'results'
})
Result.belongsTo(Exercice, {
  foreignKey: 'exerciceId',
  as: 'exercice'
})
/*--------------------------------*/

Training.hasMany(TrainingDone, {
  as: 'trainingsDoneChild',
  foreignKey: 'trainingId'
});
TrainingDone.belongsTo(Training, {
  as: 'training',
  foreign_key: 'trainingId'
});

/*----------------------------------*/
User.hasMany(Training, {
  as: 'createdTrainings',
  foreignKey: 'userId'
});

Training.belongsTo(User, {
  as: 'creator',
  foreignKey: 'userId'
});
/*------------------------------------*/
User.hasMany(Result, {
  foreignKey: 'userId',
  as: 'results'
})
Result.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})
/*-----------------------------------*/
Role.hasMany(User, {
  as: 'users',
  foreignKey: 'roleId'
});

User.belongsTo(Role, {
  as: 'role',
  foreignKey: 'roleId'
});
/*----------------------------------*/
User.hasMany(TrainingDone, {
  as: 'trainingsDone',
  foreignKey: 'userId'
});

TrainingDone.belongsTo(User, {
  as: 'by',
  foreignKey: 'userId'
})
/*----------------------------------*/
TrainingDone.hasMany(Result, {
  as: 'results',
  foreignKey: 'trainingDoneId'
});
Result.belongsTo(TrainingDone, {
  as: 'trainingDoneOrigin',
  foreignKey: 'trainingDoneId'
})
/*------------------------------------*/
module.exports = {
  Category,
  Training, 
  Round,
  Exercice, 
  Role, 
  User, 
  TrainingDone,
  Result
  };