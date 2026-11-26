import{test,expect}from'@playwright/test';
import { getValidStudentData } from '../../../test-data/studentData.js';
import { StudentRegistrationPage } from '../../../pages/student/StudentRegistrationPage.js';
import { AdminLoginPage } from '../../../pages/student/AdminLoginPage.js';
import { AdminSidebarPage } from '../../../pages/student/AdminSidebarPage.js';
import { RawLeadsPage } from '../../../pages/student/RawLeadsPage.js';

test('Verify Student Registration is Successful--> Displayed in Raw Leads--> Register Now tab', async ({ page }) => {

    const registrationPage = new StudentRegistrationPage(page);
    const studentData= getValidStudentData();
    await registrationPage.navigateToRegistration();
    await registrationPage.fillRegistrationForm(studentData);
    await registrationPage.fillOtpField(studentData.mobile);
     await registrationPage.submitRegistration();
    await expect(page).toHaveURL(/.*dashboard/);
    
    const adminLoginPage = new AdminLoginPage(page);     
    await adminLoginPage.navigateToLogin();
    await adminLoginPage.enterEmail(process.env.ADMIN_USERNAME);
    await adminLoginPage.enterPassword(process.env.ADMIN_PASSWORD);
    await adminLoginPage.clickLogin();
    await expect(page).toHaveURL(/.*dashboard/);

    const adminsidebarPage = new AdminSidebarPage(page);
    await adminsidebarPage.goToRawLeads();  
    const rawLeadsPage = new RawLeadsPage(page);
    await rawLeadsPage.openRegisterNowTab();
    await rawLeadsPage.verifyRegisteredStudent(studentData);

});
