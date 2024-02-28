describe('IdAndPasswordForm', () => {
    describe('When user input on all fields are valid', () => {
        describe('When submit button is pressed', () => {
            it('Should show a login spinner on the submit button and disable it', () => {});
            it('Should form submit handler and sign up hook are invoked', () => {});
            describe('When sign up hook is failed', () => {
                it('Should show an error message from the server under the submit button', () => {});
            });
            describe('When sign up hook is success', () => {
                it('Should invoke callback prop with received user data', () => {});
            });
        });
    });
});
