const {Exercice} = require('../models');

module.exports = {
  getAll: async (req, res) => {
    // #swagger.tags = ['Exercices']
    // #swagger.summary = 'Get all exercices'

    try {
      const exercices = await Exercice.findAll();
      res.json(exercices);
      console.log(exercices);

    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOne: async (req, res) => {
    // #swagger.tags = ['Exercices']
    // #swagger.summary = 'Get one exercice'

    const id = req.params.id;
    
    try {
      const exercice = await Exercice.findByPk(id);

      exercice ? res.json(exercice) : res.status(400).send(`Can't find Exercice with id: ${id}`);

    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },

  create: (req, res) => {
    // #swagger.tags = ['Exercices']
    // #swagger.summary = 'Creates one exercice'
    /*  #swagger.parameters['obj_exercice'] = {
    in: 'body',
    description: 'JSON object needed to create an exercice',
    schema: {
        $name: 'exercice name',
        $description: 'How to execute the exercice, its context',
        $isBenchmark: 'Is the exercice to be remembered in stats',
      }
    } */
    const {name, description, isBenchmark} = req.body;

    if (!name || !description || typeof isBenchmark !== 'boolean') {
      res.status(400).json('"name", "description" or "isBenchmark" can\'t be empty');
      return
    }

    Exercice.build({
      name,
      description,
      isBenchmark
    })
    .save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.trace(err);
      res.status(500).json(err.toString)
    });
  },

  update: async (req, res) => {
    // #swagger.tags = ['Exercices']
    // #swagger.summary = 'Updates one exercice'
    /*  #swagger.parameters['obj_exercice'] = {
    in: 'body',
    description: 'JSON object needed to update an exercice, not all properties are needed',
    schema: {
        $name: 'exercice name',
        $description: 'How to execute the exercice, its context',
        $isBenchmark: 'Is the exercice to be remembered in stats',
    }
    } */
    try {
      const {id} = req.params;
      const exercice = await Exercice.findByPk(id);

      if (! exercice) {
        res.status(400).json(`Can't find Exercice with id: ${id}`);
        return;
      }

      const {name, description, isBenchmark} = req.body;

      if (name) exercice.name = name;
      if (description) exercice.description = description;
      if (isBenchmark) exercice.isBenchmark = isBenchmark;
      await exercice.save();
      res.json(exercice);

    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },

  delete: async (req, res) => {
    // #swagger.tags = ['Exercices']
    // #swagger.summary = 'Deletes one exercice'
    try {
      const exercice = await Exercice.findByPk(req.params.id);
      await exercice.destroy();
      return res.json('Exercice destroyed');
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
}