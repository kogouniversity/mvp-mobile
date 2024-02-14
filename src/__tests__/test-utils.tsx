import { render, renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';

const TestWrapper: React.FC<{
    children: JSX.Element[];
}> = function ({ children }) {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

const customRender: typeof render = (ui, options) =>
    render(ui, { wrapper: TestWrapper, ...options });

const customRenderHook: typeof renderHook = (callback, options) =>
    renderHook(callback, { wrapper: TestWrapper, ...options });

export * from '@testing-library/react-native';

export { customRender as render, customRenderHook as renderHook };

export function createAxiosMockResolved<T>(
    data: T,
    status = 200,
    mockRequestHeaders = {},
    mockResponseHeaders = {},
): AxiosResponse<T> {
    const requestHeaders = {
        'Content-Type': 'application/json',
        ...mockRequestHeaders,
    } as AxiosRequestHeaders;
    return {
        data,
        status,
        statusText: 'ok',
        headers: { ...mockResponseHeaders },
        config: {
            headers: requestHeaders,
        },
    };
}

export function createAxiosMockErrorRejected<T>(
    errorData: T,
    status = 400,
    mockRequestHeaders = {},
    mockResponseHeaders = {},
): AxiosError {
    const requestHeaders = {
        'Content-Type': 'application/json',
        ...mockRequestHeaders,
    } as AxiosRequestHeaders;
    const errorResponse = {
        data: errorData,
        status,
        statusText: 'failed',
        headers: { ...mockResponseHeaders },
        config: {
            headers: requestHeaders,
        },
    };
    return {
        response: errorResponse,
        isAxiosError: true,
        toJSON: () => errorResponse,
        name: '',
        message: '',
    };
}
