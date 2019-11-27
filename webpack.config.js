const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  node: {
    fs: "empty",
    net: "empty"
  }
};
