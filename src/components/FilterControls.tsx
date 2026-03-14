import type { FilterState, PropertyType, SortField, SortDirection, ViewMode } from '../types';

interface FilterControlsProps {
  filters: FilterState;
  onViewModeChange: (mode: ViewMode) => void;
  onPropertyTypeChange: (type: PropertyType | 'all') => void;
  onSortChange: (field: SortField, direction: SortDirection) => void;
  onReset: () => void;
}

const PROPERTY_TYPES: { value: PropertyType | 'all'; label: string }[] = [
  { value: 'all',        label: 'All Types'   },
  { value: 'apartment',  label: 'Apartment'   },
  { value: 'villa',      label: 'Villa'       },
  { value: 'townhouse',  label: 'Townhouse'   },
  { value: 'commercial', label: 'Commercial'  },
  { value: 'land',       label: 'Land'        },
];

const SORT_OPTIONS: { field: SortField; direction: SortDirection; label: string }[] = [
  { field: 'avgSalePricePerSqm', direction: 'desc', label: 'Price ↑ High–Low' },
  { field: 'avgSalePricePerSqm', direction: 'asc',  label: 'Price ↑ Low–High' },
  { field: 'avgRentMonthly',     direction: 'desc', label: 'Rent ↑ High–Low'  },
  { field: 'avgRentMonthly',     direction: 'asc',  label: 'Rent ↑ Low–High'  },
  { field: 'name',               direction: 'asc',  label: 'Name A–Z'         },
  { field: 'trend',              direction: 'desc', label: 'Trending First'   },
];

export default function FilterControls({
  filters,
  onViewModeChange,
  onPropertyTypeChange,
  onSortChange,
  onReset,
}: FilterControlsProps) {
  const currentSortKey = `${filters.sortField}-${filters.sortDirection}`;

  return (
    <div className="space-y-4">
      {/* View mode toggle */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          View Mode
        </label>
        <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-0.5 gap-0.5">
          {(['sale', 'rent'] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-150 capitalize ${
                filters.viewMode === mode
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {mode === 'sale' ? '🏷️ Buy' : '🔑 Rent'}
            </button>
          ))}
        </div>
      </div>

      {/* Property type filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Property Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PROPERTY_TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onPropertyTypeChange(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                filters.propertyType === value
                  ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label htmlFor="sort-select" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Sort By
        </label>
        <select
          id="sort-select"
          value={currentSortKey}
          onChange={e => {
            const opt = SORT_OPTIONS.find(o => `${o.field}-${o.direction}` === e.target.value);
            if (opt) onSortChange(opt.field, opt.direction);
          }}
          className="
            block w-full rounded-xl border border-slate-200 bg-white
            px-3 py-2.5 text-sm text-slate-700
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
          "
        >
          {SORT_OPTIONS.map(opt => (
            <option key={`${opt.field}-${opt.direction}`} value={`${opt.field}-${opt.direction}`}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full text-xs text-slate-500 hover:text-brand-600 underline underline-offset-2 transition py-1"
      >
        Reset all filters
      </button>
    </div>
  );
}
