const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//html파일에 필요한 js파일이 import 되게 자동으로 해주는 플러그인
module.exports = {
  mode: "development",
  entry: {
    index: "/javascript/index/main.js",
    signup: "/javascript/signup/main.js",
    room: "/javascript/room/main.js",
    calander: "/javascript/calander/main.js",
  },
  output: {
    path: path.resolve(__dirname, "public/webpack"),
    filename: "[name]_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/, //js가 css라는걸 만났을때
        use: [
          "style-loader", //가져온걸 html에 적용
          "css-loader", //css를 js파일에 가져오기
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./~", //참고할 html파일
      filename: "./~", //만들어질 html파일
      chunks: ["~"], //원하는 필요로 하는 js만 import하게 설정
    }),
  ],
};
