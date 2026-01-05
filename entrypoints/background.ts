import { defineBackground } from '#imports';
import browser from 'webextension-polyfill';
import type { ExtensionMessage, ScanStatus } from '../src/types';

export default defineBackground(() => {
  console.log('[iMidMan] Service worker initialized');

  const state: Map<number, ScanStatus> = new Map();

  browser.runtime.onMessage.addListener((message: ExtensionMessage, sender) => {
    if (message.type === 'SCAN_RESULT') {
      console.log('[iMidMan] Scan result:', sender.tab?.id, message.data);

      if (sender.tab?.id !== undefined) {
        const status: ScanStatus = message.data.linkCount > 0 ? 'safe' : 'idle';
        state.set(sender.tab.id, status);
      }

      return Promise.resolve({ status: 'received' });
    }

    if (message.type === 'GET_STATUS') {
      const tabId = sender.tab?.id;
      if (tabId !== undefined) {
        const currentStatus = state.get(tabId) || 'idle';
        return Promise.resolve({ status: currentStatus });
      }
      return Promise.resolve({ status: 'idle' });
    }

    return Promise.resolve({ status: 'unknown' });
  });
});
