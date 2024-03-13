import { render, renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';

const QueryClientWrapper: React.FC<{
    children: JSX.Element[];
}> = function ({ children }) {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const renderWithQueryClient: typeof render = (ui, options) => render(ui, { wrapper: QueryClientWrapper, ...options });

const renderHookWithQueryClient: typeof renderHook = (callback, options) =>
    renderHook(callback, { wrapper: QueryClientWrapper, ...options });

export * from '@testing-library/react-native';

export { renderWithQueryClient, renderHookWithQueryClient };

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

export async function delay(ms: number): Promise<void> {
    await new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
