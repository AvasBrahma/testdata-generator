const UserGenerator = require('../userGenerator');
const { faker } = require('@faker-js/faker');

class FinancialUserGenerator extends UserGenerator {
  generateFinancialUser() {
    const user = this.generateUser();
    return {
      ...user,
      ssn: faker.phone.number('###-##-####'), // Simulate SSN
      creditScore: faker.number.int({ min: 300, max: 850 }),
      annualIncome: faker.number.int({ min: 30000, max: 500000 }),
      employmentStatus: faker.helpers.arrayElement(['Employed', 'Unemployed', 'Self-Employed']),
    };
  }

  generateFinancialUsers(count = 10) {
    return Array.from({ length: count }, () => this.generateFinancialUser());
  }
}

module.exports = FinancialUserGenerator;