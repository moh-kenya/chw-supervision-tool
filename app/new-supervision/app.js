// work in progress appwrite.js

import { Client, Databases } from 'appwrite';

// Initialize and ftching Appwrite client with values from .env
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID); 

// Initialize Appwrite Databases
const databases = new Databases(client);

// multiple collection IDs from .env
const collectionIds = process.env.APPWRITE_COLLECTION_IDS.split(',');
console.log(collectionIds); 

// Exporting client, databases, and collectionIds for use in other modules
export { client, databases, collectionIds };
