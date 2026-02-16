import { useState } from 'react';

export function AppNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 shrink-0 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-16 py-3 sm:py-4 flex flex-wrap items-center justify-between md:justify-start md:gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Bob's Corn home">
          <span className="flex items-center justify-center rounded-lg border border-[rgb(244_202_37/0.5)] bg-[rgb(244_202_37/var(--tw-bg-opacity,1))] p-1.5 hover:brightness-95 transition-colors">
            <img src="/corn-icon.png" alt="" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          </span>
          <span className="font-display text-xl sm:text-2xl text-gray-900 whitespace-nowrap">Bob's Corn</span>
        </a>

        <nav
          className={`md:flex-1 flex flex-col md:flex-row items-stretch md:items-center md:justify-center gap-0 md:gap-6 absolute md:relative left-0 right-0 md:left-auto md:right-auto top-full md:top-auto bg-white md:bg-transparent border-b md:border-b-0 border-gray-200 shadow-md md:shadow-none py-3 md:py-0 px-4 md:px-0 ${menuOpen ? 'flex' : 'hidden md:flex'}`}
          aria-label="Main"
        >
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium text-sm py-3 md:py-0 border-b border-gray-100 last:border-b-0 md:border-b-0" onClick={() => setMenuOpen(false)}>
            Shop
          </a>
          <a href="https://github.com/yeikol2703/bobs-corn" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 font-medium text-sm py-3 md:py-0 border-b border-gray-100 last:border-b-0 md:border-b-0" onClick={() => setMenuOpen(false)}>
            Repository
          </a>
          <a href="#documentation" className="text-gray-600 hover:text-gray-900 font-medium text-sm py-3 md:py-0 border-b border-gray-100 last:border-b-0 md:border-b-0" onClick={() => setMenuOpen(false)}>
            Documentation
          </a>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <a
          href="https://github.com/yeikol2703"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 transition-colors shrink-0"
          aria-label="GitHub profile"
        >
          <span className="flex items-center gap-1.5 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" aria-hidden />
            <span className="text-green-600 font-medium">online</span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 sm:w-6 sm:h-6">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
          </button>
        </div>
      </div>
    </header>
  );
}
