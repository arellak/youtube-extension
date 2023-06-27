import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";


const options = {
  entry: {
    background: "./src/background/background.js",
    contentScript: "./src/contentScript/index.js",
    popup: "./src/popup/index.js",
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
        { from: "./manifest.json", to: "./manifest.json" },
      ],
    }),
    ...getHtmlPlugins(["index", "popup"]),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: path.resolve("./dist/"),
    filename: "./js/[name].js",
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
      new HtmlWebpackPlugin({
          title: "YouTube extension",
          filename: `./js/${chunk}.html`,
          chunks: [chunk],
          templateContent: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>YouTube extension</title>
              </head>
              <body>
                <div id="root"></div>
              </body>
            </html>
          `
      })
  );
}

export default options;
