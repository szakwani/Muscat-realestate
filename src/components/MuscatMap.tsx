import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Area, ViewMode } from '../types';
import { getMarkerColor, getPriceValue, formatOMR, trendLabel } from '../utils/priceUtils';

// Muscat, Oman center coordinates — centred to show all neighbourhoods
const MUSCAT_CENTER: [number, number] = [23.6100, 58.3800];
const DEFAULT_ZOOM = 11;

interface MapRecenterProps {
  coordinates: [number, number] | null;
}

/** Fly the map to new coordinates when an area is selected */
function MapRecenter({ coordinates }: MapRecenterProps) {
  const map = useMap();
  const prevCoords = useRef<[number, number] | null>(null);

  useEffect(() => {
    if (coordinates && coordinates !== prevCoords.current) {
      prevCoords.current = coordinates;
      map.flyTo(coordinates, 14, { duration: 1 });
    }
  }, [coordinates, map]);

  return null;
}

interface MuscatMapProps {
  areas: Area[];
  selectedArea: Area | null;
  viewMode: ViewMode;
  onAreaSelect: (area: Area) => void;
}

export default function MuscatMap({ areas, selectedArea, viewMode, onAreaSelect }: MuscatMapProps) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <MapContainer
        center={MUSCAT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        {/* Base tile layer — OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Fly to selected area */}
        <MapRecenter coordinates={selectedArea ? selectedArea.coordinates : null} />

        {areas.map(area => {
          const color = getMarkerColor(area, viewMode);
          const priceValue = getPriceValue(area, viewMode);
          const isSelected = selectedArea?.id === area.id;
          const trend = trendLabel(area.trend);

          return (
            <div key={area.id}>
              {/* Optional boundary polygon */}
              {area.boundary && (
                <Polygon
                  positions={area.boundary}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: isSelected ? 0.25 : 0.1,
                    weight: isSelected ? 2.5 : 1.5,
                    opacity: isSelected ? 0.9 : 0.5,
                  }}
                  eventHandlers={{ click: () => onAreaSelect(area) }}
                />
              )}

              {/* Circle marker */}
              <CircleMarker
                center={area.coordinates}
                radius={isSelected ? 16 : 11}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.85,
                  color: isSelected ? '#1e3a5f' : 'white',
                  weight: isSelected ? 3 : 2,
                }}
                eventHandlers={{ click: () => onAreaSelect(area) }}
              >
                <Popup maxWidth={240} className="map-popup">
                  <div className="p-0.5">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{area.name}</h3>
                    <p className="text-xs text-slate-600 mb-2 leading-snug">
                      {area.description.slice(0, 80)}…
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      <div className="bg-slate-50 rounded-lg p-1.5">
                        <p className="text-xs text-slate-500">Sale</p>
                        <p className="text-xs font-bold text-slate-800">{formatOMR(area.avgSalePricePerSqm)}/sqm</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-1.5">
                        <p className="text-xs text-slate-500">Rent</p>
                        <p className="text-xs font-bold text-slate-800">{formatOMR(area.avgRentMonthly)}/mo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs font-semibold text-slate-700">
                        {viewMode === 'sale' ? formatOMR(priceValue) + '/sqm' : formatOMR(priceValue) + '/mo'}
                      </span>
                      <span className={`ml-auto text-xs font-bold ${trend.className}`}>
                        {trend.icon} {trend.label}
                      </span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            </div>
          );
        })}
      </MapContainer>

      {/* Map attribution overlay enhancement */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow border border-slate-200 pointer-events-none">
        <p className="text-xs font-semibold text-slate-700">Muscat, Oman</p>
        <p className="text-xs text-slate-500">{areas.length} neighbourhoods</p>
      </div>
    </div>
  );
}
