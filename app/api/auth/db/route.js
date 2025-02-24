import { Databases, Client } from 'node-appwrite';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Create an Appwrite admin client
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.NEXT_APPWRITE_KEY);

    const request = await req.json();
    const { databaseId, collectionId, data, id } = request;

    const databases = new Databases(client);

    // Validate the input
    if (!databaseId || !collectionId || !data) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'Database ID, Collection ID, and data are required'
      }, { status: 400 });
    }

    // Ensure data is properly structured
    const documentData = {
      data: JSON.stringify(data),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: data.status || 'Draft'
    };

    // Create a new document in Appwrite
    const document = await databases.createDocument(
      databaseId,
      collectionId,
      id,
      documentData
    );

    return NextResponse.json({ 
      success: true, 
      document,
      message: 'Document created successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to create document',
        message: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}
export const runtime = 'edge';
