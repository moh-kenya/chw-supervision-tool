import { type ReactElement } from 'react';
import { redirect } from 'next/navigation';
import { getLoggedInUser } from './lib/server/appwrite';

export default async function Home(): Promise<ReactElement> {
  const user = await getLoggedInUser();

  if (user === null) redirect('/login');

  redirect('/dashboard');
}

export const runtime = 'edge';
