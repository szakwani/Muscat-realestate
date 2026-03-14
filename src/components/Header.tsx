interface HeaderProps {
  areaCount: number;
}

export default function Header({ areaCount }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white shadow-xl">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true">
                <path d="M12 2L3 9v13h6v-7h6v7h6V9z" fill="white" opacity="0.9" />
                <circle cx="12" cy="10" r="2" fill="#38adf8" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight leading-none">
                MuscatPriceAtlas
              </h1>
              <p className="text-brand-300 text-xs sm:text-sm font-medium mt-0.5 leading-none hidden sm:block">
                Real-Estate Intelligence · Muscat, Oman
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
              <span className="text-brand-300 text-xs font-medium uppercase tracking-wide">Areas</span>
              <span className="text-white font-bold text-sm">{areaCount}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="text-brand-200 text-xs font-medium">Live Data</span>
            </div>
            <div className="text-xs text-brand-400 text-right hidden sm:block">
              <span className="block">Prices in</span>
              <span className="font-semibold text-brand-200">OMR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-header tagline */}
      <div className="border-t border-white/10 bg-brand-950/40">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-brand-300 text-xs">
            Explore estimated sale &amp; rental prices across Muscat neighbourhoods. Data is manually curated — prices are indicative only.
            {/* TODO: Replace with live API data feed when available */}
          </p>
        </div>
      </div>
    </header>
  );
}
