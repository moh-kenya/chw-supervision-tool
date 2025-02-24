import { Client, Databases, ID, Query } from 'appwrite';
import environments from '../../utils/environments';

const { APP_ENDPOINT, APP_PROJECT, DATABASE_ID, COLLECTION_ID } = environments;

// Initialize Appwrite
const client = new Client()
  .setEndpoint(APP_ENDPOINT)
  .setProject(APP_PROJECT);

// Initialize the databases service
const databases = new Databases(client);

// Types for filtering and sorting
export interface FilterOptions {
  county?: string;
  subCounty?: string;
  chu?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Function to fetch all supervision data with filtering and sorting
export const listSupervisionData = async (filters?: FilterOptions, sort?: SortOptions, page?: number, limit?: number) => {
  try {
    let query: string[] = [];

    // Add pagination if specified
    if (page !== undefined && limit !== undefined) {
      const offset = (page - 1) * limit;
      query.push(Query.limit(limit));
      query.push(Query.offset(offset));
    } else {
      // If no pagination, get all records (max 1000)
      query.push(Query.limit(1000));
    }

    // Add filters if provided
    if (filters) {
      if (filters.startDate && filters.endDate) {
        query.push(Query.greaterThanEqual('$createdAt', filters.startDate));
        query.push(Query.lessThanEqual('$createdAt', filters.endDate));
      }
      if (filters.status) {
        query.push(Query.equal('status', filters.status));
      }
    }

    // Add sorting
    query.push(Query.orderDesc('$createdAt')); // Always sort by creation date desc

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      query
    );

    return {
      documents: response.documents,
      total: response.total
    };
  } catch (error: any) {
    console.error('Error fetching supervision data:', error);
    throw new Error(error.message || 'Failed to fetch supervision data');
  }
};

// Function to get submission statistics
export const getSubmissionStats = async () => {
  try {
    // Get only the latest 100 documents for stats
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(100), Query.orderDesc('$createdAt')]
    );
    const documents = response.documents;

    // Calculate stats from the documents
    const countyStats = new Map();
    const statusStats = new Map();

    documents.forEach(doc => {
      try {
        const formData = JSON.parse(doc.formData);
        const county = formData.locationDetails?.county;
        if (county) {
          countyStats.set(county, (countyStats.get(county) || 0) + 1);
        }

        const status = doc.status;
        if (status) {
          statusStats.set(status, (statusStats.get(status) || 0) + 1);
        }
      } catch (e) {
        console.error('Error parsing formData for stats:', e);
      }
    });

    // Convert Maps to arrays of objects
    const submissionsByCounty = Array.from(countyStats.entries()).map(([county, count]) => ({
      county,
      count
    }));

    const submissionsByStatus = Array.from(statusStats.entries()).map(([status, count]) => ({
      status,
      count
    }));

    return {
      totalSubmissions: documents.length,
      submissionsByCounty,
      submissionsByStatus
    };
  } catch (error: any) {
    console.error('Error fetching submission stats:', error);
    throw new Error(error.message || 'Failed to fetch submission statistics');
  }
};

export const createSupervisionData = async (data: any) => {

  try {

    // Debug the incoming data
    console.log('Creating supervision data with:', data);
    
    // Prepare the data according to the schema
    // Only include fields that are defined in the Appwrite collection schema

    const documentData = {
      status: data.status || 'completed',
      formData: JSON.stringify(data), // Store all form data as JSON string
      submittedAt: new Date().toISOString(), // Required field
      userId: data.supervisionTeam?.userId || 'anonymous' // Required field
    };

    const documentId = ID.unique();
    
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId,
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

export const getSupervisionById = async (documentId: string) => {
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


