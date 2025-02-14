#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const CustomUserCreator = require('../src/generators/users/customUserGenerator');
const FileExporter = require('../utils/fileExporter');

// Define CLI options
program
  .version('1.0.0')
  .description('A CLI tool to generate custom test data based on a schema.')
  .requiredOption('-s, --schema <path>', 'Path to the JSON or YAML schema file')
  .option('-c, --count <number>', 'Number of records to generate', 10)
  .option('-o, --output <path>', 'Output file path (default: ./output/customData.json)')
  .option('-f, --format <type>', 'Output format (json, csv, yaml)', 'json')
  .parse(process.argv);

// Read schema file
const schemaPath = program.opts().schema;
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

// Generate data
const customCreator = new CustomUserCreator(schema);
const data = customCreator.generateMultiple(parseInt(program.opts().count));

// Determine output path
const outputPath = program.opts().output || `./output/customData.${program.opts().format}`;

// Export data
switch (program.opts().format) {
  case 'json':
    FileExporter.exportToJSON(data, outputPath);
    break;
  case 'csv':
    FileExporter.exportToCSV(data, outputPath);
    break;
  case 'yaml':
    FileExporter.exportToYAML(data, outputPath);
    break;
  default:
    console.error('Unsupported output format. Use json, csv, or yaml.');
    process.exit(1);
}

console.log(`Data generated successfully and saved to ${outputPath}`);