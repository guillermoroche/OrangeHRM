import loginpage from '../pages/common/LoginPage';
import commonmenupage from '../pages/common/CommonMenuPage';
import viewemployees from '../pages/pim/ViewEmployees';
import addemployeeform from '../pages/pim/AddEmployeeForm';
import employeeprofile from '../pages/pim/EmployeeProfile';
import viewsystemusers from '../pages/admin/ViewSystemUsers';
import createuserform from '../pages/admin/CreateUserForm';
import editUserForm from '../pages/admin/editUserForm';
import LoginErrorMessagesjson from '../fixtures/LoginErrorMessages.json';
import { generateRandomEmployee, userRoles } from '../utils/generateRandomEmployee';


describe('Employee Management Test cases\n', () => {
  beforeEach(() => {
    cy.visit('/index.php/auth/login');
    loginpage.login({});
  });
  it('Employee management page is accessible and loads', () => {
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.checkEmployeesPageLoads();
  });

  it('Employee can be created (no login credentials)', () => {
    let employeeData = generateRandomEmployee();
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employeeData);
    employeeprofile.checkEmployeeDetails(employeeData);
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
  });

  it('Employee can be created with login credentials', () => {
    let employeeData = generateRandomEmployee({
      createLogin: true,
      loginEnabled: true
    });
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employeeData);
    employeeprofile.checkEmployeeDetails(employeeData);
    //TODO check that the user was created in the admin section
    commonmenupage.logout();
    loginpage.login({
      username: employeeData.username,
      password: employeeData.password
    });
    commonmenupage.checkSuccessfulLogin();
  });

  it('Employee can be created without login credentials, and then login credentials can be added later', () => {
    let employeeData = generateRandomEmployee({
      createLogin: false,
      loginEnabled: false
    });
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employeeData);
    employeeprofile.checkEmployeeDetails(employeeData);

    // Now add login credentials
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    viewsystemusers.clickAddUserButton();
    createuserform.fillFormFields(employeeData);

  });

  it.only('Can disable user after creating it', () => {
    let employeeData = generateRandomEmployee({
      createLogin: true,
      loginEnabled: true
    });
    commonmenupage.clickMenuItem(commonmenupage.menuItems.pim);
    viewemployees.clickAddEmployeeButton();
    addemployeeform.fillFormFields(employeeData);
    employeeprofile.checkEmployeeDetails(employeeData);
    // Now add login credentials
    commonmenupage.clickMenuItem(commonmenupage.menuItems.admin);
    
    // Disable the user
    viewsystemusers.searchUser(employeeData);
    viewsystemusers.clickEditUserButton(employeeData);
    editUserForm.fillEditFormFields({
      status: 'Disabled'
    });
    employeeData.userStatus = 'Disabled'; // Update the employeeData to reflect the new status
    // Try to login with the disabled user
    commonmenupage.logout();
    loginpage.login({
      username: employeeData.username,
      password: employeeData.password
    });
    loginpage.checkUnsuccessfulLogin(LoginErrorMessagesjson.accountDisabled);
  })

});
