import { NextResponse } from "next/server";
import { Client, Users } from "node-appwrite";

export async function GET() {
  try {
    // Create an Appwrite admin client
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
      .setKey(process.env.NEXT_APPWRITE_KEY);

    const users = new Users(client);

    const result = await users.list([]);
    // Redirect the user to the dashboard
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Handle specific errors from Appwrite
    console.error("Unable to Fetch Users", error);
    return NextResponse.json(
      {
        message: error?.response?.message || "Unable to Fetch Users",
      },
      { status: 400 }
    );
  }
}

export const runtime = "edge";
