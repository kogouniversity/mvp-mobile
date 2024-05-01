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
            server.use(...msw)    
        } 
        else if ('handlers' in msw && msw.handlers) {
            const handlers = Object.values(msw.handlers)        
                .filter(Boolean)        
                .reduce((handlers, handlersList) => handlers.concat(handlersList), []);
            if (handlers.length > 0) {        
                server.use(...handlers);
            }
        }
    }
    return storyFn();
}