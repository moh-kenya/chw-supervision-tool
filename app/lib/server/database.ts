import { Client, Databases, ID } from 'appwrite';
import environments from '../../utils/environments';

const { APP_ENDPOINT, APP_PROJECT, DATABASE_ID, COLLECTION_ID } = environments;

// Initialize Appwrite
const client = new Client()
  .setEndpoint(APP_ENDPOINT)
  .setProject(APP_PROJECT);

// Initialize the databases service
const databases = new Databases(client);

export const createSupervisionData = async (data: any) => {
  try {
    // Debug environment variables
    console.log('Database config:', {
      endpoint: APP_ENDPOINT,
      project: APP_PROJECT,
      database: DATABASE_ID,
      collection: COLLECTION_ID
    });
    // Prepare the data according to the schema
    const documentData = {
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      userId: data.superVisionTeam?.userId || 'anonymous',
      formData: JSON.stringify(data) // Convert form data to string
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      documentData
    );
    return response;
  } catch (error: any) {
    console.error('Error creating supervision data:', error);
    
    // Handle specific Appwrite errors
    if (error?.code === 401) {
      throw new Error('You must be logged in to submit the form');
    } else if (error?.code === 403) {
      throw new Error('You do not have permission to submit forms. Please contact your administrator.');
    } else if (error?.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to submit form. Please try again.');
    }
  }
};

export const getSupervisionData = async (documentId: string) => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId
    );
    return response;
  } catch (error) {
    console.error('Error getting supervision data:', error);
    throw error;
  }
};

export const listSupervisionData = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID
    );
    return response;
  } catch (error) {
    console.error('Error listing supervision data:', error);
    throw error;
  }
};
