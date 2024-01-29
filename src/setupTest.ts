/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */

// Mock Sentry
jest.mock('@sentry/react-native', () => ({
    init: () => null,
    ReactNavigationInstrumentation: class {
        constructor() {}

        registerNavigationContainer() {}
    },
    ReactNativeTracing: class {
        constructor() {}
    },
    withErrorBoundary: (component: any, options: object) => component,
    withScope: (func: any) => null,
    wrap: (component: any) => component,
    setContext: () => null,
    captureException: () => null,
    captureMessage: () => null,
    captureAxiosError: () => null,
}));

// Mock Netinfo
jest.mock('@react-native-community/netinfo', () => ({
    addEventListener: () => null,
}));
