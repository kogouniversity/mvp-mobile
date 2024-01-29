// Learn more https://docs.expo.io/guides/customizing-metro\
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getSentryExpoConfig(__dirname);

defaultConfig.resolver.resolverMainFields.unshift('sbmodern');

// SVG Transformer config
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
    ext => ext !== 'svg',
);
defaultConfig.resolver.sourceExts = [
    ...defaultConfig.resolver.sourceExts,
    'svg',
];
defaultConfig.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer',
);

module.exports = defaultConfig;
