// import { Account } from 'appwrite';

import { Client } from 'appwrite';

const client = new Client();

export default client;

client
  .setEndpoint('https://backend-moh.karimkkanji.com/v1')
  .setProject('671b69380019aff6cad1');

// export const account = new Account(client);
// export { ID } from 'appwrite';
