import { useState, useMemo } from 'react';
import { useFilterStore } from '@/store/filterStore';
import { releaseTickets, getStatusPriorityMatrix, uatStatusMatrix, type Ticket } from '@/data/mockData';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable, { PriorityBadge, StatusBadge, JiraLink } from '@/components/dashboard/DataTable';
import IssueModal from '@/components/dashboard/IssueModal';
import GoNoGoCard from '@/components/dashboard/GoNoGoCard';
import ReleaseOverviewCard from '@/components/dashboard/ReleaseOverviewCard';
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';

const COLORS = ['hsl(214, 89%, 51%)','hsl(142, 71%, 45%)','hsl(38, 92%, 50%)','hsl(0, 72%, 51%)','hsl(262, 83%, 58%)'];
const TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px',
};

const ReleaseBoardPage = () => {
  const { selectedReleases } = useFilterStore();
  const [modalData, setModalData] = useState<{ title: string; issues: Ticket[] } | null>(null);

  const tickets = useMemo(() => selectedReleases.flatMap(r => releaseTickets[r] || []), [selectedReleases]);
  const matrix  = useMemo(() => getStatusPriorityMatrix(tickets), [tickets]);

  const statusPie = useMemo(() => {
    const map: Record<string, number> = {};
    tickets.forEach(t => { map[t.status] = (map[t.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [tickets]);

  const typePie = useMemo(() => {
    const stories = tickets.filter(t => t.type === 'Story').length;
    const bugs    = tickets.filter(t => t.type === 'Bug').length;
    return [{ name: 'User Story', value: stories }, { name: 'Bug', value: bugs }];
  }, [tickets]);

  const handleMatrixClick = (status: string, priority: string) => {
    const filtered = tickets.filter(t => t.status === status && t.priority === priority);
    if (filtered.length > 0) setModalData({ title: `${status} — ${priority} Priority`, issues: filtered });
  };

  const priorities = ['Critical','High','Medium','Low'];

  const specialLists: { title: string; filterFn: (t: Ticket) => boolean }[] = [
    { title: 'Tickets with Feature Flags / Rollback Steps', filterFn: t => t.hasFeatureFlag || t.hasRollbackNotes },
    { title: 'Tickets Requiring UAT',                       filterFn: t => t.requiresUAT },
    { title: 'Tickets with Release Notes',                  filterFn: t => t.hasReleaseNotes },
    { title: 'Ready to Release / Done',                     filterFn: t => t.readyToRelease || t.status === 'Done' },
    { title: 'Tickets with Acceptance Criteria (For Review)', filterFn: t => t.hasAcceptanceCriteria && t.status === 'In Review' },
  ];

  const uatTotal = uatStatusMatrix.reduce((s, r) => s + r.count, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* ROW 1: Executive Overview Section – Go/No-Go + Release Overview */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Go / No-Go Status">
          <GoNoGoCard tickets={tickets} />
        </ChartCard>
        <ChartCard title="Release Overview">
          <ReleaseOverviewCard tickets={tickets} selectedReleases={selectedReleases} />
        </ChartCard>
      </div>

      {/* ROW 2: Merge Priority + UAT Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Status × Priority Matrix */}
        <ChartCard title="Tickets by Status & Priority">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="table-header text-left px-4 py-2.5">Status</th>
                  {priorities.map(p => (
                    <th key={p} className="table-header text-center px-4 py-2.5">{p}</th>
                  ))}
                  <th className="table-header text-center px-4 py-2.5 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-2.5 font-medium">
                      <StatusBadge status={row.status as string} />
                    </td>
                    {priorities.map(p => (
                      <td key={p} className="text-center px-4 py-2.5">
                        <button
                          onClick={() => handleMatrixClick(row.status as string, p)}
                          className={`inline-flex items-center justify-center min-w-[32px] h-7 rounded-md text-sm font-semibold transition-colors ${
                            Number(row[p]) > 0 ? 'text-primary hover:bg-primary/10 cursor-pointer' : 'text-muted-foreground'
                          }`}
                        >
                          {String(row[p])}
                        </button>
                      </td>
                    ))}
                    <td className="text-center px-4 py-2.5 font-bold text-foreground">{String(row['Total'])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        {/* Right: UAT Required Tickets – Matrix View */}
        <ChartCard title="UAT Required Tickets">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="table-header text-left px-4 py-2.5">Status</th>
                  <th className="table-header text-center px-4 py-2.5">Total Count</th>
                </tr>
              </thead>
              <tbody>
                {uatStatusMatrix.map((row, i) => (
                  <tr key={i} className="border-t border-border hover:bg-accent/40 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-foreground">{row.status}</td>
                    <td className="text-center px-4 py-2.5">
                      <button
                        onClick={() => {
                          const filtered = tickets.filter(t => t.requiresUAT);
                          if (filtered.length > 0) setModalData({ title: `UAT Required — ${row.status}`, issues: filtered.slice(0, row.count) });
                        }}
                        className="inline-flex items-center justify-center min-w-[32px] h-7 rounded-md text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                      >
                        {row.count}
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-border bg-muted/50">
                  <td className="px-4 py-2.5 font-bold text-foreground">Total</td>
                  <td className="text-center px-4 py-2.5 font-bold text-foreground">{uatTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* ROW 3: Tickets by Status + User Stories Overview */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Tickets by Status">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={{ fontSize: 11 }}>
                {statusPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="User Story vs Bug">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={typePie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={{ fontSize: 11 }}>
                {typePie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Special Lists */}
      {specialLists.map(list => {
        const filtered = tickets.filter(list.filterFn);
        return (
          <ChartCard key={list.title} title={`${list.title} (${filtered.length})`}>
            <DataTable
              data={filtered as unknown as Record<string, unknown>[]}
              columns={[
                { key: 'key' as const, label: 'Key', render: (v: unknown) => <JiraLink issueKey={v as string} /> },
                { key: 'summary' as const, label: 'Summary' },
                { key: 'type' as const, label: 'Type' },
                { key: 'priority' as const, label: 'Priority', render: (v: unknown) => <PriorityBadge priority={v as string} /> },
                { key: 'status' as const, label: 'Status', render: (v: unknown) => <StatusBadge status={v as string} /> },
                { key: 'assignee' as const, label: 'Assignee' },
              ] as any}
              pageSize={5}
            />
          </ChartCard>
        );
      })}

      {modalData && (
        <IssueModal title={modalData.title} issues={modalData.issues} onClose={() => setModalData(null)} />
      )}
    </div>
  );
};

export default ReleaseBoardPage;
