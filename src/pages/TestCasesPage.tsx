import { useState, useMemo } from 'react';
import { useFilterStore, ENVIRONMENTS, type Environment } from '@/store/filterStore';
import { testCasesByEnv, performanceTCStats, automationByDomain } from '@/data/mockData';
import ChartCard from '@/components/dashboard/ChartCard';
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = ['hsl(214, 89%, 51%)', 'hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)', 'hsl(var(--muted-foreground))'];

const TestCasesPage = () => {
  const { selectedReleases } = useFilterStore();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const totalTestCases = useMemo(() => {
    return Object.values(testCasesByEnv).reduce((acc, v) => acc + v.total, 0);
  }, []);

  const automationData = useMemo(() => {
    if (selectedDomain) {
      const d = automationByDomain.find(a => a.domain === selectedDomain);
      if (d) return [d];
    }
    return automationByDomain;
  }, [selectedDomain]);

  const automationPie = useMemo(() => {
    const totals = automationData.reduce(
      (acc, d) => ({
        automated: acc.automated + d.automated,
        notAutomated: acc.notAutomated + d.notAutomated,
        notFeasible: acc.notFeasible + d.notFeasible,
      }),
      { automated: 0, notAutomated: 0, notFeasible: 0 }
    );
    return [
      { name: 'Automated', value: totals.automated },
      { name: 'Not Automated', value: totals.notAutomated },
      { name: 'Not Feasible', value: totals.notFeasible },
    ];
  }, [automationData]);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Total card */}
      <div className="dashboard-card p-5 inline-flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Test Cases</p>
        <span className="text-3xl font-bold text-foreground mt-1">{totalTestCases.toLocaleString()}</span>
        <span className="text-xs text-muted-foreground mt-0.5">{selectedReleases.join(', ') || 'No release selected'}</span>
      </div>

      {/* Execution donut charts */}
      <div className="grid grid-cols-4 gap-4 mx-auto">
        {ENVIRONMENTS.map(env => {
          const stats = testCasesByEnv[env];
          const pct = Math.round((stats.executed / stats.total) * 100);
          const data = [
            { name: 'Passed', value: stats.passed },
            { name: 'Failed', value: stats.failed },
            { name: 'Blocked', value: stats.blocked },
            { name: 'Not Run', value: stats.notRun },
          ];
          return (
            <ChartCard key={env} title={`${env} Execution (${pct}%)`}>
              <div style={{ height: 340 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 60 }}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={35} outerRadius={65} labelLine={false} label={{ fontSize: 10 }}>
                      {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={40} wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          );
        })}
      </div>

      {/* Automation Coverage & Performance TCs Execution & Automation Coverage by Domain */}
      <div className="grid grid-cols-4 gap-4 mx-auto">
        <ChartCard title={`Automation Coverage ${selectedDomain ? `— ${selectedDomain}` : ''}`}>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 15, right: 0, left: 0, bottom: 50 }}>
                <Pie data={automationPie} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={60} innerRadius={28} labelLine={false} label={{ fontSize: 10 }}>
                  {automationPie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={35} wrapperStyle={{ fontSize: '10px', paddingTop: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {selectedDomain && (
            <button onClick={() => setSelectedDomain(null)} className="text-xs text-primary hover:underline mt-2">
              Clear domain filter
            </button>
          )}
        </ChartCard>

        <ChartCard title={`Performance TCs Execution (${Math.round((performanceTCStats.executed / performanceTCStats.total) * 100)}%)`}>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 15, right: 0, left: 0, bottom: 50 }}>
                <Pie 
                  data={[
                    { name: 'Passed', value: performanceTCStats.passed },
                    { name: 'Failed', value: performanceTCStats.failed },
                    { name: 'Blocked', value: performanceTCStats.blocked },
                    { name: 'Not Run', value: performanceTCStats.notRun },
                  ]} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="45%" 
                  innerRadius={28} 
                  outerRadius={60} 
                  labelLine={false} 
                  label={{ fontSize: 9 }}
                >
                  {[0,1,2,3].map((i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={35} wrapperStyle={{ fontSize: '10px', paddingTop: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="col-span-2">
        <ChartCard title="Automation Coverage by Domain">
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={automationByDomain} layout="vertical" margin={{ top: 15, right: 15, left: 5, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="domain" type="category" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" width={95} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
                <Bar dataKey="automated" stackId="a" fill={COLORS[0]} radius={[0, 3, 3, 0]} cursor="pointer" onClick={(d: any) => setSelectedDomain(d.domain)} />
                <Bar dataKey="notAutomated" stackId="a" fill={COLORS[2]} />
                <Bar dataKey="notFeasible" stackId="a" fill={COLORS[3]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      </div>
    </div>
  );
};

export default TestCasesPage;
