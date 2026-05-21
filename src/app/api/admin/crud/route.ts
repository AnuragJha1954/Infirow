import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (process.env.POSTGRES_URL) {
      await sql`CREATE TABLE IF NOT EXISTS waitlist (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
      await sql`INSERT INTO waitlist (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING;`;
      const result = await sql`SELECT email FROM waitlist ORDER BY id ASC;`;
      return NextResponse.json({ success: true, waitlist: result.rows.map(r => r.email) });
    } else {
      const filePath = path.join(process.cwd(), 'waitlist.json');
      let waitlist = [];
      try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        waitlist = JSON.parse(fileData);
      } catch (e) {}

      if (!waitlist.includes(email)) {
        waitlist.push(email);
        await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2));
      }
      return NextResponse.json({ success: true, waitlist });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { oldEmail, newEmail } = await request.json();
    
    if (process.env.POSTGRES_URL) {
      await sql`UPDATE waitlist SET email = ${newEmail} WHERE email = ${oldEmail};`;
      const result = await sql`SELECT email FROM waitlist ORDER BY id ASC;`;
      return NextResponse.json({ success: true, waitlist: result.rows.map(r => r.email) });
    } else {
      const filePath = path.join(process.cwd(), 'waitlist.json');
      const fileData = await fs.readFile(filePath, 'utf-8');
      let waitlist = JSON.parse(fileData);
      
      const index = waitlist.indexOf(oldEmail);
      if (index !== -1) {
        waitlist[index] = newEmail;
        await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2));
        return NextResponse.json({ success: true, waitlist });
      }
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { email } = await request.json();
    
    if (process.env.POSTGRES_URL) {
      await sql`DELETE FROM waitlist WHERE email = ${email};`;
      const result = await sql`SELECT email FROM waitlist ORDER BY id ASC;`;
      return NextResponse.json({ success: true, waitlist: result.rows.map(r => r.email) });
    } else {
      const filePath = path.join(process.cwd(), 'waitlist.json');
      const fileData = await fs.readFile(filePath, 'utf-8');
      let waitlist = JSON.parse(fileData);
      
      waitlist = waitlist.filter((e: string) => e !== email);
      await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2));
      return NextResponse.json({ success: true, waitlist });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
