// utils/registrationTestData.js
export const ERROR_MESSAGES = {
  TITLE_REQUIRED: 'Title required',
  INVALID_EMAIL: 'Please enter a valid email id.',
  INVALID_MOBILE: 'Please enter a valid Indian mobile number (10 digits starting with 6-9)',
  MOBILE_REQUIRED: 'Mobile number required',
  CITY_REQUIRED: 'City required',
  COURSE_REQUIRED: 'Course required',
  PASSWORD_REQUIRED: 'Password required',
  CAPTCHA_REQUIRED: 'Security code required',
};

export const LOGIN_ERROR_MESSAGES = {

  EMAIL_REQUIRED: 'Required field',
  INVALID_EMAIL_OR_PHONE: 'Enter a valid email address or phone number',
  PASSWORD_REQUIRED: 'Required field',
  INVALID_PASSWORD: 'Password is incorrect',
  EMAIL_AUTH_ERROR: 'Email or Phone number not found',
  PASSWORD_AUTH_ERROR:'Password is incorrect',

};
//const { EMAIL_REQUIRED, PASSWORD_REQUIRED,INVALID_EMAIL_OR_PHONE} = LOGIN_ERROR_MESSAGES;

export const NEGATIVE_TEST_DATA = {
  invalidEmails: [
    { input: 'student@', reason: 'missing domain', expectedError: ERROR_MESSAGES.INVALID_EMAIL },
    { input: 'student.com', reason: 'missing @', expectedError: ERROR_MESSAGES.INVALID_EMAIL },
    { input: 'student@.com', reason: 'starts with dot', expectedError: ERROR_MESSAGES.INVALID_EMAIL },
    { input: 'student@com', reason: 'missing TLD', expectedError: ERROR_MESSAGES.INVALID_EMAIL },
    { input: 'student@domain..com', reason: 'double dot', expectedError: ERROR_MESSAGES.INVALID_EMAIL },
  ],

  invalidMobiles: [
    { input: '12345', reason: 'less than 10 digits', expectedError: ERROR_MESSAGES.INVALID_MOBILE },
    { input: '5123456789', reason: 'does not start with 6-9', expectedError: ERROR_MESSAGES.INVALID_MOBILE },
    { input: '', reason: 'empty', expectedError: ERROR_MESSAGES.MOBILE_REQUIRED },
  ],
};

export const LOGIN_NEGATIVE_TEST_DATA = {
  invalidEmails: [
    { input: 'student@', reason: 'missing domain', expectedError: LOGIN_ERROR_MESSAGES.INVALID_EMAIL_OR_PHONE },
    { input: 'student.com', reason: 'missing @', expectedError: LOGIN_ERROR_MESSAGES.INVALID_EMAIL_OR_PHONE },
    { input: 'student@.com', reason: 'starts with dot', expectedError: LOGIN_ERROR_MESSAGES.INVALID_EMAIL_OR_PHONE },
    { input: 'student@com', reason: 'missing TLD', expectedError: LOGIN_ERROR_MESSAGES.INVALID_EMAIL_OR_PHONE },
  ],
};