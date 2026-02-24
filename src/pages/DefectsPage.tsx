import { useState, useMemo, useEffect } from 'react';
import { useFilterStore, ENVIRONMENTS, type Environment } from '@/store/filterStore';
import {
  getDefectsForRelease, getBugsByDomain, getBugsByPriority, getBugsByRootCause,
  getFunctionalVsPerformance, getManualVsAutomation, projectMTTRData, type Defect,
} from '@/data/mockData';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable, { PriorityBadge, StatusBadge, JiraLink } from '@/components/dashboard/DataTable';
import IssueModal from '@/components/dashboard/IssueModal';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const PIE_COLORS = ['hsl(214, 89%, 51%)','hsl(142, 71%, 45%)','hsl(38, 92%, 50%)','hsl(0, 72%, 51%)'];
const TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px',
};

const DefectsPage = () => {
  const { selectedReleases, selectedEnvironment, setSelectedEnvironment } = useFilterStore();
  const [activeEnv, setActiveEnv] = useState<Environment>('QA & IST');
  const [modalData, setModalData] = useState<{ title: string; issues: Defect[] } | null>(null);

  useEffect(() => {
    if (selectedEnvironment) {
      setActiveEnv(selectedEnvironment);
      setSelectedEnvironment(null);
    }
  }, [selectedEnvironment, setSelectedEnvironment]);

  const allDefectsData = useMemo(() => getDefectsForRelease(selectedReleases), [selectedReleases]);
  const envDefects = useMemo(() => allDefectsData.filter(d => d.environment === activeEnv), [allDefectsData, activeEnv]);

  const bugsByDomain    = useMemo(() => getBugsByDomain(envDefects), [envDefects]);
  const bugsByPriority  = useMemo(() => getBugsByPriority(envDefects), [envDefects]);
  const bugsByRootCause = useMemo(() => getBugsByRootCause(envDefects), [envDefects]);
  const funcVsPerf      = useMemo(() => getFunctionalVsPerformance(envDefects), [envDefects]);
  const manualVsAuto    = useMemo(() => getManualVsAutomation(envDefects), [envDefects]);

  const handleDomainClick   = (domain: string)   => setModalData({ title: `${domain} — ${activeEnv} Bugs`,             issues: envDefects.filter(d => d.domain === domain) });
  const handlePriorityClick = (priority: string) => setModalData({ title: `${priority} Priority — ${activeEnv} Bugs`, issues: envDefects.filter(d => d.priority === priority) });

  const columns = [
    { key: 'key' as const,         label: 'Key',         render: (v: unknown) => <JiraLink issueKey={v as string} /> },
    { key: 'summary' as const,     label: 'Summary' },
    { key: 'priority' as const,    label: 'Priority',    render: (v: unknown) => <PriorityBadge priority={v as string} /> },
    { key: 'status' as const,      label: 'Status',      render: (v: unknown) => <StatusBadge status={v as string} /> },
    { key: 'domain' as const,      label: 'Domain' },
    { key: 'environment' as const, label: 'Environment' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Environment Tabs */}
      <div className="flex gap-1">
        {ENVIRONMENTS.map(env => (
          <button
            key={env}
            onClick={() => setActiveEnv(env)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeEnv === env
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-accent border border-border'
            }`}
          >
            {env}
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-3 gap-4 mx-auto">
        <ChartCard title="Bugs by Domain">
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bugsByDomain}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="domain" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" fill="hsl(214, 89%, 51%)" radius={[4,4,0,0]} cursor="pointer"
                  onClick={(d: any) => handleDomainClick(d.domain)} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Bugs by Priority">
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bugsByPriority}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="priority" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" radius={[4,4,0,0]} cursor="pointer" onClick={(d: any) => handlePriorityClick(d.priority)}>
                  {bugsByPriority.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Functional vs Performance">
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 50 }}>
                <Pie data={funcVsPerf} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={62} innerRadius={28} labelLine={false} label={{ fontSize: 11 }}>
                  {funcVsPerf.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Root Cause Analysis">
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bugsByRootCause} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="cause" type="category" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={110} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" fill="hsl(214, 89%, 51%)" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Manual vs Automation">
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 50 }}>
                <Pie data={manualVsAuto} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={62} innerRadius={28} labelLine={false} label={{ fontSize: 11 }}>
                  {manualVsAuto.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Project-wise MTTR — replaces old numeric card */}
        <ChartCard title="MTTR by Project (days)">
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectMTTRData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={[0, 'auto']} />
                <YAxis dataKey="project" type="category" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" width={105} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v} days`, 'MTTR']} />
                <Bar dataKey="mttr" fill="hsl(262, 83%, 58%)" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Issue Table */}
      <ChartCard title={`${activeEnv} — All Issues (${envDefects.length})`}>
        <DataTable
          data={envDefects as unknown as Record<string, unknown>[]}
          columns={columns as any}
          pageSize={10}
          onRowClick={(row: any) => window.open(`https://jira.ingram.com/browse/${row.key}`, '_blank')}
        />
      </ChartCard>

      {modalData && (
        <IssueModal title={modalData.title} issues={modalData.issues} onClose={() => setModalData(null)} />
      )}
    </div>
  );
};

export default DefectsPage;
