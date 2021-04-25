const {TrainingDone} =require('../models');

module.exports = {
  getAll: async (req, res) => {
    
    try {
      const trainings = await TrainingDone.findAll({
        include: ['training_origin', 'user']
      });
      console
      res.json(trainings);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString())
    }
  },
  getOne: async(req, res) => {
    try {
      const training = await TrainingDone.findByPk(req.params.id);
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
      
      const {exoList, training_origin_id, user_id} = req.body;
      const bodyErrors = [];
      
      // TODO la vérif si le nom est déjà pris
      if (!exoList) bodyErrors.push('Il doit y avoir au moins un exercice');
      
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
        return
      }
      
      let newTraining = await TrainingDone.build({
        exoList,
        training_origin_id,
        user_id
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
      const {exoList, training_origin_id, user_id} = req.body;
      
      const training = await TrainingDone.findByPk(req.params.id);
      if (!training) {
        res.status(400).json(`Training with id: ${id} not found`);
        return;
      }
      
      training.exoList = exoList;
      training.training_origin_id = training_origin_id;
      training.user_id = user_id;
      
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