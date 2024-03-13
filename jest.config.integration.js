module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
        '@testing-library/react-native/extend-expect',
        './src/setupTest.ts',
        './src/test-automation/integration/setupTest.ts',
    ],
    transform: {
        '^.+\\.(js|ts|tsx)$': 'babel-jest',
    },
    testMatch: ['**/test-automation/integration/**/?(*.)+(spec|test).[jt]s?(x)'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '@react-native'],
};
