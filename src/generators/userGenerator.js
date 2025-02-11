const BaseGenerator = require('./baseGenerator');
const { faker } = require('@faker-js/faker');

class UserGenerator extends BaseGenerator {
  generateUser() {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: this.generateEmail(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      createdAt: this.generateDate("2020-01-01","2023-12-31"),
    };
  }

  generateUsers(count = 10) {
    return Array.from({ length: count }, () => this.generateUser());
  }
}

module.exports = UserGenerator;