import loginpage from '../pages/common/LoginPage';
import commonmenupage from '../pages/common/CommonMenuPage';
import ViewSistemUsers from '../pages/admin/ViewSystemUsers';
import LoginErrorMessagesjson from '../fixtures/LoginErrorMessages.json';
import viewemployees from '../pages/pim/ViewEmployees';
import addemployeeform from '../pages/pim/AddEmployeeForm';
import CreateUserForm from '../pages/admin/CreateUserForm';
import { generateRandomEmployee, userRoles, userStatuses } from '../utils/generateRandomEmployee';


describe('Admin test cases\n', () => {
  beforeEach(() => {
    cy.visit('/index.php/auth/login');
    loginpage.login({});
  });
  it('Admin page is accessible and loads', () => {
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
  });

  it('Add User button shows user creation form', () => {
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.clickAddUserButton();
  });

  it('ESS user can be created', () => {
    const employee = generateRandomEmployee({userRole: userRoles.ESS});

    //STEP 1: Create employee without login credentials
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employee); // Assuming this creates the employee without login credentials
    //STEP 2: Create account for the employee, ESS privileges
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.clickAddUserButton();
    CreateUserForm.fillFormFields(employee)
    //STEP 3: Check the user is displayed in the user list
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.searchUser(employee);
    //STEP 3: Login with the created account
    commonmenupage.logout();
    loginpage.login({
      username: employee.username,
      password: employee.password
    });
    commonmenupage.checkSuccessfulLogin();
    //STEP 4: Check that the user has ESS privileges
  
  });

  it('Admin user can be created', () => {
    const employee = generateRandomEmployee({userRole: userRoles.Admin});

    //STEP 1: Create employee without login credentials
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employee); // Assuming this creates the employee without login credentials
    //STEP 2: Create account for the employee, Admin privileges
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.clickAddUserButton();
    CreateUserForm.fillFormFields(employee)
    //STEP 3: Check the user is displayed in the user list
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.searchUser(employee);
    //STEP 4: Login with the created account
    commonmenupage.logout();
    loginpage.login({
      username: employee.username,
      password: employee.password
    });
    commonmenupage.checkSuccessfulLogin();
    //STEP 3: Check that the user has Admin privileges
  
  });

  it('ESS user created with disabled login cant login', () => {
    const employee = generateRandomEmployee({
      userRole: userRoles.ESS,
      createLogin: true,
      userStatus: userStatuses.Disabled,
    });

    //STEP 1: Create employee with disabled login credentials
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employee); 
    //STEP 3: Check the user is displayed in the user list
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.searchUser(employee);
    //STEP 2: Try to login with the created account
    commonmenupage.logout();
    loginpage.login({
      username: employee.username,
      password: employee.password
    });
    loginpage.checkUnsuccessfulLogin(LoginErrorMessagesjson.accountDisabled);
  });

  it('Admin user created with disabled login cant login', () => {

    const employee = generateRandomEmployee({
      userRole: userRoles.Admin,
      createLogin: false,
      userStatus: userStatuses.Disabled,
    });

    //STEP 1: Create employee with disabled login credentials
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employee);
    //STEP 2: Create account for the employee, Admin privileges
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.clickAddUserButton();
    CreateUserForm.fillFormFields(employee) 
    //STEP 3: Check the user is displayed in the user list
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.searchUser(employee);
    //STEP 2: Try to login with the created account
    commonmenupage.logout();
    loginpage.login({
      username: employee.username,
      password: employee.password 
    });
    loginpage.checkUnsuccessfulLogin(LoginErrorMessagesjson.accountDisabled);
  });

  it('Employee can be created without login credentials, and then login credentials can be added later', () => {
    let employeeData = generateRandomEmployee({
      createLogin: false,
      loginEnabled: false
    });
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employeeData);
    // Now add login credentials
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    ViewSistemUsers.clickAddUserButton();
    CreateUserForm.fillFormFields(employeeData);
  });

});
