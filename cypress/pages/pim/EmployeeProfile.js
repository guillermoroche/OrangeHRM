class EmployeeProfile {
    elements = {
        employeeName: () => cy.get('.orangehrm-edit-employee-name > .oxd-text'),
        employeeFirstName: () => cy.get('input[name="firstName"]'),
        employeeMiddleName: () => cy.get('input[name="middleName"]'),
        employeeLastName: () => cy.get('input[name="lastName"]'),

        employeeId: () => cy.get('div.oxd-input-group:contains("Employee Id") input'),
        
    };

    checkEmployeeDetails(employeeData) {
        this.elements.employeeName().should('contain.text', `${employeeData.firstName} ${employeeData.lastName}`);

        this.elements.employeeFirstName().should('have.value', employeeData.firstName);
        this.elements.employeeMiddleName().should('have.value', employeeData.middleName);
        this.elements.employeeLastName().should('have.value', employeeData.lastName);

        this.elements.employeeId().should('have.value', employeeData.employeeId);
    }
}

export default new EmployeeProfile();