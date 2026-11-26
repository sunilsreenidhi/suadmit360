
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
    override: true
});

const environment = (process.env.ENV || 'stg')
    .trim()
    .toLowerCase();

const environments = {
    dev: process.env.DEV_BASE_URL,
    stg: process.env.STG_BASE_URL,
    prod: process.env.PROD_BASE_URL
};

const baseURL = environments[environment];

console.log('Environment:', environment);
console.log('Base URL:', baseURL);

if (!baseURL) {
    throw new Error(`Missing URL for environment: ${environment}`);
}

export const urls = {
    baseURL,
    studentRegistration: `${baseURL}/student/apply-now`,
    studentLogin: `${baseURL}/login`,
    dashboard: `${baseURL}/dashboard`
};
