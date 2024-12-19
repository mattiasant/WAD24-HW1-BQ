const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: './src/main.js'  // Adjust this path to point to the correct `main.js` inside the frontend folder
  }
});
