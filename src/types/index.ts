/** TypeScript interfaces for MuscatPriceAtlas */

export type PropertyType = 'apartment' | 'villa' | 'townhouse' | 'commercial' | 'land';

export type PriceTrend = 'up' | 'down' | 'stable';

export type ViewMode = 'sale' | 'rent';

export type SortField = 'name' | 'avgSalePricePerSqm' | 'avgRentMonthly' | 'trend';

export type SortDirection = 'asc' | 'desc';

/** Per-property-type price breakdown */
export interface PropertyTypePrices {
  apartment?: {
    salePricePerSqm: number;
    rentMonthly: number;
  };
  villa?: {
    salePricePerSqm: number;
    rentMonthly: number;
  };
  townhouse?: {
    salePricePerSqm: number;
    rentMonthly: number;
  };
  commercial?: {
    salePricePerSqm: number;
    rentMonthly: number;
  };
  land?: {
    salePricePerSqm: number;
    rentMonthly: number;
  };
}

/** Core area data model — edit src/data/areas.json to update pricing */
export interface Area {
  id: string;
  name: string;
  /** [latitude, longitude] — WGS84 coordinates for map centering */
  coordinates: [number, number];
  /** Average sale price in OMR per sqm */
  avgSalePricePerSqm: number;
  /** Average monthly rent in OMR */
  avgRentMonthly: number;
  /** Detailed pricing by property type */
  propertyTypePrices: PropertyTypePrices;
  /** Price trend over last 12 months */
  trend: PriceTrend;
  /** ISO date string — when this record was last manually updated */
  lastUpdated: string;
  /** Short marketing description of the area */
  description: string;
  /** Optional polygon boundary points as [lat, lng] pairs */
  boundary?: [number, number][];
}

export interface FilterState {
  viewMode: ViewMode;
  propertyType: PropertyType | 'all';
  sortField: SortField;
  sortDirection: SortDirection;
  searchQuery: string;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
  color: string;
  bgClass: string;
  textClass: string;
}
