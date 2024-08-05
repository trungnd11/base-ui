const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const WebpackBar = require("webpackbar");
const { ModuleFederationPlugin } = require("webpack").container;
const { ModuleFederationTypesPlugin } = require("@cloudbeds/webpack-module-federation-types-plugin");
const federationConfig = require("./src/federationModules/federationConfig.ts");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const config = () => ({
    entry: "/src/index.tsx",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name].js",
      chunkFilename: "[id].[contenthash:8].chunk.js",
      clean: true,
      publicPath: isProduction ? "https://dev-demo-microfe.vetc.com.vn/" : "http://localhost:3000/",
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      watchFiles: ["src/**/*"],
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.json$/,
          loader: "json-loader",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".css", "scss", "json"],
      plugins: [new TsconfigPathsPlugin({})],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "/src/index.html"),
      }),
      new ModuleFederationPlugin(federationConfig),
      new ModuleFederationTypesPlugin({
        downloadTypesWhenIdleIntervalInSeconds: 120,
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
  });
  return config();
};