const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 2000,
  viewportHeight: 1000,
  numTestsKeptInMemory: 0,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
