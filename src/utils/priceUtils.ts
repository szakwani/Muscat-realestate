import type { Area, FilterState, PriceRange, ViewMode } from '../types';

/**
 * Sale price ranges in OMR per sqm — adjust thresholds to match current market
 */
export const SALE_PRICE_RANGES: PriceRange[] = [
  { label: 'Under 700 OMR/sqm',    min: 0,    max: 699,  color: '#6ee7b7', bgClass: 'bg-emerald-200',  textClass: 'text-emerald-800' },
  { label: '700 – 999 OMR/sqm',    min: 700,  max: 999,  color: '#34d399', bgClass: 'bg-emerald-400',  textClass: 'text-emerald-900' },
  { label: '1,000 – 1,299 OMR/sqm', min: 1000, max: 1299, color: '#f59e0b', bgClass: 'bg-amber-400',   textClass: 'text-amber-900'   },
  { label: '1,300 – 1,599 OMR/sqm', min: 1300, max: 1599, color: '#f97316', bgClass: 'bg-orange-500',  textClass: 'text-white'       },
  { label: '1,600+ OMR/sqm',        min: 1600, max: Infinity, color: '#dc2626', bgClass: 'bg-red-600', textClass: 'text-white'       },
];

/**
 * Rental price ranges in OMR per month
 */
export const RENT_PRICE_RANGES: PriceRange[] = [
  { label: 'Under 350 OMR/mo',    min: 0,   max: 349,  color: '#6ee7b7', bgClass: 'bg-emerald-200',  textClass: 'text-emerald-800' },
  { label: '350 – 549 OMR/mo',    min: 350, max: 549,  color: '#34d399', bgClass: 'bg-emerald-400',  textClass: 'text-emerald-900' },
  { label: '550 – 799 OMR/mo',    min: 550, max: 799,  color: '#f59e0b', bgClass: 'bg-amber-400',   textClass: 'text-amber-900'   },
  { label: '800 – 1,099 OMR/mo',  min: 800, max: 1099, color: '#f97316', bgClass: 'bg-orange-500',  textClass: 'text-white'       },
  { label: '1,100+ OMR/mo',       min: 1100, max: Infinity, color: '#dc2626', bgClass: 'bg-red-600', textClass: 'text-white'       },
];

/** Get the price value to use based on the current view mode */
export function getPriceValue(area: Area, viewMode: ViewMode): number {
  return viewMode === 'sale' ? area.avgSalePricePerSqm : area.avgRentMonthly;
}

/** Get the PriceRange bucket for a given value and view mode */
export function getPriceRange(value: number, viewMode: ViewMode): PriceRange {
  const ranges = viewMode === 'sale' ? SALE_PRICE_RANGES : RENT_PRICE_RANGES;
  return ranges.find(r => value >= r.min && value <= r.max) ?? ranges[ranges.length - 1];
}

/** Map colour for a Leaflet circle marker */
export function getMarkerColor(area: Area, viewMode: ViewMode): string {
  const value = getPriceValue(area, viewMode);
  return getPriceRange(value, viewMode).color;
}

/** Format a numeric OMR value as a readable string */
export function formatOMR(value: number, decimals = 0): string {
  return `${value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} OMR`;
}

/** Filter and sort areas based on current filter state */
export function filterAndSortAreas(areas: Area[], filters: FilterState): Area[] {
  let result = areas.filter(area => {
    const q = filters.searchQuery.trim().toLowerCase();
    if (q && !area.name.toLowerCase().includes(q) && !area.description.toLowerCase().includes(q)) {
      return false;
    }

    // Filter by property type availability
    if (filters.propertyType !== 'all') {
      if (!area.propertyTypePrices[filters.propertyType]) return false;
    }

    return true;
  });

  result = result.sort((a, b) => {
    let aVal: number | string;
    let bVal: number | string;

    switch (filters.sortField) {
      case 'avgSalePricePerSqm':
        aVal = a.avgSalePricePerSqm;
        bVal = b.avgSalePricePerSqm;
        break;
      case 'avgRentMonthly':
        aVal = a.avgRentMonthly;
        bVal = b.avgRentMonthly;
        break;
      case 'trend': {
        const order: Record<string, number> = { up: 2, stable: 1, down: 0 };
        aVal = order[a.trend] ?? 1;
        bVal = order[b.trend] ?? 1;
        break;
      }
      case 'name':
      default:
        aVal = a.name;
        bVal = b.name;
    }

    if (aVal < bVal) return filters.sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return filters.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}

/** Human-friendly trend label and icon */
export function trendLabel(trend: string): { label: string; icon: string; className: string } {
  switch (trend) {
    case 'up':     return { label: 'Rising',  icon: '↑', className: 'text-emerald-600' };
    case 'down':   return { label: 'Falling', icon: '↓', className: 'text-red-500'     };
    case 'stable': return { label: 'Stable',  icon: '→', className: 'text-amber-500'   };
    default:       return { label: 'Unknown', icon: '–', className: 'text-slate-400'   };
  }
}
