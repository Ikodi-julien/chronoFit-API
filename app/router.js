const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger-output.json');
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
  // #swagger.summary = 'Get API landing page'
  let filePath = path.join(__dirname, '../public/index.html');
  res.sendFile(filePath);
})
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ------------- CATEGORY user can only read categories*/
// router.get('/categories', categoryCtrl.getAll);
// router.get('/category/:id', checkSlugId, categoryCtrl.getOne);

/*------------------------- TRAINING */
router.get('/trainings', trainingTemplateCtrl.getAll);
router.get('/training/:id', checkSlugId, trainingTemplateCtrl.getOne);
router.post('/training', trainingTemplateCtrl.create);
router.patch('/training/:id', checkSlugId, trainingTemplateCtrl.update);
router.delete('/training/:id', checkSlugId, trainingTemplateCtrl.delete);

/* USER */
// router.get('/users', userCtrl.getAll);
// router.get('/user/:id', checkSlugId, userCtrl.getOne);
// router.post('/user', userCtrl.create);
// // TODO a middleware for admin access only
// router.patch('/user/:id', checkSlugId, userCtrl.update);
// router.delete('/user/:id', checkSlugId, userCtrl.delete);
// // TODO a middleware for "me" access
// router.patch('/me', userCtrl.updateMe);
// router.delete('/me', userCtrl.deleteMe);

/* TRAINING DONE */
// router.get('/trainingsDone', trainingDoneCtrl.getAll);
// router.get('/trainingDone/:id', checkSlugId, trainingDoneCtrl.getOne);
// router.post('/trainingDone', trainingDoneCtrl.create);
// router.patch('/trainingDone/:id', checkSlugId, trainingDoneCtrl.update);
// router.delete('/trainingDone/:id', checkSlugId, trainingDoneCtrl.delete);

// /* EXERCICE */
// router.get('/exercices', exerciceCtrl.getAll);
// router.get('/exercice/:id', checkSlugId, exerciceCtrl.getOne);
// router.post('/exercice', exerciceCtrl.create);
// router.patch('/exercice/:id', checkSlugId, exerciceCtrl.update);
// router.delete('/exercice/:id', checkSlugId, exerciceCtrl.delete);

// /* ROLE not available with a request*/
// /* RESULT */
// router.get('/results', resultCtrl.getAll);
// router.get('/result/:id', checkSlugId, resultCtrl.getOne);
// router.post('/result', resultCtrl.create);
// router.patch('/result/:id', checkSlugId, resultCtrl.update);
// router.delete('/result/:id', checkSlugId, resultCtrl.delete);

/*------------------------------*/
module.exports = router;