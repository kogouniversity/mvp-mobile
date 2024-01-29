import { Ref, useRef } from 'react';
import {
    QueryClient,
    QueryClientConfig,
    QueryClientProvider,
    onlineManager,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import {
    NavigationContainer,
    NavigationContainerRef,
} from '@react-navigation/native';
import RootNavigator from './navigator';
import { NavigationProps } from './utils/navigation';
import Fallback from './components/error/Fallback';
import Sentry, { routingInstrumentation } from './utils/sentry';

onlineManager.setEventListener(setOnline =>
    NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
    }),
);

const queryConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            retry: Number(process.env.EXPO_PUBLIC_QUERY_DEFAULT_RETRY),
            retryDelay: Number(
                process.env.EXPO_PUBLIC_QUERY_DEFAULT_RETRY_DELAY,
            ),
        },
    },
};

function App(): React.JSX.Element {
    const queryClient = new QueryClient(queryConfig);
    const navigation = useRef() as Ref<NavigationContainerRef<NavigationProps>>;
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer
                ref={navigation}
                onReady={() => {
                    routingInstrumentation.registerNavigationContainer(
                        navigation,
                    );
                }}>
                <RootNavigator />
            </NavigationContainer>
        </QueryClientProvider>
    );
}

export default Sentry.wrap(
    Sentry.withErrorBoundary(App, { fallback: Fallback }),
);
