import { useState, useMemo } from 'react';
import type { FilterState, Area, SortField, SortDirection, PropertyType, ViewMode } from '../types';
import { filterAndSortAreas } from '../utils/priceUtils';

const DEFAULT_FILTERS: FilterState = {
  viewMode: 'sale',
  propertyType: 'all',
  sortField: 'avgSalePricePerSqm',
  sortDirection: 'desc',
  searchQuery: '',
};

export function useFilters(areas: Area[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filteredAreas = useMemo(
    () => filterAndSortAreas(areas, filters),
    [areas, filters],
  );

  function setViewMode(viewMode: ViewMode) {
    setFilters(prev => ({
      ...prev,
      viewMode,
      sortField: viewMode === 'sale' ? 'avgSalePricePerSqm' : 'avgRentMonthly',
    }));
  }

  function setPropertyType(propertyType: PropertyType | 'all') {
    setFilters(prev => ({ ...prev, propertyType }));
  }

  function setSort(sortField: SortField, sortDirection: SortDirection) {
    setFilters(prev => ({ ...prev, sortField, sortDirection }));
  }

  function setSearchQuery(searchQuery: string) {
    setFilters(prev => ({ ...prev, searchQuery }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return {
    filters,
    filteredAreas,
    setViewMode,
    setPropertyType,
    setSort,
    setSearchQuery,
    resetFilters,
  };
}
