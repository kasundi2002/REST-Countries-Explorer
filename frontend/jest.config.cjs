module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};