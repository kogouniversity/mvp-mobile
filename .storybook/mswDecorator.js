import server from '../src/test-automation/msw/server';

export const initialize = () => {
    server.listen({
        onUnhandledRequest: ({ method, url }) => {
            if (!url.contains('clients3.google.com') && !url.contains('symbolicate')) {
                console.error(`Unhandled ${method} request to ${url}.`);
            }
        },
    });
}

export const withMsw = (storyFn, { parameters: { msw } }) => {
    if (msw) {    
        if (Array.isArray(msw) && msw.length > 0) {
            server.use(...msw);
        }
    }
    return storyFn();
}