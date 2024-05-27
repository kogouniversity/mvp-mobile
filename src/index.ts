import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';
import axios from 'axios';
import App from './app/App';

// Preload Assets
import './app/utils/images';

let AppEntryPoint;

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires, global-require */
    AppEntryPoint = require('../.storybook').default;
} else {
    AppEntryPoint = App;
}

registerRootComponent(AppEntryPoint);
