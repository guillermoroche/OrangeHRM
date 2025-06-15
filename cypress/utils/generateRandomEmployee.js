const { faker } = require("@faker-js/faker");

function generateRandomEmployee() {
    let employeeData = {};

    employeeData.firstName = faker.person.firstName();
    employeeData.middleName = faker.person.firstName();
    employeeData.lastName = faker.person.lastName();
    employeeData.employeeId = faker.number.int({ min: 100000, max: 9999999 }).toString();
    employeeData.username = faker.internet.username({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName
    });
    return employeeData;
}

module.exports = generateRandomEmployee;