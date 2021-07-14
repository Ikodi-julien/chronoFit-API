const {Training} =require('../models');

module.exports = {
  getAll: async (req, res) => {
    
    try {
      const trainings = await Training.findAll({
        include: ['category', 'creator', 'exercices']
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
      const training = await Training.findByPk(req.params.id, {
        include: ['category', 'creator', 'exercices', 
        {
          association: 'trainingsDoneChild',
          include: {
            association: 'results',
            include: ['exercice']
          }
        }]
      });
      
      if (!training) {
        res.status(400).json(`Training with id: ${req.params.id} not found`);
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
      
      const {name, isBenchmark, categoryId, userId} = req.body;
      const bodyErrors = [];
      
      // TODO la vérif si le nom est déjà pris
      if (!name) bodyErrors.push('name can\'t be empty');
      if (!userId) bodyErrors.push('userId is needed');
      if (!categoryId) bodyErrors.push('Category id needed');
      
      if (bodyErrors.length) return res.status(400).json(bodyErrors);
      
      let newTraining = await Training.build({
        name,
        isBenchmark,
        userId,
        categoryId
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
      const {name, exoList, isBenchmark, creator_id, category_id} = req.body;
      
      const training = await Training.findByPk(req.params.id);
      if (!training) {
        res.status(400).json(`Training with id: ${id} not found`);
        return;
      }
      
      training.name = name;
      training.exoList = exoList;
      training.isBenchmark = isBenchmark;
      training.creator_id = creator_id;
      training.category_id = category_id;
      
      await training.save();
      res.json(training);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  delete: async (req, res) => {
    
    try {
      
      const training = await Training.findByPk(req.params.id);
      await training.destroy();
      res.json('Training destroyed');
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  }
}