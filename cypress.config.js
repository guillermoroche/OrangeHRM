const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        logToTerminal(message) {
          // Log the message to the terminal
          config.env.logEnabled && console.log(message);
          return null;
        }
      });
      

    },
    env: {
      // Custom environment variables can be defined here
      logEnabled: true,
    },
  },
});
