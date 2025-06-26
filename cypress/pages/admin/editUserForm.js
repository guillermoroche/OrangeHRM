class EditUserForm {
    elements = {
        userRoleDropdown: () => cy.get('div.oxd-grid-item:contains("User Role") div.oxd-select-text'),
        userRoleOption: (role) => cy.get(`div[role="listbox"] div[role="option"]:contains("${role}")`),
        userEmployeeNameInput: () => cy.get('div.oxd-input-group:contains("Employee Name") input'),
        userEmployeeNameInputSuggestion: (fullName) => cy.get(`div.oxd-autocomplete-dropdown:contains("${fullName}")`),

        accountStatusDropdown: () => cy.get('div.oxd-input-group:contains("Status") div.oxd-select-wrapper'),
        accountStatusOptions: (status) => cy.get(`div[role="listbox"] div[role="option"]:contains("${status}")`),

        userNameInput: () => cy.get('div.oxd-input-group:contains("Username") input'),
        userPasswordInput: () => cy.get('div.oxd-input-group:contains("Password"):nth(0) input'),
        userConfirmedPasswordInput: () => cy.get('div.oxd-input-group:contains("Password"):nth(1) input'),

        saveButton: () => cy.get('button[type="submit"]:contains("Save")'),

    };
    fillEditFormFields({ 
        userRole = '', 
        employeeName='', 
        status='', 
        username='',
        changePassword = false, 
        password = '', 
        confirmedPassword = '' }) {
            if (status) {
                this.elements.accountStatusDropdown().click();
                this.elements.accountStatusOptions(status).click();
            }

            this.#SaveAndwaitForSaveCompletion();
    };

    clickSaveButton() {
        cy.printTerminal('Clicking on Save button');
        this.elements.saveButton().click();
    }

    #waitForEmployeeNameCheck() {
        const randomId = Math.random().toString(36).substring(2, 10);
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?name**').as(`uniqueCheck_${randomId}`);
        cy.wait(`@uniqueCheck_${randomId}`).then((result) => {
            if (
                result.response &&
                result.response.body &&
                Array.isArray(result.response.body.data) &&
                result.response.body.data.length > 0
            ) {

            } else {
                throw new Error('Employee Name data is empty');
            }
        });
    }

    #SaveAndwaitForSaveCompletion() {
        const randomId = Math.random().toString(36).substring(2, 10);
        cy.intercept('PUT', '**/web/index.php/api/v2/admin/users/*').as(`saveCompletion_${randomId}`);
        this.clickSaveButton();
        cy.wait(`@saveCompletion_${randomId}`).then((result) => {
            if (result.response && result.response.statusCode === 200) {
                // Save successful
            } else {
                throw new Error('Failed to update user');
            }
        });
    }

    //TODO
}

export default new EditUserForm();