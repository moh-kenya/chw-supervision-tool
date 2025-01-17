import { NextResponse, type NextRequest } from 'next/server';
import { Client, Databases, type Models } from 'node-appwrite';
import {
  type AppwriteError,
  type RequestBody,
} from '../../../components/utils/Types';

export async function POST(req: NextRequest): Promise<NextResponse> {
  let response: NextResponse = NextResponse.json({});
  try {
    // Create an Appwrite admin client
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? '')
      .setKey(process.env.NEXT_APPWRITE_KEY ?? '');

    const databases = new Databases(client);
    const body: RequestBody = await req.json();
    const promise = databases.createDocument(
      '6744339a0037ac630b8e',
      '678a033d0018a3df499e',
      'unique()', // Assuming ID.unique() returns a string
      body
    );
    promise.then(
      (res: Models.Document) => {
        response = NextResponse.json(
          { message: 'Successfully created document' },
          { status: 200 }
        );
      },
      (error: AppwriteError) => {
        response = NextResponse.json(
          {
            message: error?.response?.message ?? 'Unable to create document',
          },
          { status: 400 }
        );
      }
    );
  } catch (error) {
    // Handle specific errors from Appwrite
    const appwriteError = error as AppwriteError;
    response = NextResponse.json(
      {
        message:
          appwriteError?.response?.message ?? 'Unable to create document',
      },
      { status: 400 }
    );
  }
  return response;
}

export const runtime = 'edge';
