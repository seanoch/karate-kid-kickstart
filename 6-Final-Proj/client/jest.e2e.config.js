module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
      "./src/test/e2e/setup.ts"
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy"
    },
    testMatch: ["**/e2e.test.tsx"]
  }