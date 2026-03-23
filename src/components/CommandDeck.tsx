import React from 'react';
import { motion } from 'motion/react';
import { 
  ListTodo, 
  CheckCircle2, 
  AlertCircle, 
  Bot, 
  Zap, 
  TrendingUp, 
  FileText, 
  Lightbulb, 
  ScrollText,
  MessageSquareWarning,
  Check
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';

const priorityData = [
  { name: 'Low', value: 5, color: '#10b981' },
  { name: 'Medium', value: 10, color: '#f59e0b' },
  { name: 'High', value: 10, color: '#ef4444' },
  { name: 'Urgent', value: 5, color: '#8b5cf6' },
];

const weeklyData = [
  { name: 'Mon', value: 2 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 2 },
  { name: 'Thu', value: 4 },
  { name: 'Fri', value: 6 },
  { name: 'Sat', value: 5 },
  { name: 'Sun', value: 7 },
];

const aiLogs = [
  { id: 1, agent: 'Ray', emoji: '🤖', time: '06:00 PM PST 1', message: 'heartbeat — Presence + timestamp ...', date: 'Feb 27, 6:00 PM' },
  { id: 2, agent: 'System', emoji: '⚙️', time: '05:57 PM', message: 'Forge feature complete. Built: forge_analyses migration, fo...', date: 'Feb 27, 5:57 PM' },
  { id: 3, agent: 'System', emoji: '⚙️', time: '05:49 PM', message: 'forge-analyzer edge function deployed and tested. AI analy...', date: 'Feb 27, 5:49 PM' },
  { id: 4, agent: 'System', emoji: '⚙️', time: '05:30 PM', message: 'Started...', date: 'Feb 27, 5:30 PM' },
];

export function CommandDeck() {
  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto relative pb-24">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-2">Good evening</h1>
          <p className="text-text-secondary">Friday, February 27, 2026 · 7 tasks remaining</p>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'TOTAL TASKS', value: '30', icon: ListTodo },
          { label: 'COMPLETED', value: '23', icon: CheckCircle2 },
          { label: 'NEEDS INPUT', value: '1', icon: AlertCircle },
          { label: 'AI TASKS', value: '30', icon: Bot },
          { label: 'SUB-AGENTS', value: '0', icon: Bot },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 flex flex-col justify-between h-28 group hover:border-white/20"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-text-muted tracking-wider">{kpi.label}</span>
              <kpi.icon className="h-5 w-5 text-text-muted group-hover:text-white transition-colors" />
            </div>
            <span className="text-3xl font-display font-bold text-white">{kpi.value}</span>
          </motion.div>
        ))}
      </div>

      {/* AI Impact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card border-white/10 p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 via-transparent to-transparent" />
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-display font-bold text-white">AI Impact — Today</h2>
          <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">
            128 actions
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { value: '8', label: 'Tasks Done Today', icon: CheckCircle2, color: 'text-emerald-500' },
            { value: '23', label: 'This Week', icon: TrendingUp, color: 'text-red-500' },
            { value: '0', label: 'Reports', icon: FileText, color: 'text-cyan-500' },
            { value: '12', label: 'Insights', icon: Lightbulb, color: 'text-amber-500' },
            { value: '108', label: 'Log Entries', icon: ScrollText, color: 'text-white' },
          ].map((stat, i) => (
            <div key={stat.label} className="bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
              <stat.icon className={cn("h-5 w-5 mb-3", stat.color)} />
              <span className="text-2xl font-display font-bold text-white mb-1">{stat.value}</span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts and Logs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 flex flex-col"
        >
          <h3 className="text-sm font-medium text-text-secondary mb-6">Completion Rate</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-48 h-48 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="#ef4444" 
                  strokeWidth="12" 
                  fill="none" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 * (1 - 0.77)} 
                  className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-bold text-white">77%</span>
                <span className="text-[10px] text-text-muted uppercase tracking-wider">Complete</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Priority Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 flex flex-col"
        >
          <h3 className="text-sm font-medium text-text-secondary mb-6">Priority Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-40 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-white">30</span>
                <span className="text-[10px] text-text-muted">tasks</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              {priorityData.map(item => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-text-secondary">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Pending Questions & AI Log */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <MessageSquareWarning className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <span className="text-xl font-bold text-white block">0</span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider">Pending Questions</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-5 flex-1 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-text-secondary">AI Log</h3>
              <button className="text-[10px] text-red-500 hover:text-red-400 transition-colors">View log</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 hide-scrollbar">
              {aiLogs.map(log => (
                <div key={log.id} className="relative pl-4 border-l border-white/10">
                  <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-black border-2 border-white/20" />
                  <p className="text-xs text-text-secondary mb-1">
                    <span className="text-white font-medium">{log.agent} {log.emoji}</span> {log.message}
                  </p>
                  <p className="text-[10px] text-text-muted">{log.date}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6 h-64"
      >
        <h3 className="text-sm font-medium text-text-secondary mb-6 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> Weekly Progress
        </h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 bg-black border border-white/10 rounded-xl p-4 shadow-2xl flex items-center gap-3 z-50"
      >
        <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
          <Check className="h-4 w-4 text-black" />
        </div>
        <span className="text-sm font-medium text-white">Welcome back!</span>
      </motion.div>
    </div>
  );
}
