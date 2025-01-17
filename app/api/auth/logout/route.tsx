import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSessionClient } from '../../../lib/server/appwrite';
import { type AppwriteError } from '../../../components/utils/Types';

export async function POST(): Promise<NextResponse> {
  try {
    const { account } = await createSessionClient();

    await account.deleteSession('current');

    cookies().delete('my-custom-session');

    // Redirect the user to the login page
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    const appwriteError = error as AppwriteError;
    return NextResponse.json(
      {
        message:
          appwriteError?.response?.message ?? 'An error occurred during logout',
      },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
