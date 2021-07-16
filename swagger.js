require('dotenv').config();
/* 
https://www.npmjs.com/package/swagger-autogen#building-documentation-without-starting-the-project
 */
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    // version: '',      // by default: '1.0.0'
    title: 'API for chronofit data',
    // description: '',  // by default: ''
  },
  host: `localhost:${process.env.PORT}`,      // by default: 'localhost:3000'
  // basePath: '',  // by default: '/'
  // schemes: [],   // by default: ['http']
  // consumes: [],  // by default: ['application/json']
  // produces: [],  // by default: ['application/json']
  // tags: [        // by default: empty Array
  //   {
  //     name: 'Categories',         // Tag name
  //     description: 'Trainings have a categorie',  // Tag description
  //   },
  //   // { ... }
  // ],
  // securityDefinitions: {},  // by default: empty object
  // definitions: {},          // by default: empty object
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app/router.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);