import React from 'react';
import { motion } from 'motion/react';
import { agents } from '../lib/mockData';
import { cn } from '../lib/utils';
import { Shield, Code, Cpu, Activity } from 'lucide-react';

export function AgentProfiles() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex flex-col group"
          >
            <div className="p-8 border-b border-white/[0.08] relative overflow-hidden">
              <div className={cn(
                "absolute top-0 left-0 w-full h-1.5 transition-all duration-500 group-hover:h-2",
                agent.color === 'primary' ? 'bg-primary glow-primary' :
                agent.color === 'amber' ? 'bg-amber glow-amber' : 'bg-cyan glow-cyan'
              )} />
              
              <div className="absolute -right-6 -top-6 w-40 h-40 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none"
                   style={{ backgroundColor: `var(--color-${agent.color})` }} />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="h-20 w-20 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {agent.emoji}
                </div>
                <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    agent.status === 'active' ? "bg-primary animate-pulse glow-primary" :
                    agent.status === 'idle' ? "bg-amber glow-amber" : "bg-red glow-red"
                  )} />
                  <span className="text-xs font-semibold text-text-secondary capitalize">{agent.status}</span>
                </div>
              </div>
              
              <h3 className="text-3xl font-display font-bold text-white relative z-10 tracking-tight">{agent.name}</h3>
              <p className="text-sm text-text-muted relative z-10 mt-1">{agent.role} • {agent.type}</p>
            </div>
            
            <div className="p-8 flex-1 flex flex-col gap-8 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-5 rounded-xl border border-white/[0.05] group-hover:border-white/[0.1] transition-colors">
                  <p className="text-xs font-medium text-text-muted mb-2">Tasks Completed</p>
                  <p className="text-2xl font-mono font-bold text-white">{agent.tasksCompleted.toLocaleString()}</p>
                </div>
                <div className="bg-black/20 p-5 rounded-xl border border-white/[0.05] group-hover:border-white/[0.1] transition-colors">
                  <p className="text-xs font-medium text-text-muted mb-2">Accuracy</p>
                  <p className="text-2xl font-mono font-bold text-white">{agent.accuracy}%</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-text-muted mb-4 uppercase tracking-wider">Core Skills</p>
                <div className="flex flex-wrap gap-2">
                  {agent.skills.map(skill => (
                    <span key={skill} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-text-secondary group-hover:border-white/20 group-hover:text-white transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/[0.08] bg-black/20 relative z-10">
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg">
                View Details & Logs
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
