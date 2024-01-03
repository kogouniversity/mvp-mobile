import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';

// Preload Assets
import './utils/assets';

import RootNavigationEntry from './screens';

export default function App(): React.JSX.Element {
    return <RootNavigationEntry />;
}

let AppEntryPoint = App;

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires, global-require */
    AppEntryPoint = require('../../.storybook').default;
}

registerRootComponent(AppEntryPoint);
