import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Client, Account } from 'node-appwrite';

export async function POST(request) {
  const { emailOrPhone, password } = await request.json();

  if (!emailOrPhone || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    );
  }

  try {
    // Create Appwrite client with server SDK
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.NEXT_APPWRITE_KEY); // Required for server-side operations

    const account = new Account(client);

    console.log('Server configuration:', {
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
      hasKey: !!process.env.NEXT_APPWRITE_KEY
    });

    // Authenticate User
    const session = await account.createEmailSession(emailOrPhone, password);
    
    if (!session) {
      throw new Error('Failed to create session');
    }

    const user = await account.get();

    if (!user) {
      throw new Error('Failed to get user details');
    }

    // Set session cookie
    try {
      cookies().set('my-custom-session', session.$id, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    } catch (cookieError) {
      console.warn('Failed to set cookie:', cookieError.message);
    }

    return NextResponse.json(
      {
        message: 'Login successful',
        sessionId: session.$id,
        user: {
          $id: user.$id,
          email: user.email
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', {
      message: error?.message,
      stack: error?.stack,
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
      error: error
    });

    return NextResponse.json(
      {
        message: 'Login failed',
        error: error?.message || 'Unknown error occurred'
      },
      { status: 400 }
    );
  }
}

export const runtime = 'edge';
