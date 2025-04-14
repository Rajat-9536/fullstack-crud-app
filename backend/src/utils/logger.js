const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'logs', 'app.log');

const logError = (message) => {
  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ERROR: ${message}\n`);
};

module.exports = { logError };
