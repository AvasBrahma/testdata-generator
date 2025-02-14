const CustomUserCreator = require('./users/customUserGenerator');


// Define a schema
const schema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string', faker: 'person.fullName' },
    email: { type: 'string', faker: 'internet.email' },
    age: { type: 'number', minimum: 18, maximum: 65 },
    isActive: { type: 'boolean' },
    createdAt: { type: 'string', format: 'date' }
  }
};

// Create custom data
const customCreator = new CustomUserCreator(schema);
const customData = customCreator.generateMultiple(5);

console.log("custom Data: ",customData);