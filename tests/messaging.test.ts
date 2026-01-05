import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendMessage } from '../src/utils/messaging';
import browser from 'webextension-polyfill';

vi.mock('webextension-polyfill', () => ({
  default: {
    runtime: {
      sendMessage: vi.fn(),
    },
  },
}));

describe('Messaging Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends GET_STATUS message correctly', async () => {
    vi.mocked(browser.runtime.sendMessage).mockResolvedValue({ status: 'idle' });

    await sendMessage({ type: 'GET_STATUS' });

    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({ type: 'GET_STATUS' });
  });

  it('sends SCAN_RESULT message with data', async () => {
    vi.mocked(browser.runtime.sendMessage).mockResolvedValue({ status: 'received' });

    await sendMessage({
      type: 'SCAN_RESULT',
      data: { linkCount: 5, url: 'https://example.com' },
    });

    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({
      type: 'SCAN_RESULT',
      data: { linkCount: 5, url: 'https://example.com' },
    });
  });

  it('returns response from sendMessage', async () => {
    const mockResponse = { status: 'safe' };
    vi.mocked(browser.runtime.sendMessage).mockResolvedValue(mockResponse);

    const result = await sendMessage({ type: 'GET_STATUS' });

    expect(result).toEqual(mockResponse);
  });
});
