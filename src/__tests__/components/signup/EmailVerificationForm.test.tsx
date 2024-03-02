describe('EmailVerificationForm', () => {
    describe('When is fetching the verification code and its expiry for the given email from prop', () => {
        it('Should disable the code input field', () => {});
    });
    describe('When user press the resend code button', () => {
        it('Should attempt to refetch the verification code', () => {});
    });
    describe('When user enters 6 digit code on the input', () => {
        describe('When user presses the submit button', () => {
            describe('When the current time is past the verification code expiry', () => {
                it('Should show an error message asking to press the resend code button', () => {});
            });
            describe('When the current time is not past the verification code expiry', () => {
                it('Should disable the input field while validating the code', () => {});
                it('Should compare with the verification code', () => {});
                it('Should invoke email token hook to retrieve email token', () => {});
                describe('When the email token hook is not successful', () => {
                    it('Should show a connectivity error message', () => {});
                });
                describe('When the email token hook is successful', () => {
                    it('Should invoke the prop callback with the given email token', () => {});
                });
            });
        });
    });
});
