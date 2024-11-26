import { NextResponse } from "next/server";
import { createAdminClient } from "../../../lib/server/appwrite"; // Adjust the import as needed
import { cookies } from "next/headers";

export async function POST(request) {
  const { emailOrPhone, password } = await request.json();

  try {
    // Create an Appwrite admin client
    const { account } = await createAdminClient();

    // Create a session using email and password
    const session = await account.createEmailPasswordSession(
      emailOrPhone,
      password
    );

    // Set the session cookie
    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true, // Set to `true` in production environments for security
    });

    // Redirect the user to the dashboard
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    // Handle specific errors from Appwrite
    console.error("Login error:", error);
    return NextResponse.json(
      {
        message: error?.response?.message || "An error occurred during login",
      },
      { status: 400 }
    );
  }
}

export const runtime = "edge";
