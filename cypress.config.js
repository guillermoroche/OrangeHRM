import { defineConfig } from "cypress";
import chalk from 'chalk';

export default defineConfig({
  projectId: '3nnfiv',
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      on('task', {
        logToTerminal(message) {
          config.env.logEnabled && console.log(chalk.greenBright(message));
          return null;
        }
      });
    },
    env: {
      logEnabled: false,
    },
  }
});
