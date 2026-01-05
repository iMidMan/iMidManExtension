import { vi } from 'vitest';

vi.mock('webextension-polyfill', () => ({
  default: {
    runtime: {
      sendMessage: vi.fn(),
      onMessage: { addListener: vi.fn() },
      getURL: vi.fn((path: string) => path),
    },
    tabs: { query: vi.fn() },
    storage: { local: { get: vi.fn(), set: vi.fn() } },
  },
}));
