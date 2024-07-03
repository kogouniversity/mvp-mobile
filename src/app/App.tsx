import React, { Ref, useRef } from 'react';
import { QueryClient, QueryClientConfig, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import Sentry, { routingInstrumentation } from './utils/sentry';
import FallbackError from './screens/fallback/FallbackError';
import { AuthProvider } from '../store/AuthContext';
import RootNavigator from './navigator';
import { NavigationProps } from './navigator/useNavigation';

onlineManager.setEventListener(setOnline =>
    NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
    }),
);

const queryConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            retry: Number(process.env.EXPO_PUBLIC_API_DEFAULT_RETRY),
            retryDelay: Number(process.env.EXPO_PUBLIC_API_DEFAULT_RETRY_DELAY),
        },
    },
};

function App(): React.JSX.Element {
    const queryClient = new QueryClient(queryConfig);
    const navigation = useRef() as Ref<NavigationContainerRef<NavigationProps>>;

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <NavigationContainer
                    ref={navigation}
                    onReady={() => {
                        routingInstrumentation.registerNavigationContainer(navigation);
                    }}>
                    <RootNavigator />
                </NavigationContainer>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default Sentry.wrap(Sentry.withErrorBoundary(App, { fallback: FallbackError }));
