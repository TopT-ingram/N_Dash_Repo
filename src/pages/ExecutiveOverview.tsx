import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilterStore, ENVIRONMENTS, type Environment } from '@/store/filterStore';
import { sprintBugData, manualVsAutoByRelease, executiveMetrics, SPRINT_RELEASES, sprintKpiData } from '@/data/mockData';
import KPICard from '@/components/dashboard/KPICard';
import ChartCard from '@/components/dashboard/ChartCard';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const CHART_COLORS = [
  'hsl(214, 89%, 51%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(0, 72%, 51%)',
  'hsl(262, 83%, 58%)',
];

const PIE_COLORS = ['hsl(214, 89%, 51%)', 'hsl(38, 92%, 50%)'];

const TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px',
};

const AXIS_STYLE = { fontSize: 10, fill: 'hsl(var(--muted-foreground))' };

// Map environment key → sprintBugData field
const ENV_FIELD: Record<Environment, keyof typeof sprintBugData[0]> = {
  'QA & IST':   'qaIst',
  'Regression': 'regression',
  'UAT':        'uat',
  'Production': 'production',
};

// Filter sprintBugData by selected releases (header filter)
const useReleaseLineData = (selectedReleases: string[]) =>
  useMemo(() => {
    // "All Releases" or empty → show all 16 sprint releases
    const releases = (selectedReleases.length === 0 || selectedReleases.length === SPRINT_RELEASES.length)
      ? SPRINT_RELEASES
      : selectedReleases;
    return sprintBugData.filter(d => releases.includes(d.release));
  }, [selectedReleases]);

// Env line chart component (release-wise X-axis)
const EnvLineChart = ({ data, env, color }: {
  data: typeof sprintBugData;
  env: Environment;
  color: string;
}) => {
  const field = ENV_FIELD[env];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 16, left: 0, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="release"
          tick={{ ...AXIS_STYLE, fontSize: 9 }}
          stroke="hsl(var(--muted-foreground))"
          angle={-35}
          textAnchor="end"
          interval={0}
          height={48}
        />
        <YAxis tick={AXIS_STYLE} stroke="hsl(var(--muted-foreground))" width={30} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Line
          type="monotone"
          dataKey={field as string}
          name={env}
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3, fill: color }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Performance bugs line chart
const PerformanceLineChart = ({ data }: { data: typeof sprintBugData }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 5, right: 16, left: 0, bottom: 30 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      <XAxis
        dataKey="release"
        tick={{ ...AXIS_STYLE, fontSize: 9 }}
        stroke="hsl(var(--muted-foreground))"
        angle={-35}
        textAnchor="end"
        interval={0}
        height={48}
      />
      <YAxis tick={AXIS_STYLE} stroke="hsl(var(--muted-foreground))" width={30} />
      <Tooltip contentStyle={TOOLTIP_STYLE} />
      <Line
        type="monotone"
        dataKey="performance"
        name="Performance"
        stroke={CHART_COLORS[4]}
        strokeWidth={2}
        dot={{ r: 3, fill: CHART_COLORS[4] }}
        activeDot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

const ExecutiveOverview = () => {
  const navigate = useNavigate();
  const { selectedReleases } = useFilterStore();

  const chartData = useReleaseLineData(selectedReleases);

  // Aggregate KPIs across selected releases from sprintKpiData
  const aggregatedKPIs = useMemo(() => {
    const releases = (selectedReleases.length === 0 || selectedReleases.length === SPRINT_RELEASES.length)
      ? SPRINT_RELEASES
      : selectedReleases;
    return ENVIRONMENTS.map(env => {
      let totalCount = 0, totalPrev = 0;
      releases.forEach(r => {
        const item = (sprintKpiData[r] || []).find(k => k.environment === env);
        if (item) { totalCount += item.count; totalPrev += item.previousCount; }
      });
      const trend = totalPrev ? ((totalCount - totalPrev) / totalPrev * 100) : 0;
      return { environment: env, count: totalCount, trend: Math.round(trend * 10) / 10, previousCount: totalPrev };
    });
  }, [selectedReleases]);

  // Manual vs Auto pie aggregated across filtered data
  const manualAutoPie = useMemo(() => {
    const releases = (selectedReleases.length === 0 || selectedReleases.length === SPRINT_RELEASES.length)
      ? SPRINT_RELEASES
      : selectedReleases;
    const filtered = manualVsAutoByRelease.filter(d => releases.includes(d.release));
    const totalManual = filtered.reduce((s, d) => s + d.manual, 0);
    const totalAuto = filtered.reduce((s, d) => s + d.automation, 0);
    const total = totalManual + totalAuto;
    return [
      { name: 'Manual', value: totalManual, pct: total ? Math.round(totalManual / total * 100) : 0 },
      { name: 'Automation', value: totalAuto, pct: total ? Math.round(totalAuto / total * 100) : 0 },
    ];
  }, [selectedReleases]);

  const handleKPIClick = (env: Environment) => {
    useFilterStore.getState().setSelectedEnvironment(env);
    navigate('/defects');
  };

  const renderPieLabel = ({ name, pct }: { name: string; pct: number }) => `${name}: ${pct}%`;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {aggregatedKPIs.map(kpi => (
          <KPICard
            key={kpi.environment}
            label={`${kpi.environment} Bugs`}
            count={kpi.count}
            trend={kpi.trend}
            environment={kpi.environment}
            isActive={false}
            onClick={() => handleKPIClick(kpi.environment)}
          />
        ))}
      </div>

      {/* 6 Graphs — simultaneously visible, all release-wise X-axis */}
      <div className="grid grid-cols-3 gap-4 mx-auto">
        {/* Graph 1: QA & IST */}
        <ChartCard title="QA & IST Bugs — by Release">
          <div style={{ height: 280 }}>
            <EnvLineChart data={chartData} env="QA & IST" color={CHART_COLORS[0]} />
          </div>
        </ChartCard>

        {/* Graph 2: Regression */}
        <ChartCard title="Regression Bugs — by Release">
          <div style={{ height: 280 }}>
            <EnvLineChart data={chartData} env="Regression" color={CHART_COLORS[1]} />
          </div>
        </ChartCard>

        {/* Graph 3: UAT */}
        <ChartCard title="UAT Bugs — by Release">
          <div style={{ height: 280 }}>
            <EnvLineChart data={chartData} env="UAT" color={CHART_COLORS[2]} />
          </div>
        </ChartCard>

        {/* Graph 4: Production */}
        <ChartCard title="Production Bugs — by Release">
          <div style={{ height: 280 }}>
            <EnvLineChart data={chartData} env="Production" color={CHART_COLORS[3]} />
          </div>
        </ChartCard>

        {/* Graph 5: Performance */}
        <ChartCard title="Performance Bugs — by Release">
          <div style={{ height: 280 }}>
            <PerformanceLineChart data={chartData} />
          </div>
        </ChartCard>

        {/* Graph 6: Manual vs Automation Pie */}
        <ChartCard title="Manual vs Automation Bugs">
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 50 }}>
                <Pie
                  data={manualAutoPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={62}
                  innerRadius={28}
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, name, pct }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text x={x} y={y} fill="hsl(var(--foreground))" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10}>
                        {`${pct}%`}
                      </text>
                    );
                  }}
                >
                  {manualAutoPie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value: number, name: string) => [`${value} bugs`, name]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                  formatter={(value, entry: any) => `${value} (${entry.payload?.pct}%)`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Executive Metrics */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Executive Metrics</h3>
        <div className="grid grid-cols-4 gap-4">
          {executiveMetrics.map(m => (
            <div key={m.label} className="dashboard-card p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{m.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold text-foreground">{m.value}</span>
                <div className={`flex items-center gap-0.5 text-[11px] font-medium ${m.trend < 0 ? 'text-success' : 'text-destructive'}`}>
                  {m.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(m.trend)}%
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOverview;
