import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmailInput from '../../../components/signup/EmailInput'; 
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

describe('EmailInput Component', () => {
    it('navigates to the next screen for a valid academic email', () => {
        const mockNavigate = jest.fn();
        const { getByPlaceholderText, getByText } = render(<EmailInput navigate={mockNavigate} />);
        const emailInput = getByPlaceholderText('Email');
        const nextButton = getByText('Next');
    
        fireEvent.changeText(emailInput, 'example@sfu.ca');
        fireEvent.press(nextButton);
    
        expect(mockNavigate).toHaveBeenCalledWith('VerificationCode');
        expect(Alert.alert).not.toHaveBeenCalled();
      });
      
  it('shows an alert with "Invalid Email!" for an incorrectly formatted email', () => {
    const { getByPlaceholderText, getByText } = render(<EmailInput navigate={() => {}} />);
    const emailInput = getByPlaceholderText('Email');
    const nextButton = getByText('Next');

    fireEvent.changeText(emailInput, 'email');
    fireEvent.press(nextButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid email');
  });


  it('shows an alert for a non-academic email address', () => {
    const { getByPlaceholderText, getByText } = render(<EmailInput navigate={() => {}} />);
    const emailInput = getByPlaceholderText('Email');
    const nextButton = getByText('Next');

    fireEvent.changeText(emailInput, 'example@gmail.com');
    fireEvent.press(nextButton);

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter a valid academic email address.');
  });


});
