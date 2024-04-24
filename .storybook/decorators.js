import axios from 'axios';
import { mswApiUrl } from '../src/test-automation/msw/utils';
import server from '../src/test-automation/msw/server';
import { NavigationContainer } from '@react-navigation/native';

export const initializeMSW = () => {
    server.listen({
        onUnhandledRequest: ({ method, url }) => {
            if (!url.contains('clients3.google.com') && !url.contains('symbolicate')) {
                console.error(`Unhandled ${method} request to ${url}.`);
            }
        },
    });
}

export const mswDecorator = (storyFn, { parameters: { msw } }) => {
    initializeMSW();
    axios.defaults.baseURL=mswApiUrl();
    if (msw) {    
        if (Array.isArray(msw) && msw.length > 0) {
            server.use(...msw);
        }
    }
    return storyFn();
}

/**
 * Helper component tor create a Dummy Stack to access {navigation} object on *.story.tsx files
 *
 * @usage add this decorator
 * ```
 * .addDecorator(NavigationDecorator)
 * ```
 */
export const navigationDecorator = (story) => {
  return (
    <NavigationContainer independent={true}>
      {story()}
    </NavigationContainer>
  );
};