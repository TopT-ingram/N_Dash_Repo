import { useMemo } from 'react';
import { storiesTasksData } from '@/data/mockData';
import ChartCard from '@/components/dashboard/ChartCard';
import { BookOpen, CheckSquare, Bug, LayoutList } from 'lucide-react';
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const PIE_COLORS_STORY = ['hsl(214, 89%, 51%)','hsl(142, 71%, 45%)','hsl(38, 92%, 50%)','hsl(0, 72%, 51%)','hsl(262, 83%, 58%)'];
const PIE_COLORS_TASK  = ['hsl(214, 89%, 51%)','hsl(38, 92%, 50%)','hsl(0, 72%, 51%)','hsl(142, 71%, 45%)'];
const PRIORITY_COLORS  = ['hsl(0, 72%, 51%)','hsl(38, 92%, 50%)','hsl(142, 71%, 45%)'];

const TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  fontSize: '12px',
};

const SummaryCard = ({
  icon: Icon, label, count, color,
}: { icon: React.ElementType; label: string; count: number; color: string }) => (
  <div className="dashboard-card p-5 flex items-center gap-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground">{count.toLocaleString()}</p>
    </div>
  </div>
);

const StoriesTasksPage = () => {
  const stories = useMemo(() => storiesTasksData.filter(d => d.type === 'Story'), []);
  const tasks   = useMemo(() => storiesTasksData.filter(d => d.type === 'Task'), []);
  const bugs    = useMemo(() => storiesTasksData.filter(d => d.type === 'Bug'), []);
  const total   = storiesTasksData.length;

  // Stories status pie
  const storyStatusPie = useMemo(() => {
    const map: Record<string, number> = {};
    stories.forEach(s => { map[s.status] = (map[s.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [stories]);

  // Tasks status pie
  const taskStatusPie = useMemo(() => {
    const map: Record<string, number> = {};
    tasks.forEach(t => { map[t.status] = (map[t.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  // Open stories by priority (only open stories)
  const openStoriesByPriority = useMemo(() => {
    const openStories = stories.filter(s => s.status === 'Open');
    const map: Record<string, number> = {};
    openStories.forEach(s => { map[s.priority] = (map[s.priority] || 0) + 1; });
    return ['P1/High','P2','P3/Low'].map(p => ({ priority: p, count: map[p] || 0 }));
  }, [stories]);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard icon={BookOpen}   label="Stories" count={stories.length} color="bg-primary/10 text-primary" />
        <SummaryCard icon={CheckSquare} label="Tasks"   count={tasks.length}   color="bg-success/10 text-success" />
        <SummaryCard icon={Bug}         label="Bugs"    count={bugs.length}    color="bg-destructive/10 text-destructive" />
        <SummaryCard icon={LayoutList}  label="Total"   count={total}          color="bg-warning/10 text-warning" />
      </div>

      {/* Status Pie Charts */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Stories by Status">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={storyStatusPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label={{ fontSize: 11 }}>
                {storyStatusPie.map((_, i) => <Cell key={i} fill={PIE_COLORS_STORY[i % PIE_COLORS_STORY.length]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tasks by Status">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={taskStatusPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label={{ fontSize: 11 }}>
                {taskStatusPie.map((_, i) => <Cell key={i} fill={PIE_COLORS_TASK[i % PIE_COLORS_TASK.length]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Priority Bar Chart */}
      <ChartCard title="Open Stories by Priority">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={openStoriesByPriority} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis dataKey="priority" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={70} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="count" name="Open Stories" radius={[0,4,4,0]}>
              {openStoriesByPriority.map((_, i) => <Cell key={i} fill={PRIORITY_COLORS[i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default StoriesTasksPage;
