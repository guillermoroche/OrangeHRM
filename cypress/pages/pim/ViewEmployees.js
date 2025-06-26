class ViewEmployees {
    elements = {
        employeeTable: () => cy.get('div.oxd-table-body'),
        addEmployeeButton: () => cy.get('button[type="button"]:contains("Add")'),
    };

    checkEmployeesPageLoads() {
        
        this.elements.employeeTable().should('be.visible').and('not.be.empty');
        cy.printTerminal('Checking if the Employees page loads');
    }

    clickAddEmployeeButton() {
        this.elements.addEmployeeButton().click();
        cy.printTerminal('Clicked on Add Employee button');
    }
}

export default new ViewEmployees();