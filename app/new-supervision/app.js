// appwrite.js
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://localhost:3000/v1') 
  .setProject('671b69380019aff6cad1'); 

const databases = new Databases(client);

export { databases };
