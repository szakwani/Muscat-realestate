import type { Area, ViewMode } from '../types';
import AreaCard from './AreaCard';

interface AreaListProps {
  areas: Area[];
  selectedAreaId: string | null;
  viewMode: ViewMode;
  onSelect: (area: Area) => void;
  totalCount: number;
}

export default function AreaList({ areas, selectedAreaId, viewMode, onSelect, totalCount }: AreaListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <h2 className="text-sm font-semibold text-slate-700">
          Areas
        </h2>
        <span className="text-xs text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">
          {areas.length} / {totalCount}
        </span>
      </div>

      {areas.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <svg className="w-10 h-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-slate-500 font-medium">No areas match your filters</p>
          <p className="text-xs text-slate-400 mt-1">Try a different search or reset filters</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 -mr-1 scrollbar-thin">
          {areas.map(area => (
            <AreaCard
              key={area.id}
              area={area}
              viewMode={viewMode}
              isSelected={area.id === selectedAreaId}
              onClick={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
