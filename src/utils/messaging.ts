import browser from 'webextension-polyfill';

export type MessageType =
  | { type: 'SCAN_RESULT'; data: { linkCount: number; url: string } }
  | { type: 'GET_STATUS' }
  | { type: 'STATUS_RESPONSE'; status: 'idle' | 'scanning' | 'safe' | 'warning' };

export const sendMessage = <T extends MessageType>(message: T) => {
  return browser.runtime.sendMessage(message);
};

export type ExtensionMessage = MessageType;
