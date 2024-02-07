import React from 'react';
import { Alert } from 'react-native';
import { screen, render, fireEvent } from '../../test-utils';
import EmailInput from '../../../app/components/signup/EmailInputForm';

jest.spyOn(Alert, 'alert');

describe('EmailInput Component', () => {
    it('navigates to the next screen for a valid academic email', () => {
        const mockNavigate = jest.fn();
        render(<EmailInput navigate={mockNavigate} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const nextButton = screen.getByText('Next');

        fireEvent.changeText(emailInput, 'example@sfu.ca');
        fireEvent.press(nextButton);

        expect(mockNavigate).toHaveBeenCalledWith('VerificationCode');
        expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('shows an alert with "Invalid Email!" for an incorrectly formatted email', () => {
        render(<EmailInput navigate={() => {}} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const nextButton = screen.getByText('Next');

        fireEvent.changeText(emailInput, 'email');
        fireEvent.press(nextButton);

        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid email');
    });

    it('shows an alert for a non-academic email address', () => {
        render(<EmailInput navigate={() => {}} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const nextButton = screen.getByText('Next');

        fireEvent.changeText(emailInput, 'example@gmail.com');
        fireEvent.press(nextButton);

        expect(Alert.alert).toHaveBeenCalledWith(
            'Error',
            'Please enter a valid academic email address.',
        );
    });
});
