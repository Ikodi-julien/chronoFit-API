const {Category} = require('../models');

module.exports = {
  getAll: async (req, res) => {
    
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
    try {
      const category = await Category.findByPk(req.params.id);
      await category.destroy();
      res.json('Category destroyed');
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  // createOrModify: async (req, res) => {
  //   try {
  //     let category;
  //     if (req.paramas.id) {
  //       category = await Category.findByPk(req.params.id);
  //     }
  //     if (category) {
  //       await categoryCtrl.modify(req, res);
  //       return;
  //     }
  //     await categoryCtrl.create(req, res);
      
  //   } catch(err) {
  //     console.trace(err);
  //     res.status(500).json(err.toString());
  //   }
  // },
}