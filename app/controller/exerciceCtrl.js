const {Exercice} = require('../models');

module.exports = {
  getAll: async (req, res) => {

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

    const id = req.params.id;

    try {
      const exercice = await Exercice.findByPk(id);

      exercice ? res.json(Exercice) : res.status(400).send(`Can't find Exercice with id: ${id}`);

    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },

  create: (req, res) => {
    const {name, description, isBenchmark} = req.body;

    if (!name || !description || !isBenchmark) {
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
    try {
      const exercice = await Exercice.findByPk(req.params.id);
      await exercice.destroy();
      res.json('Exercice destroyed');
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },

  // createOrModify: async (req, res) => {
  //   try {
  //     let Exercice;
  //     if (req.paramas.id) {
  //       Exercice = await Exercice.findByPk(req.params.id);
  //     }
  //     if (Exercice) {
  //       await ExerciceCtrl.modify(req, res);
  //       return;
  //     }
  //     await ExerciceCtrl.create(req, res);

  //   } catch(err) {
  //     console.trace(err);
  //     res.status(500).json(err.toString());
  //   }
  // },
}