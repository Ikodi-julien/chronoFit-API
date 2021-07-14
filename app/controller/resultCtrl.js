const {Result} = require('../models');

module.exports = {
  getAll: async (req, res) => {

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
      res.json(data);
    })
    .catch(err => {
      console.trace(err);
      res.status(500).json(err.toString)
    });
  },

  update: async (req, res) => {

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
      res.json(result);

    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },

  delete: async (req, res) => {
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