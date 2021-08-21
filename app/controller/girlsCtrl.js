const path = require('path');

const girlsCtrl = {
  getAll: (req, res) => {
    
    try {
      const options = {
        root: path.join(__dirname, '../../public/data'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    
      res.sendFile("girls.json", options, function (err) {
        if (err) {
          throw err;
        }
      })
      
    } catch (err) {
      res.status(404).send(err.code);
    }
  },
  
  getOne: (req, res) => {
    // #swagger.tags = ['Results']
    // #swagger.summary = 'Get one result'
    try {
      const id = req.params.id;
      const girl = require(path.resolve(`public/data/${id}.js`))
      res.json(girl)
      
    } catch (err) {
      res.status(404).send(err.code);
    }
  },
}

module.exports = girlsCtrl;