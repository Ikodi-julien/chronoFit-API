const {TrainingDone} =require('../models');

module.exports = {
  getAll: async (req, res) => {
    
    try {
      const trainings = await TrainingDone.findAll({
        include: ['by', {
          association: 'training',
          include: 'exercices'}]
      });
      res.json(trainings);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString())
    }
  },
  getOne: async(req, res) => {
    try {
      const training = await TrainingDone.findByPk(req.params.id, {
        include: ['by', {
          association: 'results',
          includes: 'exercice'
        }, {
          association: 'training',
          include: 'exercices'}]
      });
      
      if (!training) {
        res.status(400).json(`TrainingDone with id: ${req.params.id} not found`);
        return;
      }
      res.json(training);
      
    }catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  create: async (req, res) => {
    try {
      
      const {userId, trainingId, duration} = req.body;
      const bodyErrors = [];
      
      // TODO la vérif si le nom est déjà pris
      if (!userId) bodyErrors.push('user id needed');
      if (!trainingId) bodyErrors.push('training id needed');
      if (!duration) bodyErrors.push('duration needed');
      
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
        return
      }
      
      let newTraining = await TrainingDone.build({
        userId, trainingId, duration
      })
      
      await newTraining.save();
      res.json(newTraining);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  update: async (req, res) => {
    
    try {
      const {userId, trainingId, duration} = req.body;
      
      const training = await TrainingDone.findByPk(req.params.id);
      if (!training) {
        res.status(400).json(`Training with id: ${id} not found`);
        return;
      }
      
      training.userId = userId;
      training.trainingId = trainingId;
      training.duration = duration;
      
      await training.save();
      res.json(training);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  delete: async (req, res) => {
    
    try {
      
      const training = await TrainingDone.findByPk(req.params.id);
      await training.destroy();
      res.json('Training destroyed');
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  }
}