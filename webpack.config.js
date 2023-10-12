const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CnameWebpackPlugin = require("cname-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");

module.exports = {
  target: "web",
  entry: "./src/pages/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: false,
    hot: false,
    compress: true,
    liveReload: true,
    host: "localhost",
    // host: "192.168.1.3",
    port: 8088,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon.png",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackInlineSVGPlugin(),
    new CnameWebpackPlugin({
      domain: "cryptopay.productmap.ru",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              url: true,
              esModule: false,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|mp4)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext]",
          // filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/fonts",
        generator: {
          filename: "fonts/[name].[hash][ext]",
        },
      },
      {
        test: /CNAME/i,
        type: "asset/resource",
        // generator: {
        //   filename: "fonts/[name].[hash][ext]",
        // },
      },
    ],
  },
};
