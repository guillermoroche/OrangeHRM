class ViewSistemUsers {
    elements = {
        addUserButton: () => cy.get('button[type="button"]:contains("Add")'),        
    };

    clickAddUserButton() {
        cy.printTerminal('Clicking on Add User button');
        this.elements.addUserButton().click();
    }
}

export default new ViewSistemUsers();