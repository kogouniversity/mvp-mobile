/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import * as Sentry from '@sentry/react-native';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

let sentryConfig: object = {
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    environment: process.env.EXPO_PUBLIC_NODE_ENV,
    integrations: [
        new Sentry.ReactNativeTracing({
            routingInstrumentation,
        }),
    ],
};

if (process.env.EXPO_PUBLIC_NODE_ENV === 'local') {
    sentryConfig = {
        ...sentryConfig,
        debug: process.env.EXPO_PUBLIC_SENTRY_DEBUG === 'true', // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
        tracesSampleRate: Number(process.env.EXPO_PUBLIC_TRACE_RATE),
        beforeSend: (event: any, hint: any) => {
            console.error(hint.originalException || hint.syntheticException);
            return event;
        },
    };
} else if (process.env.EXPO_PUBLIC_NODE_ENV === 'test') {
    sentryConfig = {
        ...sentryConfig,
        beforeSend: (event: any, hint: any) => {
            console.error(hint.originalException || hint.syntheticException);
            return undefined;
        },
    };
} else if (process.env.EXPO_PUBLIC_NODE_ENV === 'production') {
    sentryConfig = {
        ...sentryConfig,
        debug: false,
        tracesSampleRate: 0,
    };
}

Sentry.init(sentryConfig);

/**
 * Capture Functions
 */
const { captureException, captureMessage } = Sentry;

const captureAxiosError = (err: AxiosError): void => {
    Sentry.withScope((scope: Sentry.Scope) => {
        const {
            method,
            url,
            params,
            data: requestData,
            headers,
        } = err.config as any;
        const { data: responseData, status } = err.response as any;
        Sentry.setContext('API Request Detail', {
            method,
            url,
            params,
            requestData,
            headers,
        });
        Sentry.setContext('API Response Detail', {
            status,
            responseData,
        });
        captureException(err);
    });
};

export {
    captureException,
    captureMessage,
    routingInstrumentation,
    captureAxiosError,
};

export default Sentry;

/*
// Let's say this function is invoked when a user clicks on the checkout button of your shop
function shopCheckout() {
    // This will create a new Transaction for you
    const transaction = Sentry.startTransaction({ name: 'shopCheckout' });
    // Set transaction on scope to associate with errors and get included span instrumentation
    // If there's currently an unfinished transaction, it may be dropped
    Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transaction));

    // Assume this function makes an xhr/fetch call
    const result = validateShoppingCartOnServer();

    const span = transaction.startChild({
        data: {
            result,
        },
        op: 'task',
        description: 'processing shopping cart result',
    });
    try {
        processAndValidateShoppingCart(result);
        span.setStatus(SpanStatus.Ok);
    } catch (err) {
        span.setStatus(SpanStatus.UnknownError);
        throw err;
    } finally {
        span.finish();
        transaction.finish();
    }
}
*/
