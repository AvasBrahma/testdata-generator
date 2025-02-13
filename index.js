const UserGenerator = require('./src/generators/userGenerator');
const EcommerceUserGenerator = require('./src/generators/users/ecommerceUserGenerator');
const FinancialUserGenerator = require('./src/generators/users/financialUserGenerator');
const BankingUserGenerator = require('./src/generators/users/bankingUserGenerator');

// Generate test data
const userGenerator = new UserGenerator();
const users = userGenerator.generateUsers(1);

console.log("Users: ", users);

// Generate eCommerce users
const ecommerceGenerator = new EcommerceUserGenerator();
const ecommerceUsers = ecommerceGenerator.generateEcommerceUsers(2);
console.log("ecommerce User: ", ecommerceUsers);
// Generate financial users
const financialGenerator = new FinancialUserGenerator();
const financialUsers = financialGenerator.generateFinancialUsers(2);
console.log("financial Users: ", financialUsers);

// Generate banking users
const bankingGenerator = new BankingUserGenerator();
const bankingUsers = bankingGenerator.generateBankingUsers(3);
console.log("banking users: ", bankingUsers);

console.log('Test data generated and exported successfully!');