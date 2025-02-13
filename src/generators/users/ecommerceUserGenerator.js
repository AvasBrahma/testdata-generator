const UserGenerator = require('../userGenerator');
const { faker } = require('@faker-js/faker');

class EcommerceUserGenerator extends UserGenerator {
  generateEcommerceUser() {
    const user = this.generateUser();
    return {
      ...user,
      username: faker.internet.username(),
      loyaltyPoints: faker.number.int({ min: 0, max: 1000 }),
      lastPurchaseDate: this.generateDate(),
      totalSpent: faker.number.int({ min: 0, max: 10000 }),
      preferredPaymentMethod: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Apple Pay']),
    };
  }

  generateEcommerceUsers(count = 10) {
    return Array.from({ length: count }, () => this.generateEcommerceUser());
  }
}

module.exports = EcommerceUserGenerator;