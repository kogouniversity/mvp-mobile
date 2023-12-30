import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
    it('renders correctly', () => {
        render(<App />);
        const welcomeText = screen.getByText(
            'Open up App.tsx to start working on your app!',
        );
        expect(welcomeText).toBeTruthy();
    });
});
