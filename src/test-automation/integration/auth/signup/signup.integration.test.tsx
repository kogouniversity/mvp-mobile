describe('SignUp Integration Test', () => {
    describe('When a user enters a school email', () => {
        it('error if the email is not among the designated institution email domains', () => {});
        it('proceed if the email is among the designated institution email domains', () => {});
    });
    describe('When a user enters a verification code', () => {
        beforeEach(() => {
            // pass the prior step
        });
        it("error if the code is not matched with the verification code sent to the user's email", () => {});
        it("proceed if the code is matched with the verification code sent to the user's email", () => {});
    });
    describe('When a user enters sign up credentials', () => {
        beforeEach(() => {
            // pass the prior steps
        });
        it('error if the sign up request is failed', () => {});
        it('proceed if the sign up request is received', () => {});
    });
});
