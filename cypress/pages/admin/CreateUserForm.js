class CreateUserForm {
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
    fillFormFields(employeeData) {
        this.elements.userRoleDropdown().click();
        this.elements.userRoleOption(employeeData.userRole).click();
        this.elements.userEmployeeNameInput().clear().type(employeeData.firstName + ' ' + employeeData.lastName);
        this.#waitForEmployeeNameCheck();
        const employeefullName = employeeData.firstName + ' ' + employeeData.middleName + ' ' + employeeData.lastName;
        this.elements.userEmployeeNameInputSuggestion(employeefullName).click();

        this.elements.accountStatusDropdown().click();
        this.elements.accountStatusOptions(employeeData.userStatus).click();


        this.elements.userNameInput().clear().type(employeeData.username);
        this.elements.userPasswordInput().clear().type(employeeData.password);
        this.elements.userConfirmedPasswordInput().clear().type(employeeData.confirmedPassword);

        this.elements.saveButton().click();
        this.#waitForSaveCompletion();
        cy.printTerminal(`User ${employeeData.username} has been created successfully`);
    }

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

    #waitForSaveCompletion() {
        const randomId = Math.random().toString(36).substring(2, 10);
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users').as(`saveCompletion_${randomId}`);
        cy.wait(`@saveCompletion_${randomId}`).then((result) => {
            if (result.response.statusCode === 200) {
                
            } else {
                throw new Error('Failed to create user');
            }
        });
    }

    //TODO
}

export default new CreateUserForm();