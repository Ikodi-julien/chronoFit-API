require('dotenv').config();
const {
  Category,
  // Training
} = require('./app/models/');

const testCategory = async () => {
  console.log('test');
  
  try {
    
    const categories = await Category.findAll();
    
    categories.forEach(cat => console.log(cat._options.attributes));
    
  } catch(error) {
    console.log(error);
  }
}

// const testTraining = async() => {
//   console.log('test');
  
//   try {
    
//     const trainings = await Training.findByPk(1);
    
//     console.log(trainings);
    
//   } catch(error) {
//     console.log(error);
//   }
// }

testCategory();