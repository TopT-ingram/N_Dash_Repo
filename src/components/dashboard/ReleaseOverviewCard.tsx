import { useMemo } from 'react';
import type { Ticket } from '@/data/mockData';

interface ReleaseOverviewCardProps {
  tickets: Ticket[];
  selectedReleases: string[];
}

const ReleaseOverviewCard = ({ tickets, selectedReleases }: ReleaseOverviewCardProps) => {
  const { releaseName, criticalIssues, openTickets, storyCompletionPercent, uatTickets } = useMemo(() => {
    const releaseName = selectedReleases.length > 0 ? selectedReleases[0] : 'No Release Selected';

    const criticalIssues = tickets.filter(t => t.priority === 'Critical').length;
    const openTickets = tickets.filter(t => t.status !== 'Done').length;
    const storyCount = tickets.filter(t => t.type === 'Story').length;
    const storyDoneCount = tickets.filter(t => t.type === 'Story' && t.status === 'Done').length;
    const storyCompletionPercent = storyCount > 0 ? Math.round((storyDoneCount / storyCount) * 100) : 0;
    const uatTickets = tickets.filter(t => t.requiresUAT).length;

    return { releaseName, criticalIssues, openTickets, storyCompletionPercent, uatTickets };
  }, [tickets, selectedReleases]);

  return (
    <div className="rounded-lg border border-border bg-card p-6 h-full">
      {/* Release Name */}
      <div className="mb-4 pb-3 border-b border-border">
        <h3 className="text-sm font-medium text-muted-foreground">Current Release</h3>
        <p className="text-lg font-bold text-foreground truncate">{releaseName}</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Critical Issues */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground mb-1">Critical Issues</span>
          <span className={`text-2xl font-bold ${criticalIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {criticalIssues}
          </span>
        </div>

        {/* Open Tickets */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground mb-1">Open Tickets</span>
          <span className={`text-2xl font-bold ${openTickets > 5 ? 'text-amber-600' : 'text-green-600'}`}>
            {openTickets}
          </span>
        </div>

        {/* Story Completion % */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground mb-1">Story Complete</span>
          <span className={`text-2xl font-bold ${storyCompletionPercent >= 70 ? 'text-green-600' : 'text-amber-600'}`}>
            {storyCompletionPercent}%
          </span>
        </div>

        {/* UAT Tickets */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground mb-1">UAT Required</span>
          <span className={`text-2xl font-bold ${uatTickets > 0 ? 'text-blue-600' : 'text-muted-foreground'}`}>
            {uatTickets}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReleaseOverviewCard;
