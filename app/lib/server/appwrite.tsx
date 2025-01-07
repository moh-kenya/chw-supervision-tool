// src/lib/server/appwrite.js

'use server';

import { Client, Account } from 'node-appwrite';
import { cookies } from 'next/headers';
import environments from '../../utils/environments';

const { APP_ENDPOINT, APP_PROJECT, APP_KEY } = environments;

export async function createSessionClient(): Promise<{ account: Account }> {
  const client = new Client().setEndpoint(APP_ENDPOINT).setProject(APP_PROJECT);

  const session = cookies().get('my-custom-session');
  if (session?.value == null) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient(): Promise<{ account: Account }> {
  const client = new Client()
    .setEndpoint(APP_ENDPOINT)
    .setProject(APP_PROJECT)
    .setKey(APP_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser(): Promise<unknown> {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
