const express = require('express');
const path = require('path');
const categoryCtrl = require('./controller/categoryCtrl');
const trainingTemplateCtrl = require('./controller/trainingTemplateCtrl');
const trainingDoneCtrl = require('./controller/trainingDoneCtrl');
const userCtrl = require('./controller/userCtrl');
const exerciceCtrl = require('./controller/exerciceCtrl');
const resultCtrl = require('./controller/resultCtrl');
const checkSlugId = require('./middlewares/checkSlugId');

/*------------------------------*/
const router= express.Router();

/*------------------------------*/
router.get('/', (req, res) => {
  let filePath = path.join(__dirname, '../public/index.html');
  res.sendFile(filePath);
})

/* CATEGORY user can only read categories*/
router.get('/categories', categoryCtrl.getAll);// tested
router.get('/category/:id', checkSlugId, categoryCtrl.getOne);// tested
// For now, 
// router.post('/category', categoryCtrl.create);
// router.patch('/category/:id', categoryCtrl.update);
// router.delete('/category/:id', categoryCtrl.delete);

/* TRAINING */
router.get('/trainings', trainingTemplateCtrl.getAll); // tested
router.get('/training/:id', checkSlugId, trainingTemplateCtrl.getOne); // tested
router.post('/training', trainingTemplateCtrl.create); // tested
router.patch('/training/:id', checkSlugId, trainingTemplateCtrl.update); // tested
router.delete('/training/:id', checkSlugId, trainingTemplateCtrl.delete); // tested

/* USER */
router.get('/users', userCtrl.getAll); // tested
router.get('/user/:id', checkSlugId, userCtrl.getOne); // tested
router.post('/user', userCtrl.create); // tested
// TODO a middleware for admin access only
router.patch('/user/:id', checkSlugId, userCtrl.update); // tested
router.delete('/user/:id', checkSlugId, userCtrl.delete); // tested
// TODO a middleware for "me" access
// router.patch('/me', userCtrl.updateMe);
// router.delete('/me', userCtrl.deleteMe);

/* TRAINING DONE */
router.get('/trainingsDone', trainingDoneCtrl.getAll); // tested
router.get('/trainingDone/:id', checkSlugId, trainingDoneCtrl.getOne); // tested
router.post('/trainingDone', trainingDoneCtrl.create); // tested
router.patch('/trainingDone/:id', checkSlugId, trainingDoneCtrl.update); // tested
router.delete('/trainingDone/:id', checkSlugId, trainingDoneCtrl.delete); // tested

/* EXERCICE */
router.get('/exercices', exerciceCtrl.getAll); // tested
router.get('/exercice/:id', checkSlugId, exerciceCtrl.getOne); //tested
router.post('/exercice', exerciceCtrl.create); //tested
router.patch('/exercice/:id', checkSlugId, exerciceCtrl.update); //tested
router.delete('/exercice/:id', checkSlugId, exerciceCtrl.delete); //tested

/* ROLE not available with a request*/
/* RESULT */
router.get('/results', resultCtrl.getAll);
router.get('/result/:id', checkSlugId, resultCtrl.getOne);
router.post('/result', resultCtrl.create);
router.patch('/result/:id', checkSlugId, resultCtrl.update);
router.delete('/result/:id', checkSlugId, resultCtrl.delete);

/*------------------------------*/
module.exports = router;