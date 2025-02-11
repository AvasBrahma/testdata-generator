const UserGenerator = require('./src/generators/userGenerator');

// Generate test data
const userGenerator = new UserGenerator();
const users = userGenerator.generateUsers(1);

console.log("Users: ", users);

console.log('Test data generated and exported successfully!');