const {Category} = require('../models');

module.exports = {
  getAll: async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get all categories of training'
    try {
      const categories = await Category.findAll({
        include:{
          association: 'trainings'
        }
      });
      res.json(categories);
      console.log(categories);
      
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  
  getOne: async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Get one category of training'
    
    const catId = req.params.id;
    console.log('catId', catId);
    
    try {
      const category = await Category.findByPk(catId, {
        include: {
          association: 'trainings'
        }
      });
      
      category ? res.json(category) : res.status(400).send(`Can't find category with id: ${catId}`);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  create: (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Add a category of training'

    const name = req.body.name;
    
    if (!name) {
      res.status(400).json('"name" can\'t be empty');
      return
    }
    
    Category.build({
      name
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
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Updates a category of training'
    
    try {
      const catId = req.params.id;
      const category = await Category.findByPk(catId);
      
      if (! category) {
        res.status(400).json(`Can't find category with id: ${catId}`);
        return;
      }
      
      const {name} = req.body;
      
      if (name) category.name = name;
      await category.save();
      res.json(category);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },

  delete: async (req, res) => {
    // #swagger.tags = ['Categories']
    // #swagger.summary = 'Deletes a category of training'
    try {
      const category = await Category.findByPk(req.params.id);
      await category.destroy();
      res.json('Category destroyed');
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
}