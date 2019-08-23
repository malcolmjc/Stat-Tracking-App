module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    '<rootDir>/src/test/setup-jest.ts'
  ],
  moduleFileExtensions: ["js", "ts", "json"],
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.spec).[jt]s?(x)" ]
};
