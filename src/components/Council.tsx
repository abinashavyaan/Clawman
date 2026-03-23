import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { councilSessions, agents } from '../lib/mockData';
import { cn } from '../lib/utils';
import { ChevronDown, MessageSquare, Users } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

export function Council() {
  const [expandedId, setExpandedId] = useState<string | null>(councilSessions[0].id);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Agent Council</h2>
        <p className="text-text-muted text-sm">Structured debate and consensus building between AI agents.</p>
      </div>

      {councilSessions.map((session, i) => {
        const isExpanded = expandedId === session.id;
        
        // Get unique agents in this session
        const participantIds = Array.from(new Set(session.messages.map(m => m.agentId)));
        const participants = participantIds.map(id => agents.find(a => a.id === id)).filter(Boolean);

        return (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "glass-card overflow-hidden transition-all duration-500",
              isExpanded ? "ring-1 ring-primary/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]" : "hover:border-white/10"
            )}
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : session.id)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex-1 pr-6 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className={cn(
                    "text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm",
                    session.status === 'active' 
                      ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                      : "bg-white/5 text-text-muted border border-white/10"
                  )}>
                    {session.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-medium">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {session.messages.length} messages
                  </div>
                </div>
                <h3 className="text-lg font-medium text-text-primary leading-snug group-hover:text-primary transition-colors duration-300">
                  {session.question}
                </h3>
              </div>
              
              <div className="flex items-center gap-6 z-10">
                <div className="hidden sm:flex -space-x-3">
                  {participants.map((p, idx) => (
                    <div 
                      key={idx} 
                      className="h-10 w-10 rounded-full bg-surface border-2 border-background flex items-center justify-center text-sm z-10 relative shadow-lg hover:-translate-y-1 transition-transform duration-300" 
                      title={p?.name}
                    >
                      {p?.emoji}
                    </div>
                  ))}
                </div>
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
                  <div className="p-6 space-y-8 relative z-10">
                    {session.messages.map((msg, idx) => {
                      const agent = agents.find(a => a.id === msg.agentId);
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                          className="flex gap-4 group"
                        >
                          <div className="h-12 w-12 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-lg group-hover:border-primary/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300">
                            {agent?.emoji}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-3 mb-1.5">
                              <span className="font-medium text-sm text-text-primary">{agent?.name}</span>
                              <span className="text-[10px] text-text-muted/70 font-mono uppercase tracking-wider">
                                #{idx + 1} • {formatDistanceToNow(parseISO(msg.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            <div className="text-sm text-text-secondary leading-relaxed bg-surface/40 p-4 rounded-2xl rounded-tl-sm border border-white/5 inline-block shadow-sm group-hover:border-white/10 transition-colors duration-300">
                              {msg.text}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
