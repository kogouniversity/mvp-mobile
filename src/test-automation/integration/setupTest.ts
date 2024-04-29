/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import axios from 'axios';
import server from '../msw/server';
import { mswApiUrl } from '../msw/utils';

/**
 * To force quitting Jest process after the test completion
 */
afterAll(() => setTimeout(() => process.exit(), 1000));

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

axios.defaults.baseURL = mswApiUrl();
beforeAll(() =>
    server.listen({
        onUnhandledRequest: 'bypass',
    }),
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
