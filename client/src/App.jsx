import { useCornCount, useBuyCorn } from './hooks';
import { getClientId } from './services/api';
import { AppNav, Banner, CornCounter, StatusBlock, BuyCornButton, ClientIdBadge } from './components';

function App() {
  const [cornCount, setCornCount] = useCornCount();
  const { status, message, retryAfter, statusCode, handleBuyCorn } = useBuyCorn({
    onSuccess: (increment) => setCornCount((c) => c + increment),
  });

  return (
    <div className="h-screen flex flex-col bg-white">
      <AppNav />
      <div className="flex-1 flex flex-col min-h-0 overflow-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex-1 flex flex-col min-h-0 w-full">
          <main id="shop" className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:items-stretch h-full min-h-0">
            <div className="flex flex-col min-h-[280px] sm:min-h-[360px] md:min-h-0 md:h-full md:col-span-8">
              <Banner />
            </div>
          <div className="flex flex-col md:justify-center md:col-span-4">
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-10">
              <CornCounter count={cornCount} />
              <ClientIdBadge clientId={getClientId()} />
            </div>
            <div className="mt-4">
              <StatusBlock status={status} message={message} retryAfterSeconds={retryAfter} statusCode={statusCode} />
            </div>
            <div className="mt-4">
              <BuyCornButton
                status={status}
                message={message}
                retryAfter={retryAfter}
                onBuy={handleBuyCorn}
              />
              <div className="mt-6 flex gap-2 text-gray-500 text-sm leading-relaxed">
                <span className="shrink-0 mt-0.5" aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <p>
                  <strong className="font-semibold text-gray-700">Policy: Bob is a fair farmer.</strong> He sells at most 1 corn per client per minute. Clients buy by sending a POST request to the API: 200 on success, 429 Too Many Requests if over the limit. Wait for the countdown before trying again.
                </p>
              </div>
            </div>
          </div>
          </main>
        </div>
      </div>

      <footer className="shrink-0 w-full py-4 px-4 sm:px-6 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500 text-sm">
          <span>©2026 Bob&apos;s Corn. CHALLENGE.</span>
          <a
            href="https://github.com/yeikol2703"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-medium hover:text-[rgb(244,202,37)]"
          >
            Yeikol Villalobos · GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
