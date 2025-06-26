
class AddEmployeeForm {
    elements = {
        employeeFirstName: () => cy.get('input[name="firstName"]'),
        employeeMiddleName: () => cy.get('input[name="middleName"]'),
        employeeLastName: () => cy.get('input[name="lastName"]'),
        employeeId: () => cy.get('div.oxd-input-group:contains("Employee Id") input'),
        employeeSaveButton: () => cy.get('button[type="submit"]:contains("Save")'),

        employeeLoginCredentialsCheckbox: () => cy.get('input[type="checkbox"]'),
        employeeUsername: () => cy.get('div.oxd-input-group:contains("Username") input'),
        employeePassword: () => cy.get('div.oxd-input-group:contains("Password"):nth(0) input'),
        employeeConfirmedPassword: () => cy.get('div.oxd-input-group:contains("Password"):nth(1) input'),
        employeeAccountStatus: (status) => cy.get(`div.oxd-input-group:contains("Status") div.oxd-radio-wrapper:contains("${status}") input`),

    };
    fillFormFields(employeeData, expectedFail = false) {
        if (employeeData.firstName) {
            this.elements.employeeFirstName().type(employeeData.firstName);
        }
        if (employeeData.middleName) {
            this.elements.employeeMiddleName().type(employeeData.middleName);
        }
        if (employeeData.lastName) {
            this.elements.employeeLastName().type(employeeData.lastName);
        }
        if (employeeData.employeeId) {
            this.elements.employeeId().clear().type(employeeData.employeeId);
            this.#waitForEmployeeIdCheck();
        }



        if(employeeData.createLogin) {
            cy.printTerminal(`Creating login credentials: ${employeeData.username}, password: ${employeeData.password}`);
            //TODO fill login credentials fields if createLogin is true
            this.elements.employeeLoginCredentialsCheckbox().check({force: true});
            if (employeeData.username) {
                this.elements.employeeUsername().clear().type(employeeData.username);
            }
            if (employeeData.password) {
                this.elements.employeePassword().clear().type(employeeData.password);
            }
            if (employeeData.confirmedPassword) {
                this.elements.employeeConfirmedPassword().clear().type(employeeData.confirmedPassword);
            }
            if (employeeData.userStatus) {
                this.elements.employeeAccountStatus(employeeData.userStatus).check({force: true});
            }
        }
        
        this.elements.employeeSaveButton().click();
        this.#waitForSaveCompletion();
        cy.printTerminal(`Employee ${employeeData.firstName} ${employeeData.middleName} ${employeeData.lastName} has been created successfully`);

    }

    #waitForEmployeeIdCheck() {
        const randomId = Math.random().toString(36).substring(2, 10);
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/core/validation/unique**').as(`uniqueCheck_${randomId}`);
        cy.wait(`@uniqueCheck_${randomId}`).then((result) => {
            if (result.response && result.response.body && result.response.body.data && result.response.body.data.valid === true) {
                //cy.printTerminal('Employee ID is valid and unique');
            } else {
                throw new Error('Employee ID is not unique or valid');
            }
        });
    }

    #waitForSaveCompletion() {
        const randomId = Math.random().toString(36).substring(2, 10);
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees').as(`employeeSave_${randomId}`);
        cy.wait(`@employeeSave_${randomId}`).then((result) => {
            if (result.response && result.response.statusCode !== 200) {
                throw new Error('Failed to save employee');
            }
        });
    }
}

export default new AddEmployeeForm();