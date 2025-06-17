const { faker } = require("@faker-js/faker");

const userRoles = {
    Admin: 'Admin',
    ESS: 'ESS',
}

const userStatuses = {
    Enabled: 'Enabled',
    Disabled: 'Disabled',
}

function generateRandomEmployee({
    createLogin = false,
    password = 'admin123',
    confirmPassword = 'admin123',
    userRole = userRoles.ESS,
    userStatus = userStatuses.Enabled
} = {}) {
    let employeeData = {};

    employeeData.firstName = faker.person.firstName();
    employeeData.middleName = faker.person.firstName();
    employeeData.lastName = faker.person.lastName();
    employeeData.employeeId = faker.number.int({ min: 100000, max: 9999999 }).toString();

    employeeData.createLogin = createLogin;
    employeeData.userRole = userRole;
    employeeData.username = faker.internet.username({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName
    });
    employeeData.password = password; // Default password, can be changed later
    employeeData.confirmedPassword = confirmPassword; // Default confirm password, can be changed later
    employeeData.userStatus = userStatus;
    return employeeData;
}

module.exports = {
    generateRandomEmployee,
    userRoles,
    userStatuses

};