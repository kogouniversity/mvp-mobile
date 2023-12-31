module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-notes',
    '@storybook/addon-ondevice-actions', 
    '@storybook/addon-ondevice-backgrounds',
  ],
};
