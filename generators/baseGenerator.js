const { faker } = require('@faker-js/faker');

class BaseGenerator {
  constructor(locale = 'en') {
    faker.locale = locale;
  }

  // Generate random string
  generateString(minLength = 5, maxLength = 10) {
    return faker.random.alphaNumeric(Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength);
  }

  // Generate random number
  generateNumber(min = 0, max = 100) {
    return faker.datatype.number({ min, max });
  }

  // Generate random date
  generateDate(from = '2020-01-01', to = '2025-03-03') {
    return faker.date.between({ from, to }).toISOString().split('T')[0];
  }

  // Generate random boolean
  generateBoolean() {
    return faker.datatype.boolean();
  }

  // Generate random email
  generateEmail() {
    return faker.internet.email();
  }
}

module.exports = BaseGenerator;