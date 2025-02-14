
# Test Data Generator

The Test Data Generator is a powerful and flexible tool designed to help automation test engineers, developers, and QA teams generate realistic and dynamic test data for various testing scenarios. Whether you're testing APIs, UIs, or databases, this tool simplifies the process of creating test data, making your testing process more efficient and effective.




## ✨ Features
1. Dynamic Data Generation
Generate unique, randomized data for each test run.
Avoid hardcoding test data and ensure comprehensive test coverage.

2. Schema-Based Data Generation
Define custom JSON or YAML schemas to generate complex data structures.
Use predefined templates for common use cases (e.g., eCommerce, banking, healthcare).

3. Bulk Data Generation
Generate large datasets for performance testing, load testing, and database population.
Export data in JSON, CSV, YAML, or directly to a database.

4. Realistic Data
Use libraries like @faker-js/faker to generate realistic names, addresses, emails, and more.
Simulate real-world scenarios with ease.

5. Conditional Data Generation
Generate data based on conditions (e.g., if age > 30, set isPremium to true).
Create relationships between fields (e.g., generate an address for each user).

6. Integration with Testing Frameworks
Inject generated data directly into test cases (e.g., Playwright, Cypress, Selenium).
Support data-driven testing for multiple scenarios.

7. Command-Line Interface (CLI)
Generate data with simple commands.



## 🚀 Why Use This Tool?

1. Save Time:
* Automate the process of generating test data, reducing manual effort.
* Quickly generate large datasets for performance and load testing.

2. Improve Test Coverage:
* Test multiple scenarios with different datasets.
* Simulate edge cases and real-world conditions.

3. Enhance Test Quality:
* Use realistic data to validate application behavior.
* Avoid hardcoding data, ensuring tests are more reliable and maintainable.

4. Flexibility:
* Customize data generation with schemas and templates.
* Integrate with your existing testing frameworks and tools.

5. Scalability:
* Generate data for small-scale unit tests or large-scale performance tests.
* Handle complex data structures with ease.
## 🛠️ How to Use
1. Installation:
* Clone the repository and install dependencies:
* git clone https://github.com/AvasBrahma/testdata-generator.git
* cd test-data-generator
* npm install
2. Generate Test Data:
* Use the CLI to generate test data,  for example: node ./bin/generateData.js --schema ./schemas/userSchema.json --count 10 --format json --output ./output/testData.json

3. Integrate with Your Tests:
Load the generated data into your test framework (e.g., Playwright, Cucumber, Jest).

## 📂 Example Use Cases

*  eCommerce Testing: Generate realistic product data (e.g., name, price, description). Create users with orders, addresses, and payment methods.
* Banking Testing: Generate account data (e.g., account number, balance, transaction history).Simulate different account types (e.g., savings, checking, business).
* Healthcare Testing: Generate patient data (e.g., name, age, medical history).

## 🚀 Getting Started

1. Define a Schema
Create a JSON or YAML schema for your data:
{
"type": "object",
"properties": {
"id": { "type": "string", "format": "uuid" },
"name": { "type": "string", "faker": "person.fullName" },
"email": { "type": "string", "faker": "internet.email" }
}
}

2. Generate Data
Run the CLI to generate data:
node ./bin/generateData.js --schema ./schemas/userSchema.json --count 10 --format json --output ./output/testData.json

3. Use in Your Tests
Load the generated data into your test framework and start testing!
## 🤝 Contributing
I am welcoming everyone ! If you'd like to contribute to the project, 
please follow these steps:
* Fork the repository.
* Create a new branch for your feature or bugfix.
* Submit a pull request.

Happy Testing! 🚀



