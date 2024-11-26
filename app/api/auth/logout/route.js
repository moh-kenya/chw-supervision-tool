import { NextResponse } from "next/server";
import { createSessionClient } from "../../../lib/server/appwrite"; // Adjust as needed
import { cookies } from "next/headers";

export async function POST() {
  try {
    const { account } = await createSessionClient();

    await account.deleteSession("current");

    cookies().delete("my-custom-session", { path: "/" });

    // Redirect the user to the login page
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        message: error?.response?.message || "An error occurred during logout",
      },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
