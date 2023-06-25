const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/background/background.js",
    contentScript: "./src/contentScript/index.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/env', '@babel/preset-react']
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./manifest.json", to: "../manifest.json" },
        { from: "./src/popup/popup.js", to: "./popup.js" },
      ],
    }),
    new HTMLPlugin({
      filename: path.resolve(__dirname, 'dist/popup.html'),
      template: './src/popup/popup.html',
      chunks: ['popup'],
    }),
    ...getHtmlPlugins(["index"]),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks(chunk){
        return chunk.name !== "contentScript";
      },
    },
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
          title: "YouTube extension",
          filename: `${chunk}.html`,
          chunks: [chunk],
      })
  );
}
