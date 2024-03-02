describe('EmailInputForm', () => {
    describe('When is waiting for the school domain list to be fetched', () => {
        it('Should disable the email input field', () => {});
    });
    describe('When the school domain list is fetched', () => {
        describe('When user email input on a field are not valid', () => {
            it('Should show an error message under the field', () => {});
        });
        describe('When user email input is valid', () => {
            describe('When submit button is pressed', () => {
                it('Should invoke callback prop with the given user user', () => {});
            });
        });
    });
});
