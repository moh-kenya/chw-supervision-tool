// Mock supervision records stored in memory
let mockSupervisionData = [
  {
    id: '1',
    status: 'completed',
    submittedAt: '2024-03-01T10:00:00Z',
    userId: 'admin',
    formData: JSON.stringify({
      locationDetails: {
        county: 'Nairobi',
        subCounty: 'Westlands',
        ward: 'Parklands',
        chu: 'CHU-001'
      },
      supervisionTeam: {
        userId: 'admin',
        name: 'MOH Admin'
      },
      scores: {
        leadership: 8,
        workforce: 7,
        infrastructure: 9,
        monitoring: 8,
        commodities: 7,
        transport: 6,
        referral: 8,
        finance: 7,
        partnership: 8,
        serviceDelivery: 9,
        pandemicPreparedness: 8
      },
      submissionDate: '2024-03-01T10:00:00Z',
      submittedBy: 'admin'
    })
  },
  {
    id: '2',
    status: 'completed',
    submittedAt: '2024-03-02T15:30:00Z',
    userId: 'supervisor',
    formData: JSON.stringify({
      locationDetails: {
        county: 'Mombasa',
        subCounty: 'Nyali',
        ward: 'Frere Town',
        chu: 'CHU-002'
      },
      supervisionTeam: {
        userId: 'supervisor',
        name: 'MOH Supervisor'
      },
      scores: {
        leadership: 7,
        workforce: 8,
        infrastructure: 6,
        monitoring: 7,
        commodities: 8,
        transport: 7,
        referral: 9,
        finance: 8,
        partnership: 7,
        serviceDelivery: 8,
        pandemicPreparedness: 7
      },
      submissionDate: '2024-03-02T15:30:00Z',
      submittedBy: 'supervisor'
    })
  }
];

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
    // For now, return mock data
    // In the future, this would be replaced with actual database queries
    return {
      documents: mockSupervisionData,
      total: mockSupervisionData.length
    };
  } catch (error: any) {
    console.error('Error fetching supervision data:', error);
    throw new Error(error.message || 'Failed to fetch supervision data');
  }
};

// Function to get submission statistics
export const getSubmissionStats = async () => {
  try {
    // Calculate stats from mock data
    const countyStats = new Map();
    const statusStats = new Map();

    mockSupervisionData.forEach(doc => {
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
      totalSubmissions: mockSupervisionData.length,
      submissionsByCounty,
      submissionsByStatus
    };
  } catch (error: any) {
    console.error('Error fetching submission stats:', error);
    throw new Error(error.message || 'Failed to fetch submission statistics');
  }
};

// Function to create new supervision data
export const createSupervisionData = async (data: any) => {
  try {
    const now = new Date().toISOString();
    const userId = data.supervisionTeam?.userId || 'anonymous';
    
    const newDocument = {
      id: String(mockSupervisionData.length + 1),
      status: 'completed',
      submittedAt: now,
      userId: userId,
      formData: JSON.stringify({
        locationDetails: {
          county: data.locationDetails?.county || '',
          subCounty: data.locationDetails?.subCounty || '',
          ward: data.locationDetails?.ward || '',
          chu: data.locationDetails?.chu || ''
        },
        supervisionTeam: {
          userId: userId,
          name: data.supervisionTeam?.name || 'Unknown'
        },
        scores: {
          leadership: data.leadership || 0,
          workforce: data.workforce || 0,
          infrastructure: data.infrastructure || 0,
          monitoring: data.monitoring || 0,
          commodities: data.commodities || 0,
          transport: data.transport || 0,
          referral: data.referral || 0,
          finance: data.finance || 0,
          partnership: data.partnership || 0,
          serviceDelivery: data.serviceDelivery || 0,
          pandemicPreparedness: data.pandemicPreparedness || 0
        },
        submissionDate: now,
        submittedBy: userId,
        comments: data.comments || {}
      })
    };

    // In a real implementation, this would save to a database
    mockSupervisionData.push(newDocument);
    
    return newDocument;
  } catch (error: any) {
    console.error('Error creating supervision data:', error);
    throw new Error(error.message || 'Failed to create supervision data');
  }
};

// Function to get supervision by ID
export const getSupervisionById = async (documentId: string) => {
  try {
    const document = mockSupervisionData.find(doc => doc.id === documentId);
    if (!document) {
      throw new Error('Document not found');
    }
    return document;
  } catch (error: any) {
    console.error('Error fetching supervision by ID:', error);
    throw new Error(error.message || 'Failed to fetch supervision data');
  }
};
