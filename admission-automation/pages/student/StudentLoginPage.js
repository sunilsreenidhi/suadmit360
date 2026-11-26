// pages/student/StudentLoginPage.js
export class StudentLoginPage {
  constructor(page) {
    this.page = page;

    // Navigation Tabs
    this.registerTab = page.getByRole('button', { name: /Register/i });
    this.loginTab = page.getByRole('button', { name: /Login/i }).first();

    // Form Controls
    this.emailOrPhoneInput = page.locator('[formcontrolname="email"]');
    this.passwordInput = page.locator('[formcontrolname="password"]');
    this.togglePasswordVisibilityBtn = page.locator('//input[@formcontrolname="password"]/following-sibling::button');
    this.rememberMeCheckbox = page.locator('//label[.//input[@formcontrolname="remember"]]'); 
       this.loginSubmitBtn = page.locator('form button[type="submit"]');
    this.profileMenuBtn = page.locator('//button[.//i[contains(@class,"mdi-account-outline")]]');
    this.logoutBtn = page.getByRole('button', { name: /Logout/i });
    // Error Message Locators (matching your XPath convention)
    this.emailOrPhoneError = page.locator('//input[@formcontrolname="email"]/following-sibling::span');
    this.passwordError = page.locator('//input[@formcontrolname="password"]/parent::div/following-sibling::span');
    this.loginAuthError = page.locator('div.bg-red-100.text-red-600').filter({ has: page.locator('button i.mdi-close') }).locator('span').first();

  }

  async navigateToLogin() {
    await this.page.goto('/student/apply-now');
  }

  async switchToLoginTab() {
    await this.loginTab.click();
    await this.emailOrPhoneInput.waitFor({ state: 'visible' });
  }

  async login(emailOrPhone, password) {
 //   await this.switchToLoginTab();
    await this.emailOrPhoneInput.fill(emailOrPhone);
    await this.passwordInput.fill(password);
    await this.loginSubmitBtn.click();
  }

  async loginWithRememberMe(emailOrPhone, password) {
 //   await this.switchToLoginTab();
    await this.emailOrPhoneInput.fill(emailOrPhone);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.loginSubmitBtn.click();
  }

  async studentLogOut() {
    await this.profileMenuBtn.click();
    await this.logoutBtn.click();

  }

   async triggerAllRequiredLoginValidations() {
        await this.emailOrPhoneInput.focus();
        await this.emailOrPhoneInput.blur();
        await this.passwordInput.focus();
        await this.passwordInput.blur();
}
}