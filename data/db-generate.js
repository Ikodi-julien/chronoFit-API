const {
  Category,
  Training, 
  Exercice, 
  Role, 
  User, 
  TrainingDone,
  Result
} = require('../app/models');
const sequelize = require('../app/db');

const faker = require('faker');
faker.locale = 'fr';
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 2;

const categories = require('./categories');
const roles = require('./roles')
const avatarStd = require('./avatarStd');
const exercicesJson = require('./exercices.json');

// Create a db first and set DATABASE_URL in your .env before running this file

(async () => {
  try {
    await sequelize.sync({ force: true })

    // CATEGORY
    const categoriesSequelize = await Category.bulkCreate(categories);
    // ROLE
    const rolesSequelize = await Role.bulkCreate(roles);
    // EXERCICE
    const exercices = [];
    for (let index = 0; index < 20; index++) {
      const newExercice = await Exercice.create({
        name: exercicesJson[index]["titre_" + index],
        description: exercicesJson[index]["description_" + index],
        isBenchmark: false,
      })
      exercices.push(newExercice);
    }
    // USER
    const users = [];
    for (let index = 0; index < 5; index++) {
      const newUser = await User.create({
        pseudo: faker.internet.userName(),        
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        avatar: avatarStd,
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), SALT_ROUNDS),
      })
      users.push(newUser);
    }
    // ADD ROLE TO USER
    for (const user of users) {
      const authenticated = await Role.findOne({where: {id: 3}});
      await authenticated.addUser(user)
    }
    // TRAINING
    const trainings = [];
    for (let index = 0; index <5; index++) {
      const newTraining = await Training.create({
        name: faker.lorem.word(),
        isBenchmark: false,
      })
      trainings.push(newTraining);
    }
    // ADD CATEGORY AND USER TO TRAINING
    for (const training of trainings) {
      const category = await Category.findOne({where: {id: Math.floor(Math.random() * categoriesSequelize.length + 1)}});
      await category.addTraining(training);
      
      const user = await User.findOne({where: {id: Math.floor(Math.random() * users.length + 1) }});
      await training.setCreator(user);
    }
    // TRAINING-DONE
    const trainingsDone = [];
    for (let index = 0; index< 10; index++) {
      const newTrainingDone = await TrainingDone.create({
        duration: Math.floor(Math.random() * 2000)
      })
      trainingsDone.push(newTrainingDone);
    }
    // ADD USER AND TRAINING TO TRAININGDONE
    const trainingsDoneFull = [];
    for (const trainingDone of trainingsDone) {
      const user = await User.findOne({where: {id: Math.floor(Math.random() * users.length + 1) }});
      await trainingDone.setUser(user);
      
      const training = await Training.findOne({where: {id : Math.floor(Math.random() * trainings.length + 1)}});
      await trainingDone.setTraining(training);
      
      trainingsDoneFull.push(trainingDone);
    }
    // TRAINING-HAS-EXERCICE
    for (const training of trainings) {
      for (let index = 0; index < 5; index++) {
        await training.addExercice(Math.floor(Math.random() * exercices.length + 1))
      }
    }
    // RESULT
    // Un resultat pour chaque exercice de chaque training-done
    for (const trainingDone of trainingsDoneFull) {
      // Récupérer le training d'origine
      const originTraining = await Training.findOne({
        where: {
          id: trainingDone.trainingId
        },
        include: 'exercices'
      });
      // Récupérer les exos du training d'origine
      const exos = originTraining.exercices;
      // Pour chaque exo du training d'origine, créer un Result
      for (const exo of exos) {
        const newResult = await Result.create({
          duration:  Math.floor(Math.random() * 200),
          weight:  Math.floor(Math.random() * 20),
          reps:  Math.floor(Math.random() * 20),
        });
        // ADD USER
        await newResult.setUser(await User.findOne({where: {id: trainingDone.userId}}));
        // ADD EXERCICE ORIGIN
        await newResult.setExercice(await Exercice.findOne({where: {id: exo.id}}));
        // ADD TRAINING-DONE ORIGIN
        await newResult.setTrainingDoneOrigin(await TrainingDone.findOne({where: {id: trainingDone.id}}));
      }
    }
    console.log('C good !');
    
  } catch (err) {
    console.error('>> Error while creating: ', err)
  } finally {
    sequelize.close()
  }
})()
