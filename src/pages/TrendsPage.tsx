import { useState, useMemo } from 'react';
import { SPRINT_RELEASES, sprintTrendData } from '@/data/mockData';
import ChartCard from '@/components/dashboard/ChartCard';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const CHART_COLORS = [
  'hsl(214, 89%, 51%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(0, 72%, 51%)',
  'hsl(262, 83%, 58%)',
];

const TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px',
};

const axisProps = {
  tick: { fontSize: 10, fill: 'hsl(var(--muted-foreground))' },
  stroke: 'hsl(var(--muted-foreground))',
};

const ReleaseSelect = ({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-muted-foreground font-medium">{label}</span>
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-1.5 rounded-md border border-border bg-card text-sm font-medium text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
);

const TrendsPage = () => {
  const [fromRelease, setFromRelease] = useState(SPRINT_RELEASES[0]);
  const [toRelease, setToRelease] = useState(SPRINT_RELEASES[SPRINT_RELEASES.length - 1]);

  const filteredData = useMemo(() => {
    const fromIdx = SPRINT_RELEASES.indexOf(fromRelease);
    const toIdx = SPRINT_RELEASES.indexOf(toRelease);
    const [start, end] = fromIdx <= toIdx ? [fromIdx, toIdx] : [toIdx, fromIdx];
    return sprintTrendData.slice(start, end + 1);
  }, [fromRelease, toRelease]);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Range selector */}
      <div className="dashboard-card p-4 flex items-center gap-6 flex-wrap">
        <span className="text-sm font-semibold text-foreground">Release Range</span>
        <ReleaseSelect label="From" value={fromRelease} onChange={setFromRelease} options={SPRINT_RELEASES} />
        <span className="text-muted-foreground">→</span>
        <ReleaseSelect label="To" value={toRelease} onChange={setToRelease} options={SPRINT_RELEASES} />
        <span className="text-xs text-muted-foreground ml-2">
          {filteredData.length} release{filteredData.length !== 1 ? 's' : ''} selected
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Story Points Trend */}
        <ChartCard title="Story Points Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={filteredData} margin={{ top: 5, right: 16, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="release" {...axisProps} angle={-25} textAnchor="end" height={48} interval={0} />
              <YAxis {...axisProps} width={36} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="storyPoints" name="Story Points" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Defect Density */}
        <ChartCard title="Defect Density Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={filteredData} margin={{ top: 5, right: 16, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="release" {...axisProps} angle={-25} textAnchor="end" height={48} interval={0} />
              <YAxis {...axisProps} width={36} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="defectDensity" name="Defect Density" stroke={CHART_COLORS[3]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Automation Coverage */}
        <ChartCard title="Automation Coverage Trend (%)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={filteredData} margin={{ top: 5, right: 16, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="release" {...axisProps} angle={-25} textAnchor="end" height={48} interval={0} />
              <YAxis {...axisProps} width={36} domain={[0, 100]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Bar dataKey="automationCoverage" name="Coverage %" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* FTR Trend — SEPARATE graph */}
        <ChartCard title="FTR (First Time Right) Trend (%)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={filteredData} margin={{ top: 5, right: 16, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="release" {...axisProps} angle={-25} textAnchor="end" height={48} interval={0} />
              <YAxis {...axisProps} width={36} domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v.toFixed(1)}%`, 'FTR']} />
              <Line
                type="monotone"
                dataKey="ftr"
                name="FTR %"
                stroke={CHART_COLORS[2]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* MTTR Trend — SEPARATE graph */}
        <ChartCard title="MTTR (Mean Time To Resolution) Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={filteredData} margin={{ top: 5, right: 16, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="release" {...axisProps} angle={-25} textAnchor="end" height={48} interval={0} />
              <YAxis {...axisProps} width={36} domain={[0, 10]} tickFormatter={(v) => `${v}d`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v.toFixed(1)} days`, 'MTTR']} />
              <Line
                type="monotone"
                dataKey="mttr"
                name="MTTR (days)"
                stroke={CHART_COLORS[3]}
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default TrendsPage;
