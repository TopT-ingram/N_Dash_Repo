import { create } from 'zustand';

export type Environment = 'QA & IST' | 'Regression' | 'UAT' | 'Production';

export const ENVIRONMENTS: Environment[] = ['QA & IST', 'Regression', 'UAT', 'Production'];

export const RELEASES = [
  '26.1.1','26.1.2','26.1.3','26.1.4',
  '26.2.1','26.2.2','26.2.3','26.2.4',
  '26.3.1','26.3.2','26.3.3','26.3.4',
  '26.4.1','26.4.2','26.4.3','26.4.4',
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export type ThemeMode = 'light' | 'dark' | 'system';

interface FilterState {
  selectedReleases: string[];
  selectedMonths: string[];
  selectedEnvironment: Environment | null;
  activeKPI: Environment | null;
  theme: ThemeMode;
  lastSyncedAt: string;

  setSelectedReleases: (releases: string[]) => void;
  setSelectedMonths: (months: string[]) => void;
  setSelectedEnvironment: (env: Environment | null) => void;
  setActiveKPI: (kpi: Environment | null) => void;
  setTheme: (theme: ThemeMode) => void;
  setLastSyncedAt: (ts: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedReleases: RELEASES, // default = All Releases selected
  selectedMonths: MONTHS,
  selectedEnvironment: null,
  activeKPI: null,
  theme: 'light',
  lastSyncedAt: new Date().toLocaleString(),

  setSelectedReleases: (releases) => set({ selectedReleases: releases }),
  setSelectedMonths: (months) => set({ selectedMonths: months }),
  setSelectedEnvironment: (env) => set({ selectedEnvironment: env }),
  setActiveKPI: (kpi) => set({ activeKPI: kpi }),
  setTheme: (theme) => set({ theme }),
  setLastSyncedAt: (ts) => set({ lastSyncedAt: ts }),
}));
