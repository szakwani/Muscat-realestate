import type { Area, ViewMode } from '../types';
import { getPriceValue, getPriceRange, formatOMR, trendLabel } from '../utils/priceUtils';

interface AreaCardProps {
  area: Area;
  viewMode: ViewMode;
  isSelected: boolean;
  onClick: (area: Area) => void;
}

export default function AreaCard({ area, viewMode, isSelected, onClick }: AreaCardProps) {
  const priceValue = getPriceValue(area, viewMode);
  const priceRange = getPriceRange(priceValue, viewMode);
  const trend = trendLabel(area.trend);

  return (
    <button
      type="button"
      onClick={() => onClick(area)}
      className={`
        w-full text-left rounded-xl border p-3 transition-all duration-150 cursor-pointer group
        ${isSelected
          ? 'border-brand-500 bg-brand-50 shadow-md ring-1 ring-brand-300'
          : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-slate-50 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-brand-700' : 'text-slate-800'}`}>
            {area.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{area.description.slice(0, 60)}…</p>
        </div>
        {/* Price badge */}
        <div
          className={`flex-shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${priceRange.bgClass} ${priceRange.textClass}`}
        >
          {formatOMR(priceValue)}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className={`text-xs font-semibold ${trend.className}`}>
          {trend.icon} {trend.label}
        </span>
        <span className="text-xs text-slate-400">
          {viewMode === 'sale' ? '/sqm' : '/mo'}
        </span>
      </div>
    </button>
  );
}
