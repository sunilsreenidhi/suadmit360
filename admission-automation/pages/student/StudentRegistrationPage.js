   import { expect } from '@playwright/test';
   import { getLatestOtp } from '../../utils/dbutils.js';
   export class StudentRegistrationPage {
        constructor(page) {
            this.page = page;
            this.form = page.locator('form');
        
      // Registration / Login tabs
        this.registerTab = page.getByRole('button', { name: 'Register' });
        this.loginTab = page.getByRole('button', { name: 'Login' });

        // Personal information
        this.title = page.locator('[formcontrolname="title"]');
        this.firstName = page.locator('[formcontrolname="firstName"]');
        this.lastName = page.locator('[formcontrolname="lastName"]');
        this.email = page.locator('[formcontrolname="email"]');

        // Mobile information
        this.countryCode = page.locator('[formcontrolname="countryCode1"]');
        this.mobile = page.locator('[formcontrolname="mobile"]');
        this.verifyPhoneButton = page.getByRole('button', { name: 'Verify Phone Number' });
        this.otpInputField= page.locator('[formcontrolname="otp"]');
        this.verifyOTP= page.getByRole('button', { name: 'Verify OTP' });
        this.altCountryCode = page.locator('[formcontrolname="countryCode2"]');
        this.altMobile = page.locator('[formcontrolname="altMobile"]');

        // Location
        this.state = page.locator('[formcontrolname="state"]');
        this.city = page.locator('[formcontrolname="city"]');

        // Course details
        this.course = page.locator('[formcontrolname="course"]');
        this.specialization = page.locator('[formcontrolname="specialization"]');
        this.specialization = page.locator('[formcontrolname="specialization1"]');


        // Account details
        this.password = page.locator('[formcontrolname="password"]');
        this.captcha = page.locator('[formcontrolname="captcha"]');
        this.captchaText = page.locator('span.font-mono');


        // Terms and submission
        this.agreeCheckbox = page.locator('[formcontrolname="agree"]');
        this.submitButton = page.getByRole('button', { name: 'Submit Application' });

        // Field-Scoped Error Messages (span.text-red-500)
   // this.allErrorMessages = this.form.locator('span.text-red-500');
    // Clean XPath Error Locators
this.titleError = page.locator('//select[@formcontrolname="title"]/following-sibling::span');
this.firstNameError = page.locator('//input[@formcontrolname="firstName"]/following-sibling::span');
this.lastNameError = page.locator('//input[@formcontrolname="lastName"]/following-sibling::span');
this.emailError = page.locator('//input[@formcontrolname="email"]/ancestor::div[2]/following-sibling::span');
this.mobileError = page.locator('//input[@formcontrolname="mobile"]/parent::div/following-sibling::span');
this.altMobileError = page.locator('//input[@formcontrolname="altMobile"]/parent::div/following-sibling::span');
this.stateError = page.locator('//select[@formcontrolname="state"]/following-sibling::span');
this.cityError = page.locator('//select[@formcontrolname="city"]/following-sibling::span');
this.courseError = page.locator('//select[@formcontrolname="course"]/following-sibling::span');
this.specializationError = page.locator('//select[@formcontrolname="specialization"]/following-sibling::span');
this.passwordError = page.locator('//input[@formcontrolname="password"]/parent::div/following-sibling::span');
this.captchaError = page.locator('//input[@formcontrolname="captcha"]/following-sibling::span');
this.agreeError = page.locator('//input[@formcontrolname="agree"]/parent::label/following-sibling::span');    this.otpError= page.locator("//div/p[@class='text-red-500 text-xs mt-1 flex items-center']");
}
    

 async navigateToRegistration() {
            await this.page.goto('/student/apply-now');
             await expect(this.registerTab).toBeVisible();
    }

    async selectTitle(value) {
        await this.title.selectOption(value);
    }

    async enterFirstName(value) {
        await this.firstName.fill(value);
    }

    async enterLastName(value) {
        await this.lastName.fill(value);
    }

    async enterEmail(value) {
        await this.email.fill(value);
    }

    async selectCountryCode(value = '+91') {
        await this.countryCode.selectOption(value);
    }

    async enterMobile(value) {
        await this.mobile.fill(value);
    }

    async clickVerifyPhone()
    {
        await this.verifyPhoneButton.click();
    }

    async selectAlternateCountryCode(value = '+91') {
        await this.altCountryCode.selectOption(value);
    }

    async enterAlternateMobile(value) {
        await this.altMobile.fill(value);
    }

    async selectState(value) {
        await this.state.selectOption(value);
    }

    async selectCity(value) {
        await this.city.selectOption(value);
    }

    async selectCourse(value) {
        await this.course.selectOption(value);
        await expect(this.specialization).toBeEnabled();
    }

    async selectSpecialization(value) {
        await this.specialization.selectOption(value);
    }

    //  async selectSpecialization1(value) {
    //     await this.specialization1.selectOption(value);
    // }

    async getSpecializationOptions() {
        const options = await this.specialization.locator('option').allTextContents();
        return options.map(text => text.trim());
    }

    async enterPassword(value) {
        await this.password.fill(value);
    }

    async getCaptchaText() {
        return (await this.captchaText.innerText()).trim();
    }

    async enterCaptcha() {
        const captcha = await this.getCaptchaText();
        await this.captcha.fill(captcha);
    }

    async acceptTerms() {
        await this.agreeCheckbox.check();
    }

    async submitRegistration() {
        await this.submitButton.click();
    }

    async fillPersonalDetails(data) {
        await this.selectTitle(data.title);
        await this.enterFirstName(data.firstName);
        await this.enterLastName(data.lastName);
        await this.enterEmail(data.email);
    }

    async fillMobileDetails(data) {
        await this.selectCountryCode(data.countryCode || '+91');
        await this.enterMobile(data.mobile);

        if (data.altMobile) {
            await this.selectAlternateCountryCode(data.altCountryCode || '+91');
            await this.enterAlternateMobile(data.altMobile);
        }
    }

    async fillLocationDetails(data) {
        await this.selectState(data.state);
        await expect(this.city.locator('option').nth(1)).toBeAttached();
        await this.selectCity(data.city);
    }

    async fillCourseDetails(data) {
        await this.selectCourse(data.course);
 //       await this.selectSpecialization(data.specialization);
    //    await this.selectSpecialization1(data.specialization1);
    }

    async fillOtpField(phoneNumber) {
        await this.clickVerifyPhone();
        const otp= await getLatestOtp(phoneNumber);
        await this.otpInputField.isVisible();
         this.otpInputField.fill(otp);
        await this.verifyOTP.click();
    }

    async fillRegistrationForm(data) {
        await this.fillPersonalDetails(data);
        await this.fillMobileDetails(data);
        await this.fillLocationDetails(data);
        await this.fillCourseDetails(data);
        await this.enterPassword(data.password);
        await this.enterCaptcha();
        await this.acceptTerms();
       
    }

    async triggerAllRequiredValidations() {
        await this.title.focus();
        await this.title.blur();
        await this.firstName.focus();
        await this.firstName.blur();
        await this.lastName.focus();
        await this.lastName.blur();
        await this.email.focus();
        await this.email.blur();
        await this.mobile.focus();
        await this.mobile.blur();
        await this.city.focus();
        await this.city.blur();
        await this.course.focus();
        await this.course.blur();
        await this.password.focus();
        await this.password.blur();
        await this.captcha.focus();
        await this.captcha.blur();
        await this.agreeCheckbox.focus();
        await this.agreeCheckbox.blur();
       
    }

   }