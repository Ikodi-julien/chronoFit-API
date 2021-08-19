const {Training} =require('../models');
const { options } = require('../models/category');

module.exports = {
  getAll: async (req, res) => {
    // #swagger.tags = ['Trainings']
    
    try {
      const trainings = await Training.findAll({
        include: ['category', 'creator', 'rounds']
      });
      res.json(trainings);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString())
    }
  },
  
  getOne: async(req, res) => {
    // #swagger.tags = ['Trainings']
    // #swagger.summary = 'Get one training'
    try {
      const training = await Training.findByPk(req.params.id, {
        include: ['category', 'creator', {
          association: 'rounds', 
          include: {
            association: 'exercices',
            include: {
              association: 'options',
              where: {
                trainingId: req.params.id,
              },
            },
          },
          }, {
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
    // #swagger.tags = ['Trainings']
    /*  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'JSON needed to update a result, all properties are mandatory',
    schema: {
        $name: "training name",
        $categoryId: "1",
        $userId: "1",
        $isBenchmark: "boolean",
      }
    } */
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
    // #swagger.tags = ['Trainings']
    /*  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'JSON needed to update a result, not all properties are mandatory',
    schema: {
        $name: "training name",
        $categoryId: "1",
        $userId: "1",
        $isBenchmark: "boolean",
      }
    } */    try {
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
    // #swagger.tags = ['Trainings']
    
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