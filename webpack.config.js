const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = env => {
  const basePath = path.join(__dirname, ".env");
  const envPath = `${basePath}.${env.ENVIRONMENT}`;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  const finalEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(finalEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(finalEnv[next]);
    return prev;
  }, {});

  return {
    entry: ["@babel/polyfill", "./src/index.js"],
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["env"] }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/",
      filename: "bundle.js"
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 3000,
      publicPath: "/",
      hot: true,
      historyApiFallback: true
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        title: "Trello Dashboard",
        favicon: "src/favicon.ico",
        template: "src/index.html",
        trelloKey: JSON.parse(envKeys["process.env.TRELLO_KEY"])
      })
    ]
  };
};
