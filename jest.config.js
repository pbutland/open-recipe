module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
  testPathIgnorePatterns: [
    "<rootDir>/src/__tests__/pageobjects",
    "<rootDir>/src/__tests__/loader"],
  collectCoverage: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/__tests__/**',
  ],
};
