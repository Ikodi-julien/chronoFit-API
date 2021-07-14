const express = require('express');
const path = require('path');
const categoryCtrl = require('./controller/categoryCtrl');
const trainingTemplateCtrl = require('./controller/trainingTemplateCtrl');
const trainingDoneCtrl = require('./controller/trainingDoneCtrl');
const userCtrl = require('./controller/userCtrl');
const exerciceCtrl = require('./controller/exerciceCtrl');

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
router.post('/category', categoryCtrl.create);
router.patch('/category/:id', categoryCtrl.update);
router.delete('/category/:id', categoryCtrl.delete);

/* TRAINING */
router.get('/trainings', trainingTemplateCtrl.getAll);
router.get('/training/:id', trainingTemplateCtrl.getOne);
router.post('/training', trainingTemplateCtrl.create);
router.patch('/training/:id', trainingTemplateCtrl.update);
router.delete('/training/:id', trainingTemplateCtrl.delete);

/* USER */
router.get('/users', userCtrl.getAll);
router.get('/user/:id', userCtrl.getOne);
router.post('/user', userCtrl.create);
// TODO a middleware for admin access only
router.patch('/user/:id', userCtrl.update);
router.delete('/user/:id', userCtrl.delete);
// TODO a middleware for "me" access
// router.patch('/me', userCtrl.updateMe);
// router.delete('/me', userCtrl.deleteMe);

/* TRAINING DONE */
router.get('/trainingsDone', trainingDoneCtrl.getAll);
router.get('/trainingDone/:id', trainingDoneCtrl.getOne);
router.post('/trainingDone', trainingDoneCtrl.create);
router.patch('/trainingDone/:id', trainingDoneCtrl.update);
router.delete('/trainingDone/:id', trainingDoneCtrl.delete);

/* EXERCICE */
router.get('/exercices', exerciceCtrl.getAll);
router.get('/exercice/:id', exerciceCtrl.getOne);
router.post('/exercice', exerciceCtrl.create);
router.patch('/exercice/:id', exerciceCtrl.update);
router.delete('/exercice/:id', exerciceCtrl.delete);

/* ROLE not available with a request*/
/* RESULT */
router.get('/results', resultCtrl.getAll);
router.get('/result/:id', resultCtrl.getOne);
router.post('/result', resultCtrl.create);
router.patch('/result/:id', resultCtrl.update);
router.delete('/result/:id', resultCtrl.delete);

/*------------------------------*/
module.exports = router;