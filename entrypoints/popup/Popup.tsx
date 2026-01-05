import { useState, useEffect } from 'react';
import { sendMessage } from '../../src/utils/messaging';
import type { ScanStatus } from '../../src/types';

export default function Popup() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sendMessage({ type: 'GET_STATUS' })
      .then((response) => {
        if (response && typeof response === 'object' && 'status' in response) {
          setStatus((response as { status: ScanStatus }).status);
        }
      })
      .catch(() => {
        setStatus('idle');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const statusStyles = {
    safe: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-red-100 text-red-800 border-red-200',
    scanning: 'bg-blue-100 text-blue-800 border-blue-200',
    idle: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  const statusText = {
    safe: 'Page looks safe',
    warning: 'Potential scam detected!',
    scanning: 'Scanning page...',
    idle: 'Monitoring...',
  };

  const currentStatus = isLoading ? 'idle' : status;

  return (
    <div className="w-72 min-h-48 p-4 bg-white">
      <header className="border-b border-gray-200 pb-3 mb-4">
        <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          iMidMan
        </h1>
        <p className="text-xs text-gray-500 mt-1">Scam Detection Status</p>
      </header>

      <div
        className={`mt-2 p-3 rounded-lg border ${statusStyles[currentStatus] || statusStyles.idle} transition-colors`}
      >
        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <div className={`w-2 h-2 rounded-full ${status === 'safe' ? 'bg-green-500' : status === 'warning' ? 'bg-red-500' : 'bg-gray-400'}`} />
          )}
          <span className="text-sm font-medium">{statusText[currentStatus]}</span>
        </div>
      </div>

      <footer className="mt-6 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          Version 0.1.0 • Protecting you from scams
        </p>
      </footer>
    </div>
  );
}
