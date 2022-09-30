import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents: (on, config) => {
      require('dotenv').config();
      config.env = process.env;

      return config;
    },
  },
});
