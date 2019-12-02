const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"]
        },
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  }
};
