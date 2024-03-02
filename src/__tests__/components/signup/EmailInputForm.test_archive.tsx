import React from 'react';
import { Alert } from 'react-native';
import { screen, render, fireEvent } from '../../test-utils';
import EmailInput from '../../../app/components/signup/EmailInputForm';

jest.spyOn(Alert, 'alert');

describe('EmailInput Component', () => {
    it('navigates to the next screen for a valid academic email', () => {
        const mockCallback = jest.fn();
        render(<EmailInput onEmailEntered={mockCallback} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const nextButton = screen.getByText('Next');

        fireEvent.changeText(emailInput, 'example@sfu.ca');
        fireEvent.press(nextButton);

        expect(mockCallback).toHaveBeenCalledTimes(0);
        expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('shows an alert with "Invalid Email!" for an incorrectly formatted email', () => {
        render(<EmailInput onEmailEntered={() => {}} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const nextButton = screen.getByText('Next');

        fireEvent.changeText(emailInput, 'email');
        fireEvent.press(nextButton);

        expect(Alert.alert).toHaveBeenCalledTimes(1);
    });

    it('shows an alert for a non-academic email address', () => {
        render(<EmailInput onEmailEntered={() => {}} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const nextButton = screen.getByText('Next');

        fireEvent.changeText(emailInput, 'example@gmail.com');
        fireEvent.press(nextButton);

        expect(Alert.alert).toHaveBeenCalledTimes(2);
    });
});
