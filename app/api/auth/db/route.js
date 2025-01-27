import { Databases, Client } from 'node-appwrite';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Create an Appwrite admin client
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
      .setKey(process.env.NEXT_APPWRITE_KEY);

    const request = await req.json();
    const { databaseId, collectionId, data, id } = request;

    const databases = new Databases(client);

    // Validate the input
    if (!databaseId || !collectionId || !data) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Create a new document in Appwrite
    const values = JSON.stringify(data);
    const document = await databases.createDocument(
      databaseId,
      collectionId,
      id,
      {
        data: values,
      }
    );

    return NextResponse.json({ success: true, document }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
export const runtime = 'edge';
