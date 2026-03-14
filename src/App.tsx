import { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import AreaList from './components/AreaList';
import MuscatMap from './components/MuscatMap';
import AreaDetails from './components/AreaDetails';
import PriceLegend from './components/PriceLegend';
import { useFilters } from './hooks/useFilters';
import { SALE_PRICE_RANGES, RENT_PRICE_RANGES } from './utils/priceUtils';
import type { Area } from './types';
import areasData from './data/areas.json';

// Cast JSON import to typed array
// TODO: Replace with a live API call here, e.g.:
//   const [areas, setAreas] = useState<Area[]>([]);
//   useEffect(() => { fetch('/api/areas').then(r => r.json()).then(setAreas); }, []);
const ALL_AREAS = areasData as Area[];

export default function App() {
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'list' | 'details'>('list');

  const {
    filters,
    filteredAreas,
    setViewMode,
    setPropertyType,
    setSort,
    setSearchQuery,
    resetFilters,
  } = useFilters(ALL_AREAS);

  const handleAreaSelect = useCallback((area: Area) => {
    setSelectedArea(area);
    setSidebarTab('details');
  }, []);

  const handleDetailsClose = useCallback(() => {
    setSelectedArea(null);
    setSidebarTab('list');
  }, []);

  const priceRanges = filters.viewMode === 'sale' ? SALE_PRICE_RANGES : RENT_PRICE_RANGES;
  const legendTitle = filters.viewMode === 'sale' ? 'Sale Price / sqm' : 'Rent / Month';

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Header areaCount={ALL_AREAS.length} />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left Sidebar ────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 bg-white border-r border-slate-200 flex-shrink-0 overflow-hidden">
          <div className="flex flex-col h-full p-4 gap-4 overflow-hidden">
            <SearchBar
              value={filters.searchQuery}
              onChange={setSearchQuery}
            />
            <FilterControls
              filters={filters}
              onViewModeChange={setViewMode}
              onPropertyTypeChange={setPropertyType}
              onSortChange={setSort}
              onReset={resetFilters}
            />
            <div className="border-t border-slate-100 pt-3">
              <PriceLegend
                ranges={priceRanges}
                title={legendTitle}
              />
            </div>
          </div>
        </aside>

        {/* ── Map (center) ─────────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile filters bar */}
          <div className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border-b border-slate-200 overflow-x-auto flex-shrink-0">
            <SearchBar
              value={filters.searchQuery}
              onChange={setSearchQuery}
              placeholder="Search…"
            />
            <div className="flex rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
              <button
                onClick={() => setViewMode('sale')}
                className={`px-3 py-1.5 text-xs font-semibold transition ${
                  filters.viewMode === 'sale' ? 'bg-brand-600 text-white' : 'text-slate-600 bg-white hover:bg-slate-50'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setViewMode('rent')}
                className={`px-3 py-1.5 text-xs font-semibold transition ${
                  filters.viewMode === 'rent' ? 'bg-brand-600 text-white' : 'text-slate-600 bg-white hover:bg-slate-50'
                }`}
              >
                Rent
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 p-3">
            <MuscatMap
              areas={filteredAreas}
              selectedArea={selectedArea}
              viewMode={filters.viewMode}
              onAreaSelect={handleAreaSelect}
            />
          </div>

          {/* Mobile area list tabs */}
          <div className="lg:hidden flex-shrink-0 bg-white border-t border-slate-200">
            <div className="flex border-b border-slate-100">
              <button
                onClick={() => setSidebarTab('list')}
                className={`flex-1 py-2.5 text-xs font-semibold transition ${
                  sidebarTab === 'list' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500'
                }`}
              >
                Areas ({filteredAreas.length})
              </button>
              <button
                onClick={() => setSidebarTab('details')}
                className={`flex-1 py-2.5 text-xs font-semibold transition ${
                  sidebarTab === 'details' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500'
                }`}
              >
                Details
              </button>
            </div>

            <div className="h-48 overflow-hidden p-3">
              {sidebarTab === 'list' ? (
                <AreaList
                  areas={filteredAreas}
                  selectedAreaId={selectedArea?.id ?? null}
                  viewMode={filters.viewMode}
                  onSelect={handleAreaSelect}
                  totalCount={ALL_AREAS.length}
                />
              ) : (
                <AreaDetails
                  area={selectedArea}
                  viewMode={filters.viewMode}
                  onClose={handleDetailsClose}
                />
              )}
            </div>
          </div>
        </main>

        {/* ── Right Sidebar ──────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 bg-white border-l border-slate-200 flex-shrink-0 overflow-hidden">
          <div className="flex flex-col h-full overflow-hidden">
            {/* Tab buttons */}
            <div className="flex border-b border-slate-100 flex-shrink-0">
              <button
                onClick={() => setSidebarTab('list')}
                className={`flex-1 py-3 text-xs font-semibold transition ${
                  sidebarTab === 'list' ? 'text-brand-600 border-b-2 border-brand-600 bg-brand-50/50' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Areas ({filteredAreas.length})
              </button>
              <button
                onClick={() => setSidebarTab('details')}
                className={`flex-1 py-3 text-xs font-semibold transition ${
                  sidebarTab === 'details' ? 'text-brand-600 border-b-2 border-brand-600 bg-brand-50/50' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {selectedArea ? selectedArea.name : 'Details'}
              </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-hidden p-4">
              {sidebarTab === 'list' ? (
                <AreaList
                  areas={filteredAreas}
                  selectedAreaId={selectedArea?.id ?? null}
                  viewMode={filters.viewMode}
                  onSelect={handleAreaSelect}
                  totalCount={ALL_AREAS.length}
                />
              ) : (
                <AreaDetails
                  area={selectedArea}
                  viewMode={filters.viewMode}
                  onClose={handleDetailsClose}
                />
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
