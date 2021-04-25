const {User} =require('../models');

// TODO jeton d'authentification en middleware
module.exports = {
  getAll: async (req, res) => {
    
    try {
      const users = await User.findAll({
        include: ['role']
      });
      console
      res.json(users);
      
    } catch(err) {
      console.trace(err);
      res.status(500).json(err.toString())
    }
  },
  getOne: async(req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
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
      if (!pseudo) bodyErrors.push('Le pseudo ne peut pas être vide');
      if (!firstname) bodyErrors.push('Le nom ne peut pas être vide');
      if (!lastname) bodyErrors.push('Le prénom ne peut pas être vide');
      if (!password) bodyErrors.push('Le mot de passe ne peut pas être vide');
      // TODO validation d'email dans la forme et par validation d'un lien
      if (!email) bodyErrors.push('L\'email ne peut pas être vide');
      
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
        return
      }
      
      let newUser = await User.build({
        pseudo, 
        firstname, 
        lastname, 
        password, 
        email, 
        status: 'disconnected', 
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
      
      User.pseudo = pseudo;
      User.firstname = firstname;
      User.lastname = lastname;
      User.password = password;
      User.email = email;
      
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