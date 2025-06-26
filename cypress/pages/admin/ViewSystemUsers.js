class ViewSistemUsers {
    elements = {
        addUserButton: () => cy.get('button[type="button"]:contains("Add")'),
        
        userNameInput: () => cy.get('div.oxd-input-group:contains("Username") input'),
        searchButton: () => cy.get('button[type="submit"]:contains("Search")'),

        tableRow: (username) => cy.get(`div.oxd-table-card:contains("${username}")`),
        editUserButton: (username) => cy.get(`div.oxd-table-card:contains("${username}") button i.bi-pencil-fill`),
    };

    clickAddUserButton() {
        cy.printTerminal('Clicking on Add User button');
        this.elements.addUserButton().click();
    }

    searchUser(employeeData) {
        cy.printTerminal(`Searching for user: ${employeeData.username}`);
        if (employeeData.username) {
            this.elements.userNameInput().clear().type(employeeData.username);
        } else {
            cy.printTerminal('No username provided for search');
        }
        this.#waitForSearchCompletion();
        this.#checkSearchResults(employeeData);
    }

    #waitForSearchCompletion() {
        const randomId = Math.random().toString(36).substring(2, 10);
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users**').as('searchCompletion_'+randomId);
        this.elements.searchButton().click();
        cy.wait('@searchCompletion_' + randomId);
        cy.printTerminal('Search completed');
    }

    #checkSearchResults(employeeData) {
        cy.printTerminal(`Checking search results for user: ${employeeData.username}`);
        this.elements.tableRow(employeeData.username).should('exist');
        this.elements.tableRow(employeeData.username).should('contain.text', employeeData.firstName + ' ' + employeeData.lastName);
        this.elements.tableRow(employeeData.username).should('contain.text', employeeData.userRole);
        this.elements.tableRow(employeeData.username).should('contain.text', employeeData.userStatus);
        cy.printTerminal(`User ${employeeData.username} found in search results`);
    }

    clickEditUserButton(employeeData) {
        cy.printTerminal(`Clicking on Edit button for user: ${employeeData.username}`);
        this.elements.editUserButton(employeeData.username).should('exist').click()
    }
}

export default new ViewSistemUsers();