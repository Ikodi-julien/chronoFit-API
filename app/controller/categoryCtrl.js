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
  }
}