'use client';

import { 
  getLocationHierarchy as getHierarchy,
  getCounties as getCountiesList,
  getSubCounties as getSubCountiesList,
  getWards as getWardsList,
  getCHUs as getCHUsList,
  type LocationHierarchy
} from './databaseService';

export { type LocationHierarchy };

export const getLocationHierarchy = getHierarchy;
export const getCounties = getCountiesList;
export const getSubCounties = getSubCountiesList;
export const getWards = getWardsList;
export const getCHUs = getCHUsList;
