const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const yaml = require('js-yaml');

class FileExporter {
  static exportToCSV(data, filePath) {
    const csvWriter = createCsvWriter({
      path: filePath,
      header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    return csvWriter.writeRecords(data);
  }

  static exportToJSON(data, filePath) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  static exportToYAML(data, filePath) {
    fs.writeFileSync(filePath, yaml.dump(data));
  }
}

module.exports = FileExporter;