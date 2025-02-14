const { faker } = require('@faker-js/faker');
const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');

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
      case 'array':
        return this.generateArray(config);
      case 'object':
        return this.generateObject(config);
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

  // Generate an array based on the schema
generateArray(config) {
  const minItems = config.minItems || 1;
  const maxItems = config.maxItems || 5;
  const length = faker.number.int({ min: minItems, max: maxItems });
  return Array.from({ length }, () => this.generateField(config.items));
}

// Generate an object based on the schema
generateObject(config) {
  const obj = {};
  for (const [key, fieldConfig] of Object.entries(config.properties)) {
    obj[key] = this.generateField(fieldConfig);
  }
  return obj;
}

  // Generate multiple records
  generateMultiple(count = 10) {
    return Array.from({ length: count }, () => this.generateData());
  }

  // Generate data in bulk and stream to a file
  generateBulk(count, filePath, format = 'json') {
    const stream = fs.createWriteStream(filePath);

    // Write the opening bracket for JSON array
    if (format === 'json') {
      stream.write('[');
    }

    // Create a transform stream to generate data
    const dataStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        this.push(JSON.stringify(chunk) + '\n');
        callback();
      },
    });

    // Generate data in chunks and stream to file
    let firstRecord = true;
    for (let i = 0; i < count; i++) {
      const record = this.generateData();

      // Add a comma between JSON objects
      if (format === 'json' && !firstRecord) {
        stream.write(',');
      }

      // Write the record to the stream
      stream.write(JSON.stringify(record));
      firstRecord = false;
    }

    // Write the closing bracket for JSON array
    if (format === 'json') {
      stream.write(']');
    }

    stream.end();
    console.log(`Generated ${count} records and saved to ${filePath}`);
  }
}

module.exports = CustomUserCreator;