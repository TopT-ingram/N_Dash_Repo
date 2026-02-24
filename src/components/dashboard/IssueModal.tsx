import { X } from 'lucide-react';
import DataTable, { PriorityBadge, StatusBadge, JiraLink } from './DataTable';
import type { Defect } from '@/data/mockData';
import type { Ticket } from '@/data/mockData';

interface IssueModalProps {
  title: string;
  issues: (Defect | Ticket)[];
  onClose: () => void;
}

const IssueModal = ({ title, issues, onClose }: IssueModalProps) => {
  const isDefect = issues.length > 0 && 'environment' in issues[0];

  const defectColumns = [
    { key: 'key' as const, label: 'Key', render: (v: unknown) => <JiraLink issueKey={v as string} /> },
    { key: 'summary' as const, label: 'Summary' },
    { key: 'priority' as const, label: 'Priority', render: (v: unknown) => <PriorityBadge priority={v as string} /> },
    { key: 'status' as const, label: 'Status', render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: 'domain' as const, label: 'Domain' },
    { key: 'environment' as const, label: 'Environment' },
  ];

  const ticketColumns = [
    { key: 'key' as const, label: 'Key', render: (v: unknown) => <JiraLink issueKey={v as string} /> },
    { key: 'summary' as const, label: 'Summary' },
    { key: 'type' as const, label: 'Type' },
    { key: 'priority' as const, label: 'Priority', render: (v: unknown) => <PriorityBadge priority={v as string} /> },
    { key: 'status' as const, label: 'Status', render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: 'assignee' as const, label: 'Assignee' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card rounded-xl shadow-2xl border border-border w-[90vw] max-w-5xl max-h-[80vh] flex flex-col animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-auto p-5">
          <DataTable
            data={issues as unknown as Record<string, unknown>[]}
            columns={(isDefect ? defectColumns : ticketColumns) as any}
            pageSize={15}
          />
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
