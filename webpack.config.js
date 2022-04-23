// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  mode: "development",
  target: "node",
  entry: path.resolve(__dirname, "src/presentation/commands"),
  output: {
    path: path.join(__dirname, "libs"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
