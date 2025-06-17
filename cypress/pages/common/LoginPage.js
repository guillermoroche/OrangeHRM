import LoginErrorMessagesjson from '../../fixtures/LoginErrorMessages.json';

class LoginPage {
    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        loginButton: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('div.orangehrm-login-error'),
        emptyUsernameFieldError: (field) => cy.get(`form.oxd-form div.oxd-form-row:contains("${field}")`),
    };
    fields = {
        username: "Username",
        password: "Password",
    }

    login({username = 'Admin', password = 'admin123'}) {
        cy.printTerminal(`Trying to logging in with username: ${username} and password: ${password}`);
        if(username) {
            this.elements.usernameInput().clear().type(username);
        }
        if(password) {
            this.elements.passwordInput().clear().type(password);
        }
        this.elements.loginButton().click();
    }

    checkUnsuccessfulLogin(message) {
        this.elements.errorMessage().should('be.visible').and('contain.text', message);
        cy.printTerminal('Login failed, error message is displayed: ' + message);
    }

    checkEmptyFieldError(field, message) {
        this.elements.emptyUsernameFieldError(field).should('be.visible')
            .and('contain.text', message);
        cy.printTerminal(`Login failed, empty field error for ${field} is displayed: ` + message);
    }
}

export default new LoginPage();