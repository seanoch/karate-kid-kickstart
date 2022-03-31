module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
      "./src/test/it/setup.ts"
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy"
    },
    testMatch: ["**/*.it.test.tsx"]
  }