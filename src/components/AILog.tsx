import React, { useState } from 'react';
import { motion } from 'motion/react';
import { logs, agents } from '../lib/mockData';
import { cn } from '../lib/utils';
import { format, parseISO } from 'date-fns';
import { Filter } from 'lucide-react';

const CATEGORIES = ['all', 'observation', 'general', 'reminder', 'fyi'];

export function AILog() {
  const [filter, setFilter] = useState('all');

  const filteredLogs = filter === 'all' ? logs : logs.filter(l => l.category === filter);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-text-primary mb-1">System Logs</h2>
          <p className="text-text-muted text-sm">Real-time activity stream from all active agents.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-surface/50 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-lg">
          <Filter className="h-4 w-4 text-text-muted ml-2" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-300",
                filter === cat 
                  ? "bg-primary/20 text-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                  : "text-text-muted hover:text-text-primary hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="divide-y divide-white/5">
          {filteredLogs.map((log, i) => {
            const agent = agents.find(a => a.id === log.agentId);
            
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 flex gap-4 hover:bg-white/[0.02] transition-colors items-start sm:items-center flex-col sm:flex-row group relative"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-32 shrink-0 text-xs font-mono text-text-muted/70 group-hover:text-text-muted transition-colors z-10">
                  {format(parseISO(log.timestamp), 'MMM dd, HH:mm:ss')}
                </div>
                
                <div className="flex items-center gap-3 w-48 shrink-0 z-10">
                  <div className="h-8 w-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-colors">
                    <span className="text-sm">{agent?.emoji}</span>
                  </div>
                  <span className="text-sm font-medium text-text-primary truncate">{agent?.name}</span>
                </div>
                
                <div className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors z-10">
                  {log.message}
                </div>
                
                <div className="shrink-0 z-10">
                  <span className={cn(
                    "text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border backdrop-blur-sm",
                    log.category === 'observation' ? "text-primary border-primary/30 bg-primary/10 shadow-[0_0_10px_rgba(16,185,129,0.1)]" :
                    log.category === 'reminder' ? "text-amber border-amber/30 bg-amber/10 shadow-[0_0_10px_rgba(245,158,11,0.1)]" :
                    log.category === 'fyi' ? "text-cyan border-cyan/30 bg-cyan/10 shadow-[0_0_10px_rgba(6,182,212,0.1)]" :
                    "text-text-muted border-white/10 bg-white/5"
                  )}>
                    {log.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
