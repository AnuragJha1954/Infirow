import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { action, password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'infirow2026';

    if (action === 'login') {
      if (password === adminPassword) {
        const response = NextResponse.json({ success: true });
        // Set HTTP-only secure cookie
        response.cookies.set({
          name: 'admin_auth',
          value: 'authenticated',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24, // 1 day
        });
        return response;
      } else {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
    } else if (action === 'logout') {
      const response = NextResponse.json({ success: true });
      response.cookies.delete('admin_auth');
      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
