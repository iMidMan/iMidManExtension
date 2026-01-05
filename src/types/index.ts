export type ScanStatus = 'idle' | 'scanning' | 'safe' | 'warning';

export interface ScanResult {
  linkCount: number;
  url: string;
  timestamp: number;
}

export interface ExtensionState {
  status: ScanStatus;
  lastScan?: ScanResult;
}
