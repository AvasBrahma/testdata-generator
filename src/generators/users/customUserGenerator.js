const { faker } = require('@faker-js/faker');

class CustomUserCreator {
  constructor(schema) {
    this.schema = schema;
  }

  // Generate data based on schema
  generateData() {
    const data = {};
    for (const [key, config] of Object.entries(this.schema.properties)) {
      data[key] = this.generateField(config);
    }
    return data;
  }

  // Generate a single field based on its configuration
  generateField(config) {
    switch (config.type) {
      case 'string':
        if (config.faker) {
          return this.generateFakerData(config.faker);
        }
        return faker.string.alphanumeric(config.minLength || 10);
      case 'number':
        return faker.number.int({ min: config.minimum || 0, max: config.maximum || 100 });
      case 'boolean':
        return faker.datatype.boolean();
      case 'date':
        return faker.date.between({ from: config.from || '2020-01-01', to: config.to || '2023-12-31' }).toISOString();
      default:
        throw new Error(`Unsupported type: ${config.type}`);
    }
  }

  // Generate data using Faker.js methods
  generateFakerData(fakerMethod) {
    const methodPath = fakerMethod.split('.');
    let result = faker;
    for (const part of methodPath) {
      result = result[part];
    }
    return result();
  }

  // Generate multiple records
  generateMultiple(count = 10) {
    return Array.from({ length: count }, () => this.generateData());
  }
}

module.exports = CustomUserCreator;