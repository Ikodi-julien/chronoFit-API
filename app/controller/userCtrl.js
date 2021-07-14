const {User} =require('../models');

// TODO jeton d'authentification en middleware
module.exports = {
  getAll: async (req, res) => {
    
    try {
      const users = await User.findAll({
        include: ['role']
      });
      res.json(users);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString())
    }
  },
  getOne: async(req, res) => {
    try {
      
      const user = await User.findByPk(req.params.id, {
        include: ['role', {
          association: 'createdTrainings',
          include: ['category', 'exercices']
            }
          , {
          association: 'trainingsDone',
          include: [{
            association: 'training',
            include: ['category', 'exercices']
            }]
          }]
      });
      
      if (!user) {
        res.status(400).json(`User with id: ${req.params.id} not found`);
        return;
      }
      res.json(user);
      
    }catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  create: async (req, res) => {
    try {
      
      const {pseudo, firstname, lastname, password, email} = req.body;
      const bodyErrors = [];
      // TODO la vérif si le nom est déjà pris
      if (!pseudo) bodyErrors.push('pseudo can\'t be empty');
      if (!firstname) bodyErrors.push('first name can\'t be empty');
      if (!lastname) bodyErrors.push('last name can\'t be empty');
      if (!password) bodyErrors.push('password can\'t be empty');
      if (!email) bodyErrors.push('email can\'t be empty');
      // TODO validation d'email dans la forme et par validation d'un lien
      
      if (bodyErrors.length) {
        console.warn('create bodyerrors : ', bodyErrors)
        return res.status(400).json(bodyErrors);
      }
      
      // TODO bcrypter le password
      let newUser = await User.build({
        pseudo, 
        firstname, 
        lastname, 
        password, 
        email, 
        role_id: 1
      })
      
      await newUser.save();
      res.json(newUser);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  update: async (req, res) => {
    
    try {
      const {pseudo, firstname, lastname, password, email} = req.body;
      
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.status(400).json(`User with id: ${id} not found`);
        return;
      }
      
      user.pseudo = pseudo;
      user.firstname = firstname;
      user.lastname = lastname;
      user.password = password;
      user.email = email;
      
      await user.save();
      res.json(user);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  
  delete: async (req, res) => {
    
    try {
      
      const user = await User.findByPk(req.params.id);
      await user.destroy();
      res.json('User destroyed');
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  }
}