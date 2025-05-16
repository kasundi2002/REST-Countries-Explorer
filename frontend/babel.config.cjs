// ✅ babel.config.js (CommonJS style)
module.exports = {
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-env",
  ],
};
