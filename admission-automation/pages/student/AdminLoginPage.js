import {expect} from '@playwright/test';

export class AdminLoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator('[formcontrolname="email"]');
        this.password = page.locator('[formcontrolname="password"]');
        this.loginButton = page.getByRole('button', { name: 'LOGIN' });
        this.rememberMeCheckbox = page.locator('[formcontrolname="remember"]');
    }

    async navigateToLogin() {
        await this.page.goto(process.env.STG_BASE_URL);
        expect(this.email).toBeVisible();``
    }

    async enterEmail(value) {
        await this.email.fill(value);
    }

    async enterPassword(value) {
        await this.password.fill(value);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async clickRememberMe() {
        await this.rememberMeCheckbox.click();
    }
}