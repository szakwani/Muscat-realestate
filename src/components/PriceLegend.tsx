import type { PriceRange } from '../types';

interface PriceLegendProps {
  ranges: PriceRange[];
  title: string;
}

export default function PriceLegend({ ranges, title }: PriceLegendProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</p>
      <div className="space-y-1.5">
        {ranges.map(range => (
          <div key={range.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0 border border-white shadow-sm"
              style={{ backgroundColor: range.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-slate-600">{range.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
