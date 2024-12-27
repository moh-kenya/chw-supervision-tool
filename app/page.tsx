import { getLoggedInUser } from './lib/server/appwrite.js'

import { redirect } from "next/navigation";

export default async function Home() {
    const user = await getLoggedInUser();

    if (!user) redirect("/login");

    redirect("/dashboard");
}

export const runtime = "edge"
