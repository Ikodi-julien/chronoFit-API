const express = require('express');
const path = require('path');
const categoryCtrl = require('./controller/categoryCtrl');
const trainingTemplateCtrl = require('./controller/trainingTemplateCtrl');
const trainingDoneCtrl = require('./controller/trainingDoneCtrl');
const userCtrl = require('./controller/userCtrl');

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
router.post('/categories', categoryCtrl.create);
router.patch('/categories/:id', categoryCtrl.update);
// router.put('/categories/:id?', categoryCtrl.createOrModify);
router.delete('/categories/:id', categoryCtrl.delete);

/* TRAINING */
router.get('/trainings', trainingTemplateCtrl.getAll);
router.get('/trainings/:id', trainingTemplateCtrl.getOne);
router.post('/trainings', trainingTemplateCtrl.create);
router.patch('/trainings/:id', trainingTemplateCtrl.update);
router.delete('/trainings/:id', trainingTemplateCtrl.delete);

/* USER */
router.get('/users', userCtrl.getAll);
router.get('/user/:id', userCtrl.getOne);
router.post('/users', userCtrl.create);
router.patch('/users/:id', userCtrl.update);
router.delete('/users/:id', userCtrl.delete);

/* TRAINING DONE */
router.get('/trainingsDone', trainingDoneCtrl.getAll);
router.get('/trainingsDone/:id', trainingDoneCtrl.getOne);
router.post('/trainingsDone', trainingDoneCtrl.create);
router.patch('/trainingsDone/:id', trainingDoneCtrl.update);
router.delete('/trainingsDone/:id', trainingDoneCtrl.delete);

/* EXERCICE */
/* ROLE */

/*------------------------------*/
module.exports = router;