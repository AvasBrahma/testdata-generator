const UserGenerator = require('../userGenerator');
const { faker } = require('@faker-js/faker');

class BankingUserGenerator extends UserGenerator {
  generateBankingUser() {
    const user = this.generateUser();
    return {
      ...user,
      accountNumber: faker.finance.accountNumber(),
      accountType: faker.helpers.arrayElement(['Savings', 'Checking', 'Business']),
      balance: faker.number.int({ min: 0, max: 100000 }), // Updated to use faker.number.int()
      lastTransactionDate: this.generateDate(),
    };
  }

  generateBankingUsers(count = 10) {
    return Array.from({ length: count }, () => this.generateBankingUser());
  }
}

module.exports = BankingUserGenerator;