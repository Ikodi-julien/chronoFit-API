const path = require('path');

const girlsCtrl = {
  getAll: (req, res) => {
    
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
        console.log(err.toString())
      }
    })
  },
  
  getOne: (req, res) => {
    // #swagger.tags = ['Results']
    // #swagger.summary = 'Get one result'
    const id = req.params.id;
    
    const girl = require(path.resolve(`public/data/${id}.js`))
    res.json(girl)
  },
}

module.exports = girlsCtrl;