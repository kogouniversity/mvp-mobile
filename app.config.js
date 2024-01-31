const { withSentry } = require("@sentry/react-native/expo");

const config = {
    name: 'kogo',
    slug: 'kogo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#ffffff',
        },
    },
    web: {
        favicon: './assets/favicon.png',
    },
    extra: {
        storybookEnabled: process.env.STORYBOOK_ENABLED,
    },
};

module.exports = withSentry(config, {
    url: 'https://sentry.io/',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    organization: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
});
