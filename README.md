# MuscatPriceAtlas

> 🗺️ Interactive visual real-estate price map for Muscat, Oman.

Explore Muscat neighbourhoods on an interactive map, search for areas, filter by property type, and instantly see estimated sale & rental pricing insights.

---

## ✨ Features

- **Interactive Leaflet map** — colour-coded circle markers and neighbourhood boundaries
- **Search** — filter areas by name or description
- **View mode toggle** — switch between Buy (sale price/sqm) and Rent (monthly) views
- **Property type filter** — Apartment, Villa, Townhouse, Commercial, Land
- **Sort** — by price, rent, name, or trend
- **Area details panel** — full breakdown by property type with trend indicator
- **Responsive layout** — desktop sidebar + mobile bottom panel
- **Colour legend** — price range legend always visible in sidebar
- **Editable JSON dataset** — prices live in `src/data/areas.json`

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) | Interactive map |

---

## 🚀 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
# → http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # App branding bar
│   ├── SearchBar.tsx       # Search input with clear button
│   ├── FilterControls.tsx  # View mode, property type, sort controls
│   ├── MuscatMap.tsx       # Leaflet interactive map
│   ├── AreaList.tsx        # Scrollable list of area cards
│   ├── AreaCard.tsx        # Single area card with price badge
│   ├── AreaDetails.tsx     # Selected area detail panel
│   └── PriceLegend.tsx     # Colour-coded price range legend
├── data/
│   └── areas.json          # ← Edit this file to update prices
├── hooks/
│   └── useFilters.ts       # Filter state management hook
├── types/
│   └── index.ts            # TypeScript interfaces & types
├── utils/
│   └── priceUtils.ts       # Price range helpers, formatting, sorting
├── App.tsx                 # Root layout component
├── main.tsx                # React entry point
└── index.css               # Global styles + Leaflet overrides
```

---

## 🗃 Updating Prices

All pricing data is stored in **`src/data/areas.json`**. Each record follows this structure:

```jsonc
{
  "id": "unique-slug",
  "name": "Area Name",
  "coordinates": [23.5880, 58.3829],   // [latitude, longitude]
  "avgSalePricePerSqm": 1200,           // OMR per sqm
  "avgRentMonthly": 680,                // OMR per month
  "propertyTypePrices": {
    "apartment": { "salePricePerSqm": 1050, "rentMonthly": 580 },
    "villa":     { "salePricePerSqm": 1350, "rentMonthly": 850 }
  },
  "trend": "up",                        // "up" | "down" | "stable"
  "lastUpdated": "2025-01-15",
  "description": "Short area description.",
  "boundary": [                         // Optional polygon [[lat,lng], ...]
    [23.5900, 58.4050], ...
  ]
}
```

> **Tip:** Search for `// TODO` comments throughout the source for marked integration points where live API data can be connected.

---

## 🔌 Connecting Live Data (Future)

Look for `// TODO` comments in `src/App.tsx` and `src/components/Header.tsx` for the designated integration points:

```ts
// In src/App.tsx — replace static JSON with an API call:
const [areas, setAreas] = useState<Area[]>([]);
useEffect(() => {
  fetch('https://your-api.com/muscat/areas')
    .then(r => r.json())
    .then(setAreas);
}, []);
```

Possible live data sources:
- [Property Finder Oman API](https://www.propertyfinder.om/)
- [Muscat Municipality Open Data](https://www.muscat.gov.om/)
- Custom scraper / data pipeline into the same JSON structure
