const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    moduleNameMapper: {
        ...(jestConfig.moduleNameMapper || {}),
        '^c/mintelTokens$': '<rootDir>/jest-mocks/mintelTokens.js'
    },
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};
