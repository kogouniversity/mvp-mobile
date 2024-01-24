module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
    transform: {
        '^.+\\.(js|ts|tsx)$': 'babel-jest',
    },
    testMatch: [
        '**/test-automation/integration/**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    moduleNameMapper: {
        '^app/(.*)$': '<rootDir>/src/app/$1',
    },
};
