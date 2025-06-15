class CommonMenuPage {
    elements = {
        navBar: () => cy.get('nav.oxd-navbar-nav'),
        topBar: () => cy.get('header.oxd-topbar'),
        centerMenu: () => cy.get('div.oxd-layout-context'),
        navBarButtons: () => this.elements.navBar().find('li.oxd-main-menu-item-wrapper'),
    };

    checkSuccessfulLogin() {
        this.elements.navBar().should('be.visible');
        this.elements.topBar().should('be.visible');
        this.elements.centerMenu().should('be.visible');
        cy.printTerminal('Login successful');
    }
}

export default new CommonMenuPage();