import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

function DataTable<T extends Record<string, unknown>>({ data, columns, pageSize = 10, onRowClick }: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  onClick={() => handleSort(col.key)}
                  className="table-header text-left px-4 py-2.5 cursor-pointer hover:bg-accent transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={`border-t border-border hover:bg-accent/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-2.5 text-foreground">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}</span>
          <div className="flex gap-1">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="px-2.5 py-1 rounded border border-border bg-card hover:bg-accent disabled:opacity-40 transition-colors">Prev</button>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="px-2.5 py-1 rounded border border-border bg-card hover:bg-accent disabled:opacity-40 transition-colors">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;

export const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors: Record<string, string> = {
    Critical: 'bg-destructive/10 text-destructive',
    High: 'bg-warning/10 text-warning',
    Medium: 'bg-primary/10 text-primary',
    Low: 'bg-success/10 text-success',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${colors[priority] || 'bg-muted text-muted-foreground'}`}>
      {priority}
    </span>
  );
};

export const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Open: 'bg-destructive/10 text-destructive',
    'In Progress': 'bg-warning/10 text-warning',
    Resolved: 'bg-success/10 text-success',
    Closed: 'bg-muted text-muted-foreground',
    'To Do': 'bg-muted text-muted-foreground',
    'In Review': 'bg-primary/10 text-primary',
    QA: 'bg-info/10 text-info',
    Done: 'bg-success/10 text-success',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${colors[status] || 'bg-muted text-muted-foreground'}`}>
      {status}
    </span>
  );
};

export const JiraLink = ({ issueKey }: { issueKey: string }) => (
  // TODO: Replace with actual Jira URL when integrating Jira API
  <a
    href={`https://jira.ingram.com/browse/${issueKey}`}
    target="_blank"
    rel="noopener noreferrer"
    onClick={e => e.stopPropagation()}
    className="text-primary hover:underline inline-flex items-center gap-1"
  >
    {issueKey}
    <ExternalLink className="w-3 h-3" />
  </a>
);
