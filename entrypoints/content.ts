import { defineContentScript } from '#imports';
import { sendMessage } from '../src/utils/messaging';

export default defineContentScript({
  matches: ['https://*/*', 'http://*/*'],
  main() {
    console.log('[iMidMan] Content script loaded:', window.location.href);

    const scanPage = () => {
      const links = document.querySelectorAll('a[href]');
      return {
        linkCount: links.length,
        url: window.location.href,
        timestamp: Date.now(),
      };
    };

    const performScan = () => {
      const result = scanPage();
      console.log('[iMidMan] Scan complete:', result);
      sendMessage({
        type: 'SCAN_RESULT',
        data: { linkCount: result.linkCount, url: result.url },
      });
    };

    performScan();

    console.log('[iMidMan] Content script ready');
  },
});
