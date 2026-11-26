
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});


export async function getLatestOtp(phoneNumber) {
    if (!phoneNumber) {
        throw new Error('Phone number is required');
    }

    phoneNumber = String(phoneNumber).trim();

    if (!phoneNumber.startsWith('+91')) {
        phoneNumber = '+91' + phoneNumber;
    }

    // Wait for OTP generation and database insertion
    await new Promise(resolve => setTimeout(resolve, 2000));

    const sql = `
        SELECT otp_code
        FROM otps
        WHERE phone_number = ?
        ORDER BY created_at DESC
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [phoneNumber]);

    if (rows.length === 0) {
        throw new Error(`OTP not found for ${phoneNumber}`);
    }

    console.log('OTP found successfully.');

    return String(rows[0].otp_code);
}