/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import '@testing-library/jest-dom';

/**
 * To force quitting Jest process after the test completion
 */
afterAll(() => setTimeout(() => process.exit(), 3000));

// Mock Sentry
jest.mock('./app/utils/sentry', () => ({
    Sentry: {
        init: jest.fn(),
        withScope: (func: (scope: any) => void) => {
            const sentryScopeMock = jest.fn(() => ({
                setTag: jest.fn(),
                setContext: jest.fn(),
            }));
            func(sentryScopeMock());
        },
        setContext: jest.fn(),
        captureException: jest.fn(),
        captureMessage: jest.fn(),
    },
    routingInstrumentation: { registerNavigationContainer: jest.fn() },
    wrap: (component: any) => component,
    withErrorBoundary: (component: any, options: object) => component,
    captureException: jest.fn(),
    captureMessage: jest.fn(),
    captureAxiosError: jest.fn(),
}));

// Mock Netinfo
jest.mock('@react-native-community/netinfo', () => ({
    addEventListener: jest.fn(),
}));
