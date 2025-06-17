class CommonMenuPage {
    elements = {
        navBar: () => cy.get('nav.oxd-navbar-nav'),
        topBar: () => cy.get('header.oxd-topbar'),
        centerMenu: () => cy.get('div.oxd-layout-context'),
        navBarButtons: (menuItem) => this.elements.navBar().find(`li.oxd-main-menu-item-wrapper:contains("${menuItem}")`),
        userDropdown: () => cy.get('span.oxd-userdropdown-tab'),
        logoutButton: () => cy.get('a[role="menuitem"]:contains("Logout")'),
        
    };

    menuItems = {
        admin: 'Admin',
        pim: 'PIM',
        leave: 'Leave',
        time: 'Time',
        recruitment: 'Recruitment',
        myInfo: 'My Info',
        performance: 'Performance',
        dashboard: 'Dashboard',
        directory: 'Directory',
        maintenance: 'Maintenance',
    };

    checkSuccessfulLogin() {
        this.elements.navBar().should('be.visible');
        this.elements.topBar().should('be.visible');
        this.elements.centerMenu().should('be.visible');
        cy.printTerminal('Login successful');
    }

    clickMenuItem(menuItem) {
        cy.printTerminal(`Clicking on menu item: ${menuItem}`);
        this.elements.navBarButtons(menuItem).click();
    }

    logout() {
        this.elements.userDropdown().click();
        this.elements.logoutButton().click();
        cy.printTerminal('Logout successful');
    }
}

export default new CommonMenuPage();