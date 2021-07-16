const {Result} = require('../models');

module.exports = {
  getAll: async (req, res) => {
    // #swagger.tags = ['Results']
    // #swagger.summary = 'Get all results'

    try {
      const results = await Result.findAll({
          include: ['exercice', 'user']
      });
      res.json(results);
      console.log(results);

    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOne: async (req, res) => {
    // #swagger.tags = ['Results']
    // #swagger.summary = 'Get one result'

    const id = req.params.id;

    try {
      const result = await Result.findByPk(id, {
        include: ['exercice', 'user', 
          {
            association: 'trainingDoneOrigin', 
            include: ['training']
          }
        ]
    });

      result ? res.json(result) : res.status(400).send(`Can't find result with id: ${id}`);

    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },

  create: (req, res) => {
    // #swagger.tags = ['Results']
    // #swagger.summary = 'Creates one result'
    /*  #swagger.parameters['obj_result'] = {
    in: 'body',
    description: 'JSON object needed to create a result, all properties are mandatory',
    schema: {
        $userId: "1",
        $exerciceId: "1",
        $trainingDoneId: "1",
        $duration: "100", 
        $weight: "20", 
        $reps: "10",
    }
    } */    
    const {userId, exerciceId, trainingDoneId, duration, weight, reps } = req.body;

    if (!userId || !exerciceId || !trainingDoneId || !duration || !weight || !reps ) {
      res.status(400).json('userId, exerciceId, trainingDoneId, duration, weight or reps can\'t be empty');
      return
    }

    Result.build({
      userId, exerciceId, trainingDoneId, duration, weight, reps
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
    // #swagger.tags = ['Results']
    // #swagger.summary = 'Updates one result'
    /*  #swagger.parameters['obj_result'] = {
    in: 'body',
    description: 'JSON object needed to update a result, not all properties are needed',
    schema: {
        $userId: "1",
        $exerciceId: "1",
        $trainingDoneId: "1",
        $duration: "100", 
        $weight: "20", 
        $reps: "10",
    }
    } */
    try {
      const {id} = req.params;
      const result = await Result.findByPk(id);

      if (! result) {
        res.status(400).json(`Can't find result with id: ${id}`);
        return;
      }

      const {userId, exerciceId, trainingDoneId, duration, weight, reps} = req.body;

      if (userId) result.userId = userId;
      if (exerciceId) result.exerciceId = exerciceId;
      if (trainingDoneId) result.trainingDoneId = trainingDoneId;
      if (duration) result.duration = duration;
      if (weight) result.weight = weight;
      if (reps) result.reps = reps;
      await result.save();
      res.status(200).json(result);

    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },

  delete: async (req, res) => {
    // #swagger.tags = ['Results']
    // #swagger.summary = 'Deletes one result'
    try {
      const result = await Result.findByPk(req.params.id);
      await result.destroy();
      res.json('result destroyed');
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
}