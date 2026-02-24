import { useFilterStore, RELEASES, MONTHS, type ThemeMode } from '@/store/filterStore';
import { ChevronDown, RefreshCw, Sun, Moon, Monitor, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({
  label,
  options,
  selected,
  onChange,
  allLabel,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  allLabel?: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const allSelected = selected.length === options.length;
  const displayText = allSelected
    ? (allLabel || 'All')
    : selected.length === 0
      ? label
      : selected.length <= 2
        ? selected.join(', ')
        : `${selected.length} selected`;

  const toggleAll = () => { onChange(allSelected ? [] : [...options]); };
  const toggle = (item: string) => {
    onChange(selected.includes(item) ? selected.filter(s => s !== item) : [...selected, item]);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-sm font-medium text-card-foreground hover:bg-accent transition-colors min-w-[140px]"
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-card border border-border rounded-lg shadow-lg min-w-[200px] py-1 animate-fade-in max-h-60 overflow-y-auto">
          {allLabel && (
            <label className="flex items-center gap-2 px-3 py-1.5 hover:bg-accent cursor-pointer text-sm border-b border-border mb-1">
              <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-border accent-primary" />
              <span className="font-medium">{allLabel}</span>
            </label>
          )}
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 px-3 py-1.5 hover:bg-accent cursor-pointer text-sm">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="rounded border-border accent-primary" />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const ThemeToggle = () => {
  const { theme, setTheme } = useFilterStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else if (theme === 'light') root.classList.remove('dark');
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      prefersDark ? root.classList.add('dark') : root.classList.remove('dark');
    }
  }, [theme]);

  const icons: Record<ThemeMode, React.ReactNode> = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
    system: <Monitor className="w-4 h-4" />,
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
      >
        {icons[theme]}
      </button>
      {open && (
        <div className="absolute top-full mt-1 right-0 z-50 bg-card border border-border rounded-lg shadow-lg py-1 animate-fade-in">
          {(['light','dark','system'] as ThemeMode[]).map(o => (
            <button
              key={o}
              onClick={() => { setTheme(o); setOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-accent transition-colors capitalize ${theme === o ? 'text-primary font-medium' : 'text-card-foreground'}`}
            >
              {icons[o]} {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { selectedReleases, setSelectedReleases, selectedMonths, setSelectedMonths, lastSyncedAt, setLastSyncedAt } = useFilterStore();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Trigger Jira API data refetch here
    setTimeout(() => {
      setLastSyncedAt(new Date().toLocaleString());
      setRefreshing(false);
    }, 1200);
  };

  return (
    <header className="h-14 bg-header-bg border-b border-header-border flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <span className="text-sm font-bold text-foreground">logo</span>
        <div className="h-5 w-px bg-border" />
        <MultiSelectDropdown
          label="Release"
          options={RELEASES}
          selected={selectedReleases}
          onChange={setSelectedReleases}
          allLabel="All Releases"
        />
        <MultiSelectDropdown
          label="Month"
          options={MONTHS}
          selected={selectedMonths}
          onChange={setSelectedMonths}
          allLabel="All Months"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>Last Synced: {lastSyncedAt}</span>
        </div>
        <ThemeToggle />
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Syncing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
};

export default Header;
