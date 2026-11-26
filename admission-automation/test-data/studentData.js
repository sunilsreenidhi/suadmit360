
import {
    generateMobileNumber,
    generateStudentName
} from '../utils/utils.js';

export function getValidStudentData() {

    const studentName = generateStudentName();

    return {
        title: 'Mr',
        firstName: studentName.firstName,
        lastName: studentName.lastName,
        email: `student${Date.now()}@yopmail.com`,
        countryCode: '+91',
        mobile: generateMobileNumber(),
        state: 'Telangana',
        city: 'Hyderabad',
        course: 'UG-BTECH-ET',
        password: 'Sree@123'
       // password: process.env.STUDENT_TEST_PASSWORD
    };
}
