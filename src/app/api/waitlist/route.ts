import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // 1. Store the email (Postgres if available, else local JSON fallback)
    const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (dbUrl) {
      try {
        // Ensure table exists
        await sql`CREATE TABLE IF NOT EXISTS waitlist (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
        // Insert if not exists
        await sql`INSERT INTO waitlist (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING;`;
      } catch (dbError) {
        console.error('Postgres Error:', dbError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    } else {
      const filePath = path.join(process.cwd(), 'waitlist.json');
      let waitlist = [];
      try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        waitlist = JSON.parse(fileData);
      } catch (error) {}

      if (!waitlist.includes(email)) {
        waitlist.push(email);
        await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2));
      }
    }

    // 2. Setup Nodemailer Transporter
    const smtpPassword = process.env.SMTP_PASSWORD?.replace(/\s/g, '') || 'gxyazjmrnvtuywts';
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'work.infirow@gmail.com',
        pass: smtpPassword, // App password
      },
    });

    // 3. Email Template
    const mailOptions = {
      from: '"Infirow Team" <work.infirow@gmail.com>',
      to: email,
      subject: 'Welcome to Infirow Early Access',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 40px 20px; background-color: #0D0C14; font-family: 'Inter', Arial, sans-serif; color: #F0EFF8;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #12111E; border: 1px solid rgba(166, 124, 197, 0.2); border-radius: 24px; padding: 48px;">
            <tr>
              <td align="center" style="padding-bottom: 32px;">
                <img src="cid:infirowlogo" alt="Infirow" style="display: block; width: 140px; height: auto;" />
              </td>
            </tr>
            <tr>
              <td align="center">
                <h1 style="font-weight: 200; font-size: 36px; margin: 0 0 24px; letter-spacing: -1px; color: #F0EFF8;">
                  Welcome to the <span style="color: #A67CC5;">Future.</span>
                </h1>
                <p style="color: #8C8AA8; font-size: 16px; line-height: 1.8; margin: 0 0 32px; font-weight: 300;">
                  You've successfully secured your spot on our early access waitlist. We're building the ultimate wealth and life operating system, and we can't wait to share it with you.
                </p>
                
                <div style="background-color: rgba(166, 124, 197, 0.05); border: 1px solid rgba(166, 124, 197, 0.15); border-radius: 12px; padding: 24px; margin-bottom: 40px; text-align: left;">
                  <h2 style="font-weight: 400; font-size: 14px; margin: 0 0 16px; color: #A67CC5; text-transform: uppercase; letter-spacing: 0.1em;">What's Next?</h2>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                    <tr>
                      <td width="24" valign="top"><span style="color: #7B5EA7; font-size: 18px;">&bull;</span></td>
                      <td><p style="margin: 0; color: #F0EFF8; font-size: 15px; font-weight: 300;"><strong>Simplifi Core:</strong> AI-driven transaction categorization and predictive cashflow routing.</p></td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                    <tr>
                      <td width="24" valign="top"><span style="color: #7B5EA7; font-size: 18px;">&bull;</span></td>
                      <td><p style="margin: 0; color: #F0EFF8; font-size: 15px; font-weight: 300;"><strong>Algo Sandbox:</strong> Build trading strategies visually using 1-minute historical tick data.</p></td>
                    </tr>
                  </table>

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="24" valign="top"><span style="color: #7B5EA7; font-size: 18px;">&bull;</span></td>
                      <td><p style="margin: 0; color: #F0EFF8; font-size: 15px; font-weight: 300;"><strong>Cohort Access:</strong> You will receive an exclusive invite key when your batch is unlocked.</p></td>
                    </tr>
                  </table>
                </div>

                <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 32px; text-align: center;">
                  <div style="margin-bottom: 24px;">
                    <a href="#" style="color: #8C8AA8; text-decoration: none; margin: 0 12px; font-size: 14px;">Twitter</a>
                    <a href="#" style="color: #8C8AA8; text-decoration: none; margin: 0 12px; font-size: 14px;">LinkedIn</a>
                    <a href="#" style="color: #8C8AA8; text-decoration: none; margin: 0 12px; font-size: 14px;">Website</a>
                  </div>
                  <p style="color: #8C8AA8; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5;">
                    This is an automated message. No need to reply.
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: 'Logo.png',
          path: path.join(process.cwd(), 'public', 'Logos', 'Logo.png'),
          cid: 'infirowlogo'
        }
      ]
    };

    // 4. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
