const express = require('express');
const path = require('path');
const categoryCtrl = require('./controller/categoryCtrl');
/*------------------------------*/
const router= express.Router();

/*------------------------------*/
router.get('/', (req, res) => {
  let filePath = path.join(__dirname, '../public/index.html');
  res.sendFile(filePath);
})

/* CATEGORY */
router.get('/categories', categoryCtrl.getAll);
router.get('/category/:id', categoryCtrl.getOne);

/*------------------------------*/
module.exports = router;