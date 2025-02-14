#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const CustomUserCreator = require('../src/generators/users/customUserGenerator');

// Define CLI options
program
  .version('1.0.0')
  .description('A CLI tool to generate custom test data based on a schema.')
  .requiredOption('-s, --schema <path>', 'Path to the JSON or YAML schema file')
  .option('-c, --count <number>', 'Number of records to generate', 10)
  .option('-o, --output <path>', 'Output file path (default: ./output/customData.json)')
  .option('-f, --format <type>', 'Output format (json, csv, yaml)', 'json')
  .option('-b, --bulk <number>', 'Generate bulk data (number of records)', null)
  .parse(process.argv);

// Read schema file
const schemaPath = program.opts().schema;
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

// Generate data
const customCreator = new CustomUserCreator(schema);

if (program.opts().bulk) {
  // Generate bulk data
  const outputPath = program.opts().output || `./output/bulkData.${program.opts().format}`;
  customCreator.generateBulk(parseInt(program.opts().bulk), outputPath, program.opts().format);
} else {
  // Generate a small dataset
  const data = customCreator.generateMultiple(parseInt(program.opts().count));
  const outputPath = program.opts().output || `./output/customData.${program.opts().format}`;

  // Export data
  switch (program.opts().format) {
    case 'json':
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      break;
    case 'csv':
      const createCsvWriter = require('csv-writer').createObjectCsvWriter;
      const csvWriter = createCsvWriter({
        path: outputPath,
        header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
      });
      csvWriter.writeRecords(data);
      break;
    case 'yaml':
      const yaml = require('js-yaml');
      fs.writeFileSync(outputPath, yaml.dump(data));
      break;
    default:
      console.error('Unsupported output format. Use json, csv, or yaml.');
      process.exit(1);
  }

  console.log(`Data generated successfully and saved to ${outputPath}`);
}