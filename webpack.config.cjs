const path = require("path");

module.exports = {
  entry: './src/app.js',  // Update this path based on your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  // Add other webpack configuration as needed...
};
