const path = require('path')

module.exports = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.js'],
    preset: 'jest-expo',
    testPathIgnorePatterns: [
      '/node_modules/',
      'exercise\\.js$',
      'final\\.js$',
      'extra-\\d+\\.js$',
    ],
    setupFiles:['./node_modules/react-native-gesture-handler/jestSetup.js'],
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
    moduleDirectories: ['node_modules', path.join(__dirname, './src')],
    transformIgnorePatterns: ["node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"],
  }
  