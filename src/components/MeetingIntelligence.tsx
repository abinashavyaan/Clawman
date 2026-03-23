import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { meetings } from '../lib/mockData';
import { cn } from '../lib/utils';
import { Calendar, TrendingUp, CheckSquare, Clock, Search, Filter, ChevronDown, Sparkles, Globe, Link, Video, Send } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import DOMPurify from 'dompurify';
import { format, parseISO } from 'date-fns';

const MEETING_COLORS: Record<string, string> = {
  '1-on-1': '#60a5fa',
  'external': '#a78bfa',
  'sales': '#34d399',
  'team': '#fb923c',
  'standup': '#818cf8',
  'planning': '#2dd4bf',
};

export function MeetingIntelligence() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Stats
  const totalMeetings = meetings.length;
  const openActionItems = meetings.reduce((acc, m) => acc + m.action_items.filter(a => !a.done).length, 0);
  const avgDuration = Math.round(meetings.reduce((acc, m) => acc + m.duration_minutes, 0) / (totalMeetings || 1));

  // Chart Data
  const typeDistribution = Object.entries(
    meetings.reduce((acc, m) => {
      acc[m.meeting_type] = (acc[m.meeting_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Mock trend data
  const trendData = [
    { name: 'Week 1', meetings: 12 },
    { name: 'Week 2', meetings: 19 },
    { name: 'Week 3', meetings: 15 },
    { name: 'Week 4', meetings: 22 },
  ];

  const filteredMeetings = meetings.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-text-primary mb-1">Meeting Intelligence</h2>
        <p className="text-text-muted text-sm">AI-driven insights and action items from your team's meetings.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Meetings', value: '247', icon: Calendar, color: 'text-primary', glow: 'glow-primary' },
          { label: 'This Week', value: '8', icon: TrendingUp, color: 'text-cyan', glow: 'glow-cyan' },
          { label: 'Open Action Items', value: openActionItems.toString(), icon: CheckSquare, color: 'text-amber', glow: 'glow-amber' },
          { label: 'Avg Duration', value: `${avgDuration}m`, icon: Clock, color: 'text-purple-400', glow: 'shadow-[0_0_15px_rgba(192,132,252,0.15)]' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center gap-5 group hover:-translate-y-1 transition-all duration-300"
          >
            <div className={cn("p-4 rounded-2xl bg-surface border border-white/10 transition-all duration-300 group-hover:border-white/20", kpi.glow)}>
              <kpi.icon className={cn("h-6 w-6", kpi.color)} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted mb-1">{kpi.label}</p>
              <h3 className="text-3xl font-display font-bold text-text-primary tracking-tight">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 h-[320px] flex flex-col group hover:border-white/10 transition-colors"
        >
          <h3 className="font-display font-semibold mb-6 text-lg">Meeting Type Distribution</h3>
          <div className="flex-1 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={MEETING_COLORS[entry.name] || '#9ca3af'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#fff', fontWeight: 500 }}
                  cursor={{fill: 'transparent'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {typeDistribution.map(entry => (
              <div key={entry.name} className="flex items-center gap-2 text-xs font-medium text-text-secondary capitalize">
                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: MEETING_COLORS[entry.name] || '#9ca3af', boxShadow: `0 0 8px ${MEETING_COLORS[entry.name] || '#9ca3af'}80` }} />
                {entry.name}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 h-[320px] flex flex-col group hover:border-white/10 transition-colors"
        >
          <h3 className="font-display font-semibold mb-6 text-lg">Monthly Trend</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#fff', fontWeight: 500 }}
                />
                <Bar dataKey="meetings" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface/50 backdrop-blur-md border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto overflow-x-auto hide-scrollbar pb-2 sm:pb-0">
          <button className="whitespace-nowrap px-5 py-3 rounded-xl bg-surface/50 backdrop-blur-md border border-white/10 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-all flex items-center gap-2 shadow-sm">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="whitespace-nowrap px-5 py-3 rounded-xl bg-surface/50 backdrop-blur-md border border-white/10 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-white/20 hover:bg-white/5 transition-all shadow-sm">
            Has Action Items
          </button>
        </div>
      </div>

      {/* Meeting Feed */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting, i) => {
          const isExpanded = expandedId === meeting.id;
          
          return (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className={cn(
                "glass-card overflow-hidden transition-all duration-500",
                isExpanded ? "ring-1 ring-primary/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]" : "hover:border-white/10"
              )}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : meeting.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-center gap-5 flex-1 min-w-0 z-10">
                  <div className="w-28 shrink-0">
                    <span 
                      className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-md border backdrop-blur-sm shadow-sm"
                      style={{ 
                        color: MEETING_COLORS[meeting.meeting_type] || '#9ca3af',
                        borderColor: `${MEETING_COLORS[meeting.meeting_type] || '#9ca3af'}40`,
                        backgroundColor: `${MEETING_COLORS[meeting.meeting_type] || '#9ca3af'}15`,
                        boxShadow: `0 0 10px ${MEETING_COLORS[meeting.meeting_type] || '#9ca3af'}15`
                      }}
                    >
                      {meeting.meeting_type}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary truncate text-base group-hover:text-primary transition-colors duration-300">{meeting.title}</h4>
                    <div className="flex items-center gap-3 text-xs font-medium text-text-muted/80 mt-1.5">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {format(parseISO(meeting.date), 'MMM d, yyyy')}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {meeting.duration_display}</span>
                      {meeting.has_external_participants && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-cyan"><Globe className="h-3 w-3" /> External</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 z-10">
                  <div className="hidden sm:flex -space-x-3">
                    {meeting.attendees.slice(0, 3).map((attendee, idx) => (
                      <div key={idx} className="h-10 w-10 rounded-full bg-surface border-2 border-background flex items-center justify-center text-sm font-medium z-10 relative shadow-lg hover:-translate-y-1 transition-transform duration-300" title={attendee}>
                        {attendee.charAt(0)}
                      </div>
                    ))}
                    {meeting.attendees.length > 3 && (
                      <div className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border-2 border-background flex items-center justify-center text-xs font-medium z-10 relative shadow-lg">
                        +{meeting.attendees.length - 3}
                      </div>
                    )}
                  </div>
                  
                  {meeting.action_items.length > 0 && (
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber/10 border border-amber/20 text-amber text-xs font-bold shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                      <CheckSquare className="h-3.5 w-3.5" />
                      {meeting.action_items.filter(a => !a.done).length} open
                    </div>
                  )}
                  
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300",
                    isExpanded ? "bg-primary/20 text-primary" : "bg-surface border border-white/5 text-text-muted group-hover:bg-white/5 group-hover:text-text-primary"
                  )}>
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-500", isExpanded && "rotate-180")} />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-white/5 bg-black/40 backdrop-blur-xl relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                      <div className="md:col-span-2 space-y-8">
                        <div>
                          <h5 className="text-sm font-bold text-text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" /> AI Summary
                          </h5>
                          <div 
                            className="text-sm text-text-secondary leading-relaxed prose prose-invert max-w-none bg-surface/30 p-5 rounded-2xl border border-white/5 shadow-inner"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(meeting.summary) }}
                          />
                        </div>
                        
                        {meeting.action_items.length > 0 && (
                          <div>
                            <h5 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
                              <CheckSquare className="h-4 w-4 text-amber" /> Action Items
                            </h5>
                            <div className="space-y-3">
                              {meeting.action_items.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 group">
                                  <div className={cn(
                                    "mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm",
                                    item.done ? "bg-primary border-primary text-background shadow-[0_0_10px_rgba(16,185,129,0.2)]" : "border-white/20 group-hover:border-primary/50"
                                  )}>
                                    {item.done && <CheckSquare className="h-3.5 w-3.5" />}
                                  </div>
                                  <div className="flex-1">
                                    <p className={cn("text-sm transition-colors duration-300", item.done ? "text-text-muted line-through" : "text-text-secondary group-hover:text-text-primary")}>
                                      {item.task}
                                    </p>
                                  </div>
                                  <div className="text-xs font-medium px-2.5 py-1 rounded-md bg-surface border border-white/10 text-text-muted shadow-sm">
                                    {item.assignee}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 shadow-[0_0_20px_rgba(16,185,129,0.05)] relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                          <div className="flex items-center gap-2 mb-3 text-primary relative z-10">
                            <Sparkles className="h-5 w-5" />
                            <h5 className="text-sm font-bold uppercase tracking-wider">AI Insights</h5>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed relative z-10">{meeting.ai_insights}</p>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          <button className="w-full py-3 px-4 rounded-xl bg-surface hover:bg-white/10 border border-white/10 text-sm font-medium text-text-primary transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <Video className="h-4 w-4 text-cyan" /> Open Recording
                          </button>
                          <button className="w-full py-3 px-4 rounded-xl bg-surface hover:bg-white/10 border border-white/10 text-sm font-medium text-text-primary transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <Link className="h-4 w-4 text-primary" /> Share Link
                          </button>
                          <button className="w-full py-3 px-4 rounded-xl bg-surface hover:bg-white/10 border border-white/10 text-sm font-medium text-text-primary transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <Send className="h-4 w-4 text-amber" /> Send To...
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
