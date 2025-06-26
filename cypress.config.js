const { defineConfig } = require("cypress");
const chalk = require("chalk").default || require("chalk");


module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      on('task', {
        logToTerminal(message) {
          config.env.logEnabled && console.log(chalk.green ? chalk.green(message) : chalk.default.green(message));
          return null;
        }
      });
    },
    env: {
      logEnabled: true,
    },
    projectId: '3nnfiv', // Replace with your actual project ID
  }
});
