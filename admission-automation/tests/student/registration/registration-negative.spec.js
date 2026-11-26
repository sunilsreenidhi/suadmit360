import{test,expect}from'@playwright/test';
import{StudentRegistrationPage}from'../../../pages/student/StudentRegistrationPage.js';
import{getValidStudentData}from'../../../test-data/studentData.js';
import{NEGATIVE_TEST_DATA,ERROR_MESSAGES}from'../../../test-data/errorMessagesData.js';

test.describe('Student Registration Negative Test Cases',() => {
    
    let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new StudentRegistrationPage(page);
    await registrationPage.navigateToRegistration();
  });



test('Verify shows required errors for all empty mandatory fields', async ({ page }) => {
    await registrationPage.triggerAllRequiredValidations();
    await expect(registrationPage.titleError).toHaveText('Title required');
    await expect(registrationPage.firstNameError).toHaveText('Name required');
    await expect(registrationPage.lastNameError).toHaveText('Surname required');
    await expect(registrationPage.emailError).toHaveText('Email required');
    await expect(registrationPage.mobileError).toHaveText('Mobile number required');
  await expect(registrationPage.cityError).toHaveText('City required');
  await expect(registrationPage.courseError).toHaveText('Course required');
  await expect(registrationPage.passwordError).toHaveText('Password required');
  await expect(registrationPage.captchaError).toHaveText('Security code required');
  await expect(registrationPage.agreeError).toHaveText('Terms agreement required');

  //  await expect(registrationPage.submitButton).toBeDisabled();

});

test('Verify validation for Invalid Email Formats', async ({ page }) => { 
    const invalidEmails= ['student@','student.com','student@.com','student@com','student@domain..com'];
    for(const email of invalidEmails) {
        await registrationPage.email.fill(email);
        await registrationPage.email.press('Tab'); // Trigger blur event
     await expect(registrationPage.emailError).toHaveText('Please enter a valid email id.'); 
  
    }
});

test('Verify shows error for wrong OTP', async () => {
    await registrationPage.mobile.fill('9876543210');
    await registrationPage.clickVerifyPhone();
    await registrationPage.otpInputField.fill('000000'); // wrong OTP
    await registrationPage.verifyOTP.click();
    await expect(registrationPage.otpError).toHaveText('Invalid OTP. Please try again.');
  });

  test('blocks registration when Terms & Conditions are unchecked', async ({ page }) => {
    const data = getValidStudentData();
    await registrationPage.fillRegistrationForm(data);
    await registrationPage.fillOtpField(data.mobile);
    await registrationPage.agreeCheckbox.uncheck();
    await expect(registrationPage.submitButton).toBeDisabled();
  });

  // Mobile validation tests driven by test data
  for (const { input, reason, expectedError } of NEGATIVE_TEST_DATA.invalidMobiles) {
    test(`rejects invalid mobile "${input}" (${reason})`, async () => {
      await registrationPage.mobile.fill(input);
      await registrationPage.mobile.blur();
      await expect(registrationPage.mobileError).toHaveText(expectedError);
      await expect(registrationPage.submitButton).toBeDisabled();
    });
  }

});