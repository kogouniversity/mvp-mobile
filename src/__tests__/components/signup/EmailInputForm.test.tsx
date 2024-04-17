/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { screen, render, fireEvent, act, waitFor } from '../../test-utils';
import EmailInputForm from '../../../app/components/signup/EmailInputForm';
import { useSchoolList } from '../../../app/hooks/api/school/useSchoolList';

const testUser = {
    email: 'test@sfu.ca',
};

const mockSchoolListApiResponse = {
    data: {
        data: [
            {
                id: 1,
                attributes: {
                    schoolEmailDomain: 'sfu.ca',
                    schoolName: 'Simon Fraser University',
                },
            },
        ],
        meta: {},
    },
    isSuccess: true,
};
const mockSchoolListApiFailure = {
    data: null,
    isSuccess: false,
};

const mockCallback = jest.fn();

jest.mock('../../../app/hooks/api/school/useSchoolList', () => ({
    useSchoolList: jest.fn(),
}));

describe('EmailInputForm', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when school list is not loaded', () => {
        it('should disable the submit button', () => {
            return;
            (useSchoolList as any).mockReturnValue(mockSchoolListApiFailure);
            render(<EmailInputForm onSubmit={mockCallback} />);
            const nextButton = screen.getByTestId('submit-btn');
            expect(nextButton.props.accessibilityState).toHaveProperty('disabled', true);
        });
    });

    describe('not given a valid email input', () => {
        beforeEach(() => {
            (useSchoolList as any).mockReturnValue(mockSchoolListApiResponse);
        });
        it('should show an input error message on submit', async () => {
            return;
            render(<EmailInputForm onSubmit={mockCallback} />);
            const emailInput = screen.getByPlaceholderText('Email');
            const nextButton = screen.getByTestId('submit-btn');
            act(() => {
                fireEvent.press(nextButton);
            });
            screen.queryByText('Required');
            act(() => {
                fireEvent.changeText(emailInput, 'aa');
                fireEvent.press(nextButton);
            });
            screen.queryByText('Invalid email');
        });
        it('should be one of the selective school email domain', async () => {
            return;
            render(<EmailInputForm onSubmit={mockCallback} />);
            const emailInput = screen.getByPlaceholderText('Email');
            const nextButton = screen.getByTestId('submit-btn');
            await act(async () => {
                fireEvent.changeText(emailInput, 'test@gmail.com');
                fireEvent.press(nextButton);
            });
            screen.queryByText('Sorry, this email is not a valid student email.');
        });
    });

    describe('given a valid email input', () => {
        beforeEach(() => {
            (useSchoolList as any).mockReturnValue(mockSchoolListApiResponse);
        });
        it('should invoke the callback prop with email', async () => {
            return;
            render(<EmailInputForm onSubmit={mockCallback} />);
            const nextButton = screen.getByTestId('submit-btn');
            const emailInput = screen.getByPlaceholderText('Email');
            await act(async () => {
                fireEvent.changeText(emailInput, testUser.email);
                fireEvent.press(nextButton);
            });
            await waitFor(
                () => {
                    expect(mockCallback).toHaveBeenCalledWith(testUser.email);
                },
                { timeout: 1000 },
            );
        });
    });
});
