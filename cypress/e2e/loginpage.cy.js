import loginpage from '../pages/common/LoginPage';
import commonmenupage from '../pages/common/CommonMenuPage';
import LoginErrorMessagesjson from '../fixtures/LoginErrorMessages.json';

describe('Login test cases\n\n\n', () => {
  beforeEach(() => {
    cy.visit('/index.php/auth/login');
    cy.printTerminal('Visiting the login page');
  });
  it('Successful Login', () => {
    loginpage.login({});
    commonmenupage.checkSuccessfulLogin();
  });
  it('Unsucessful Login (invalid credentials)', () => {
    loginpage.login({username: 'InvalidUser', password: 'InvalidPassword'});
    loginpage.checkUnsuccessfulLogin(LoginErrorMessagesjson.invalidCredentials);
  })

  it('Unsuccessful Login (empty username)', () => {
    loginpage.login({username: '', password: 'admin123'});
    loginpage.checkEmptyFieldError('username',LoginErrorMessagesjson.usernameRequired);
  });
  it('Unsuccessful Login (empty password)', () => {
    loginpage.login({username: 'Admin', password: ''});
    loginpage.checkEmptyFieldError('password',LoginErrorMessagesjson.passwordRequired);
  });
  it('Unsuccessful Login (empty username and password)', () => {
    loginpage.login({username: '', password: ''});
    loginpage.checkEmptyFieldError('username',LoginErrorMessagesjson.usernameRequired);
    loginpage.checkEmptyFieldError('password',LoginErrorMessagesjson.passwordRequired);
  });

});
