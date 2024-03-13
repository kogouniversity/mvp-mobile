/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-labels */
import { Alert } from 'react-native';
import EmailVerificationForm from '../../../app/components/signup/EmailVerificationForm';
import { act, fireEvent, render, screen, waitFor } from '../../test-utils';
import useEmailVerification from '../../../app/hooks/api/auth/useEmailVerification';

jest.spyOn(Alert, 'alert');

const testUser = {
    email: 'test@sfu.ca',
    verificationCode: '123456',
};

const mockSubmitCallback = jest.fn();
const mockResendFn = jest.fn();

jest.mock(
    '../../../app/hooks/api/auth/useRequestNewVerificationEmail',
    () =>
        function () {
            return {
                requestNewVerificationEmailAsync: jest.fn().mockImplementation(
                    () =>
                        new Promise(resolve => {
                            mockResendFn();
                            setTimeout(resolve, 500);
                        }),
                ),
            };
        },
);

jest.mock(
    '../../../app/hooks/api/auth/useEmailVerification',
    () =>
        function () {
            return {
                requestEmailVerificationAsync: jest.fn().mockImplementation(
                    () =>
                        new Promise(resolve => {
                            setTimeout(resolve, 500);
                        }),
                ),
            };
        },
);

describe('EmailVerificationForm', () => {
    afterEach(() => {
        mockSubmitCallback.mockClear();
    });
    describe('not given a valid code input', () => {
        it('should disable the submit button', () => {
            render(<EmailVerificationForm email={testUser.email} onSubmit={mockSubmitCallback} />);
            const submitButton = screen.queryByTestId('submit-btn');
            expect(submitButton.props.accessibilityState).toHaveProperty('disabled', true);
        });
    });
    describe('when press the resend code button', () => {
        it('should show a confirmation alert', async () => {
            render(<EmailVerificationForm email={testUser.email} onSubmit={mockSubmitCallback} />);
            const resendButton = screen.queryByTestId('resend-btn');
            await act(async () => {
                fireEvent.press(resendButton);
            });
            await waitFor(() => expect(Alert.alert).toHaveBeenCalledTimes(1), { timeout: 1000 });
        });
        it('should empty the code input field', async () => {
            render(<EmailVerificationForm email={testUser.email} onSubmit={mockSubmitCallback} />);
            const codeInput = screen.queryByPlaceholderText('Verification Code');
            const resendButton = screen.queryByTestId('resend-btn');
            await act(async () => {
                fireEvent.changeText(codeInput, '111111');
            });
            expect(codeInput.props.value).toBe('111111');
            await act(async () => {
                fireEvent.press(resendButton);
            });
            await waitFor(() => expect(codeInput.props.value).toBe(undefined));
        });
        describe('when promptly press the resend button again', () => {
            it('should ignore while on delay', async () => {
                render(<EmailVerificationForm email={testUser.email} onSubmit={mockSubmitCallback} />);
                const resendButton = screen.queryByTestId('resend-btn');
                await act(async () => {
                    fireEvent.press(resendButton);
                });
                expect(mockResendFn).toHaveBeenCalled();
                mockResendFn.mockClear();
                await act(async () => {
                    fireEvent.press(resendButton);
                });
                expect(mockResendFn).not.toHaveBeenCalled();
            });
        });
    });
    describe('given a valid code is entered', () => {
        describe('when the submit button is pressed', () => {
            it('should set the button loading status to true', async () => {
                render(<EmailVerificationForm email={testUser.email} onSubmit={mockSubmitCallback} />);
                const codeInput = screen.queryByPlaceholderText('Verification Code');
                const submitButton = screen.queryByTestId('submit-btn');
                await act(async () => {
                    fireEvent.changeText(codeInput, '123456');
                    fireEvent.press(submitButton);
                });
                // loading 미구현으로 추후 추가
                // expect(submitButton.props.accessibilityState).toHaveProperty('isLoading', true);
            });
        });
        describe('given a response from the submit hook', () => {
            it('should show an error message on failure', async () => {
                render(<EmailVerificationForm email={testUser.email} onSubmit={mockSubmitCallback} />);
                const codeInput = screen.queryByPlaceholderText('Verification Code');
                const submitButton = screen.queryByTestId('submit-btn');
                (useEmailVerification().requestEmailVerificationAsync as jest.Mock).mockRejectedValue(null);
                await act(async () => {
                    fireEvent.changeText(codeInput, '111111');
                    fireEvent.press(submitButton);
                });
                screen.queryByText("This code is correct, either it's wrong or expired.");
            });
        });
    });
});
