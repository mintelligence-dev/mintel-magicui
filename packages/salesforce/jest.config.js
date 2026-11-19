const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    moduleNameMapper: {
        ...(jestConfig.moduleNameMapper || {}),
        // CSS-only module: stub it so component CSS imports resolve under jest.
        // Records Navigate calls (the stock stub discards them).
        '^lightning/navigation$': '<rootDir>/jest-mocks/lightning/navigation.js',
        '^c/tokens$': '<rootDir>/jest-mocks/tokens.js',
        // Test-only host components that compose the real components.
        '^c/tabsHost$': '<rootDir>/jest-fixtures/tabsHost/tabsHost.js',
        '^c/timelineHost$': '<rootDir>/jest-fixtures/timelineHost/timelineHost.js'
    },
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};
