const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PostHtmlIncludePlugin = require("posthtml-include")({
  root: path.resolve(__dirname, "src"),
});

module.exports = {
  entry: { index: "./src/js/index.js", donate: "./src/js/donate.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(html)$/i,
        use: [
          "html-loader",
          {
            loader: "posthtml-loader",
            options: {
              plugins: [PostHtmlIncludePlugin],
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        // options: {
        //   inlineRequires: /\/img\//,
        // },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(svg|png|jpg)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/html/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "src/html/donate.html",
      filename: "donate.html",
      chunks: ["donate"],
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],

  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    hot: true,
    port: 5500,
  },
};
