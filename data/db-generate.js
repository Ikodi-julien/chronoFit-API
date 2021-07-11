const {
  Category,
  Training, 
  Exercice, 
  Role, 
  User, 
  TrainingDone
  } = require('../app/models');
const sequelize = require('../app/db');

const faker = require('faker');
faker.locale = 'fr';
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 2;

const categories = require('./categories');
const roles = require('./roles')
const avatarStd = require('./avatarStd');
const Result = require('../app/models/result');

// Create a db first and set DATABASE_URL in your .env before running this file

(async () => {
  try {
    await sequelize.sync({ force: true })

    // CATEGORY
    const categoriesSequelize = await Category.bulkCreate(categories);

    // ROLE
    const rolesSequelize = await Role.bulkCreate(roles);
    
    // USER
    const users = [];
    for (let index = 0; index < 20; index++) {
      const newUser = await User.create({
        pseudo: faker.internet.userName(),        role_id: Math.floor(Math.random() * rolesSequelize.length + 1),
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        avatar: avatarStd,
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), SALT_ROUNDS),
        role: 3 // authenticated ?
      })
      users.push(newUser);
    }
    // TRAINING
    const trainings = [];
    for (let index = 0; index <5; index++) {
      const newTraining = await Training.create({
        userId: Math.floor(Math.random() * users.length + 1),
        categoryId: Math.floor(Math.random() * categoriesSequelize.length + 1),
        name: faker.lorem.word(),
        isBenchmark: false,
      })
      trainings.push(newTraining);
    }
    // EXERCICE
    const exercices = [];
    for (let index = 0; index < 20; index++) {
      const newExercice = await Exercice.create({
        name: faker.lorem.word(),
        description: faker.lorem.sentences(4),
        isBenchmark: false,
      })
      exercices.push(newExercice);
    }
    // TRAINING-DONE
    const trainingsDone = [];
    for (let index = 0; index< 10; index++) {
      const newTrainingDone = await TrainingDone.create({
        userId: Math.floor(Math.random() * users.length + 1),
        trainingId: Math.floor(Math.random() * trainings.length + 1),
        duration: Math.floor(Math.random() * 2000)
      })
      trainingsDone.push(newTrainingDone);
    }
    // TRAINING-HAS-EXERCICE
    for (const training of trainings) {
      for (let index = 0; index < 5; index++) {
        await training.addExercice(Math.floor(Math.random() * exercices.length + 1))
      }
    }
    // RESULT
    // Un resultat pour chaque exercice de chaque training-done
    for (const trainingDone of trainingsDone) {
      // Récupérer le training d'origine
      const originTraining = await Training.findByPk(trainingDone.dataValues.training.id);
      // Récupérer les exos du training d'origine
      const exos = originTraining.dataValues.exercices;
      // Pour chaque exo du training d'origine, créer un Result
      for (const exo of exos) {
        await Result.create({
          userId: trainingDone.dataValues.userId,
          exerciceId: exo.dataValues.id,
          trainingDoneId: trainingDone.dataValues.id,
          duration:  Math.floor(Math.random() * 200),
          weight:  Math.floor(Math.random() * 20),
          reps:  Math.floor(Math.random() * 20),
        })
      }
    }
    
  } catch (err) {
    console.error('>> Error while creating: ', err)
  } finally {
    sequelize.close()
  }
})()
