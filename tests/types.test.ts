import { describe, it, expect } from 'vitest';
import type { ScanStatus, ScanResult, ExtensionState } from '../src/types';

describe('Type Definitions', () => {
  it('ScanStatus has valid values', () => {
    const validStatuses: ScanStatus[] = ['idle', 'scanning', 'safe', 'warning'];
    expect(validStatuses).toHaveLength(4);
  });

  it('ScanResult structure is correct', () => {
    const result: ScanResult = {
      linkCount: 10,
      url: 'https://example.com',
      timestamp: Date.now(),
    };

    expect(result.linkCount).toBe(10);
    expect(result.url).toBe('https://example.com');
    expect(typeof result.timestamp).toBe('number');
  });

  it('ExtensionState structure is correct', () => {
    const state: ExtensionState = {
      status: 'safe',
    };

    expect(state.status).toBe('safe');

    const stateWithScan: ExtensionState = {
      status: 'warning',
      lastScan: {
        linkCount: 0,
        url: 'https://suspicious.com',
        timestamp: Date.now(),
      },
    };

    expect(stateWithScan.lastScan).toBeDefined();
    expect(stateWithScan.lastScan?.linkCount).toBe(0);
  });
});
