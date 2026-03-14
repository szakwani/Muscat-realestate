import type { Area, ViewMode, PropertyType } from '../types';
import { getPriceRange, formatOMR, trendLabel } from '../utils/priceUtils';

interface AreaDetailsProps {
  area: Area | null;
  viewMode: ViewMode;
  onClose: () => void;
}

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment:  '🏢 Apartment',
  villa:      '🏡 Villa',
  townhouse:  '🏘️ Townhouse',
  commercial: '🏬 Commercial',
  land:       '🌿 Land',
};

export default function AreaDetails({ area, onClose }: AreaDetailsProps) {
  if (!area) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <p className="text-slate-600 font-semibold text-sm">Select an area</p>
        <p className="text-slate-400 text-xs mt-1">Click a pin on the map or an area in the list to view pricing details.</p>
      </div>
    );
  }

  const saleRange = getPriceRange(area.avgSalePricePerSqm, 'sale');
  const rentRange = getPriceRange(area.avgRentMonthly, 'rent');
  const trend = trendLabel(area.trend);
  const propertyTypes = Object.keys(area.propertyTypePrices) as PropertyType[];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-4 flex-shrink-0">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900 leading-tight">{area.name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Updated {new Date(area.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close details"
          className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-shrink-0">{area.description}</p>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-2 mb-4 flex-shrink-0">
        <div className={`rounded-xl p-3 ${saleRange.bgClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 opacity-80 ${saleRange.textClass}`}>Avg Sale</p>
          <p className={`text-base font-bold ${saleRange.textClass}`}>{formatOMR(area.avgSalePricePerSqm)}</p>
          <p className={`text-xs opacity-70 ${saleRange.textClass}`}>per sqm</p>
        </div>
        <div className={`rounded-xl p-3 ${rentRange.bgClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 opacity-80 ${rentRange.textClass}`}>Avg Rent</p>
          <p className={`text-base font-bold ${rentRange.textClass}`}>{formatOMR(area.avgRentMonthly)}</p>
          <p className={`text-xs opacity-70 ${rentRange.textClass}`}>per month</p>
        </div>
      </div>

      {/* Trend */}
      <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 mb-4 flex-shrink-0">
        <span className={`text-lg font-bold ${trend.className}`}>{trend.icon}</span>
        <div>
          <p className="text-xs font-semibold text-slate-700">Price Trend</p>
          <p className={`text-xs font-bold ${trend.className}`}>{trend.label} over last 12 months</p>
        </div>
      </div>

      {/* Property type breakdown */}
      {propertyTypes.length > 0 && (
        <div className="flex-shrink-0">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Breakdown by Type
          </h3>
          <div className="space-y-2">
            {propertyTypes.map(type => {
              const prices = area.propertyTypePrices[type];
              if (!prices) return null;
              return (
                <div key={type} className="rounded-xl border border-slate-100 bg-white p-2.5">
                  <p className="text-xs font-semibold text-slate-700 mb-1.5">
                    {PROPERTY_TYPE_LABELS[type] ?? type}
                  </p>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-slate-500">Sale</p>
                      <p className="text-sm font-bold text-slate-800">
                        {formatOMR(prices.salePricePerSqm)}
                        <span className="text-xs font-normal text-slate-400"> /sqm</span>
                      </p>
                    </div>
                    {prices.rentMonthly > 0 && (
                      <div className="flex-1">
                        <p className="text-xs text-slate-500">Rent</p>
                        <p className="text-sm font-bold text-slate-800">
                          {formatOMR(prices.rentMonthly)}
                          <span className="text-xs font-normal text-slate-400"> /mo</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Coordinates */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex-shrink-0">
        <p className="text-xs text-slate-400">
          📍 {area.coordinates[0].toFixed(4)}°N, {area.coordinates[1].toFixed(4)}°E
        </p>
        {/* TODO: Add a "View on Google Maps" link or live data source link here */}
        <p className="text-xs text-slate-400 mt-1 italic">
          Prices are indicative estimates based on market research.
        </p>
      </div>
    </div>
  );
}
