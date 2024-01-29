import { render, renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
