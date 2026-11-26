import { test, expect } from '@playwright/test';
import { StudentLoginPage } from '../../../pages/student/StudentLoginPage.js';
import{LOGIN_NEGATIVE_TEST_DATA, LOGIN_ERROR_MESSAGES}from'../../../test-data/errorMessagesData.js';

 const {EMAIL_REQUIRED,PASSWORD_REQUIRED,INVALID_EMAIL_OR_PHONE}=LOGIN_ERROR_MESSAGES;
test.describe('Student Login Negative Test Cases', () => {
  let studentLogin;

  test.beforeEach(async ({ page }) => {
    studentLogin = new StudentLoginPage(page);
     await studentLogin.navigateToLogin();
     await studentLogin.switchToLoginTab();
   

  })

  test('displays required field errors when email/phone and password are empty', async ({ page }) =>{
    await studentLogin.triggerAllRequiredLoginValidations();
   await expect(studentLogin.emailOrPhoneError).toHaveText(LOGIN_ERROR_MESSAGES.EMAIL_REQUIRED);
    await expect(studentLogin.passwordError).toHaveText(LOGIN_ERROR_MESSAGES.PASSWORD_REQUIRED);
    await expect(studentLogin.loginSubmitBtn).toBeDisabled();
    await expect(page).not.toHaveURL(/.*dashboard/);
  })

  test('displays error when email/phone is empty and password is provided', async ({ page }) => {
    await studentLogin.passwordInput.fill('ValidPass123!');
    await studentLogin.emailOrPhoneInput.focus();
    await studentLogin.emailOrPhoneInput.press('Tab'); // Or click submit if button isn't disabled
    await expect(studentLogin.emailOrPhoneError).toHaveText(LOGIN_ERROR_MESSAGES.EMAIL_REQUIRED);
    await expect(studentLogin.loginSubmitBtn).toBeDisabled();
    await expect(page).not.toHaveURL(/.*dashboard/);
  });

  test('displays error when email/phone is provided and password is empty', async ({ page }) => {
    await studentLogin.emailOrPhoneInput.fill('student@example.com');
    await studentLogin.passwordInput.focus();
    await studentLogin.passwordInput.press('Tab');

    await expect(studentLogin.passwordError).toHaveText(LOGIN_ERROR_MESSAGES.PASSWORD_REQUIRED);
    await expect(studentLogin.loginSubmitBtn).toBeDisabled();
    await expect(page).not.toHaveURL(/.*dashboard/);
  });

  for (const { input, reason, expectedError } of LOGIN_NEGATIVE_TEST_DATA.invalidEmails) {
      test(`Verify invalid email validations triggering "${input}" (${reason})`, async ({page}) => {
    await studentLogin.emailOrPhoneInput.fill(input);
    await studentLogin.passwordInput.fill('ValidPass123!');
    await expect(studentLogin.emailOrPhoneError).toHaveText(expectedError);
    await expect(studentLogin.loginSubmitBtn).toBeDisabled();
    await expect(page).not.toHaveURL(/.*dashboard/);
  });
}

  test('displays validation error for invalid phone number length', async ({ page }) => {
    await studentLogin.emailOrPhoneInput.fill('12345'); // Too short
    await studentLogin.passwordInput.fill('ValidPass123!');

    await expect(studentLogin.emailOrPhoneError).toHaveText(LOGIN_ERROR_MESSAGES.INVALID_EMAIL_OR_PHONE);
    await expect(studentLogin.loginSubmitBtn).toBeDisabled();
    await expect(page).not.toHaveURL(/.*dashboard/);
  });

  test('displays authentication error for unregistered email/phone', async ({ page }) => {
    await studentLogin.login('unregistered_user@example.com',process.env.STUDENT_PASSWORD);

    await expect(studentLogin.loginAuthError).toHaveText(LOGIN_ERROR_MESSAGES.EMAIL_AUTH_ERROR);
    await expect(page).not.toHaveURL(/.*dashboard/);
  });

  test('displays authentication error for valid email with wrong password', async ({ page }) => {
    await studentLogin.login(process.env.STUDENT_EMAIL, 'WrongPassword999!');

    await expect(studentLogin.loginAuthError).toHaveText(LOGIN_ERROR_MESSAGES.PASSWORD_AUTH_ERROR);
    await expect(page).not.toHaveURL(/.*dashboard/);
  });

  test('handles leading and trailing whitespace or rejects whitespace-only inputs', async ({ page }) => {
    await studentLogin.emailOrPhoneInput.fill('   '+process.env.STUDENT_EMAIL+ '   ');
    await studentLogin.passwordInput.fill(process.env.STUDENT_PASSWORD);
    await studentLogin.loginSubmitBtn.click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  });
