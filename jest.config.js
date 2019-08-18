module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    '<rootDir>/src/test/setup-jest.ts'
  ],
  moduleFileExtensions: ["js", "ts", "json"]
};
