import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bug, TestTube2, Kanban, TrendingUp, ListChecks } from 'lucide-react';

const navItems = [
  { path: '/',              label: 'Executive Overview',   icon: LayoutDashboard },
  { path: '/defects',       label: 'Defects Dashboard',    icon: Bug },
  { path: '/test-cases',    label: 'Test Case Dashboard',  icon: TestTube2 },
  { path: '/release-board', label: 'Release Board',        icon: Kanban },
  { path: '/trends',        label: 'Trends',               icon: TrendingUp },
  { path: '/stories-tasks', label: 'Stories & Tasks',      icon: ListChecks },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-56 bg-sidebar-bg flex flex-col shrink-0 h-screen">
      <div className="h-14 flex items-center px-4 border-b border-sidebar-border">
        {/* Logo placeholder — replace src with actual logo asset */}
        <div className="flex items-center gap-2.5 w-full">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-xs">QA</span>
          </div>
          <span className="text-sidebar-fg font-semibold text-sm leading-tight"> QA Dashboard</span>
        </div>
      </div>
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'bg-sidebar-active text-sidebar-active-fg' : 'text-sidebar-fg hover:bg-sidebar-hover'}`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-fg/50 text-center">v26.4 — QA Analytics</p>
      </div>
    </aside>
  );
};

export default Sidebar;
