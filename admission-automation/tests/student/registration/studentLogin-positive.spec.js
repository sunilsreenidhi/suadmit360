import { test, expect } from '@playwright/test';
import { StudentLoginPage } from '../../../pages/student/StudentLoginPage.js';

test.describe('Student Login Positive Test Cases', () => {
  let studentLogin;

  test.beforeEach(async ({ page }) => {
    studentLogin = new StudentLoginPage(page);
     await studentLogin.navigateToLogin();
     await studentLogin.switchToLoginTab();


  });

  test('TC_LOG_01 Verify Student Login with Valid Email and Password', async ({page}) => {
    {
        await studentLogin.switchToLoginTab();
        await studentLogin.login(process.env.STUDENT_EMAIL,process.env.STUDENT_PASSWORD);
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(studentLogin.profileMenuBtn).toBeVisible();
    }
})

    test('TC_LOG_02 Verify Student Login with Valid Phone and Password', async ({page}) => {
    {
        await studentLogin.login(process.env.STUDENT_PHONE,process.env.STUDENT_PASSWORD);
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(studentLogin.profileMenuBtn).toBeVisible();
    }
})

    test('TC_LOG_03 verify Login & Remember Me checked retains Email/Phone after logout', async ({ page }) => {
        {
        const credential = process.env.STUDENT_EMAIL || process.env.STUDENT_PHONE;
        await studentLogin.loginWithRememberMe(credential,process.env.STUDENT_PASSWORD);
        await expect(page).toHaveURL(/.*dashboard/);
        await studentLogin.studentLogOut();
        await expect(studentLogin.emailOrPhoneInput).toHaveValue(credential);
    }

})

test('TC_LOG_04: Remember Me unchecked clears Email/Phone after logout', async ({ page }) => {
    const credential = process.env.STUDENT_EMAIL || process.env.STUDENT_PHONE;
    await studentLogin.login(credential, process.env.STUDENT_PASSWORD, { rememberMe: false });
    await expect(page).toHaveURL(/.*dashboard/);
    await studentLogin.studentLogOut();
    await expect(studentLogin.emailOrPhoneInput).toHaveValue('');
  });

  test('TC_LOG_05: Login button enables only after valid Email/Phone and Password are entered', async () => {
    await expect(studentLogin.loginSubmitBtn).toBeDisabled();

    await studentLogin.emailOrPhoneInput.fill(process.env.STUDENT_EMAIL);
    await expect(studentLogin.loginSubmitBtn).toBeDisabled();

    await studentLogin.passwordInput.fill(process.env.STUDENT_PASSWORD);
    await expect(studentLogin.loginSubmitBtn).toBeEnabled();
  });

  test('TC_LOG_06: Submit login form using Enter key in Password field', async ({ page }) => {
    await studentLogin.emailOrPhoneInput.fill(process.env.STUDENT_EMAIL);
    await studentLogin.passwordInput.fill(process.env.STUDENT_PASSWORD);
    await studentLogin.passwordInput.press('Enter');

    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('TC_LOG_07: Toggle password visibility icon before logging in', async ({ page }) => {
   
    await studentLogin.emailOrPhoneInput.fill(process.env.STUDENT_EMAIL);
    await studentLogin.passwordInput.fill(process.env.STUDENT_PASSWORD);

    await expect(studentLogin.passwordInput).toHaveAttribute('type', 'password');
    await studentLogin.togglePasswordVisibilityBtn.click();
    await expect(studentLogin.passwordInput).toHaveAttribute('type', 'text');
    await studentLogin.loginSubmitBtn.click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

})
