// Interface for hierarchical data
export interface LocationHierarchy {
  counties: {
    [county: string]: {
      subCounties: {
        [subCounty: string]: {
          wards: {
            [ward: string]: {
              chus: string[];
            };
          };
        };
      };
    };
  };
}

let cachedHierarchy: LocationHierarchy | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getLocationHierarchy = async (): Promise<LocationHierarchy> => {
  const counties = await getCounties();
  const hierarchy: LocationHierarchy = { counties: {} };

  for (const county of counties) {
    const subCounties = await getSubCounties(county);
    hierarchy.counties[county] = { subCounties: {} };

    for (const subCounty of subCounties) {
      const wards = await getWards(county, subCounty);
      hierarchy.counties[county].subCounties[subCounty] = { wards: {} };

      for (const ward of wards) {
        const chus = await getCHUs(county, subCounty, ward);
        hierarchy.counties[county].subCounties[subCounty].wards[ward] = { chus };
      }
    }
  }

  return hierarchy;
};

export const getCounties = async (): Promise<string[]> => {
  const response = await fetch('/api/locations');
  if (!response.ok) {
    throw new Error('Failed to fetch counties');
  }
  const data = await response.json();
  return data.counties;
};

export const getSubCounties = async (county: string): Promise<string[]> => {
  const response = await fetch(`/api/locations?county=${encodeURIComponent(county)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sub-counties');
  }
  const data = await response.json();
  return data.subCounties;
};

export const getWards = async (county: string, subCounty: string): Promise<string[]> => {
  const response = await fetch(`/api/locations?county=${encodeURIComponent(county)}&subCounty=${encodeURIComponent(subCounty)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch wards');
  }
  const data = await response.json();
  return data.wards;
};

export const getCHUs = async (county: string, subCounty: string, ward: string): Promise<string[]> => {
  const response = await fetch(`/api/locations?county=${encodeURIComponent(county)}&subCounty=${encodeURIComponent(subCounty)}&ward=${encodeURIComponent(ward)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch CHUs');
  }
  const data = await response.json();
  return data.chus;
};
