import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Activity,
  Users,
  Cpu,
  Target,
  Fingerprint,
  TerminalSquare,
  HelpCircle,
  Wrench,
  Briefcase,
  BarChart,
  Settings,
  Bug
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'Dashboard', icon: LayoutDashboard },
  { id: 'Board', icon: KanbanSquare, badge: '1' },
  { id: 'Ops Center', icon: Activity },
  { id: 'AI Employees', icon: Users },
  { id: 'Automations', icon: Cpu },
  { id: 'Goals Lab', icon: Target },
  { id: 'Identity', icon: Fingerprint },
  { id: 'AI Log', icon: TerminalSquare, badge: '9+' },
  { id: 'Questions', icon: HelpCircle },
  { id: 'Skill Factory', icon: Wrench },
  { id: 'Agent Teams', icon: Users },
  { id: 'Workspace', icon: Briefcase },
  { id: 'Reports', icon: BarChart },
  { id: 'Settings', icon: Settings },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/[0.08] bg-[#0a0a0f] flex flex-col h-full relative z-20">
      <div className="h-20 flex items-center px-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 glow-primary">
            <Bug className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold text-white tracking-wide">Clawman</span>
            <span className="text-[10px] text-text-muted">Mission Control for AI Agents</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 hide-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative group",
                isActive ? "text-white bg-red-500/10 border border-red-500/20" : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              )}
              <div className="flex items-center gap-3 relative z-10">
                <item.icon className={cn("h-5 w-5 transition-colors duration-300", isActive ? "text-primary" : "text-text-muted group-hover:text-text-secondary")} />
                <span>{item.id}</span>
              </div>
              {item.badge && (
                <span className={cn(
                  "relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                  item.id === 'Board' ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
