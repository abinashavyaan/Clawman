import React, { useState } from 'react';
import { motion } from 'motion/react';
import { tasks as initialTasks, agents } from '../lib/mockData';
import { cn } from '../lib/utils';
import { MoreHorizontal, Plus } from 'lucide-react';

const COLUMNS = [
  { id: 'todo', label: 'To Do' },
  { id: 'doing', label: 'Doing' },
  { id: 'needs_input', label: 'Needs Input' },
  { id: 'done', label: 'Done' }
];

export function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    // Required for Firefox
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks(prev => prev.map(task => 
      task.id === draggedTaskId ? { ...task, status: columnId } : task
    ));
    setDraggedTaskId(null);
  };

  return (
    <div className="p-8 h-full overflow-x-auto hide-scrollbar">
      <div className="flex gap-6 h-full min-w-[1200px] pb-8">
        {COLUMNS.map((col, colIdx) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          
          return (
            <div 
              key={col.id} 
              className="flex-1 flex flex-col min-w-[300px] max-w-[380px] bg-white/[0.02] rounded-3xl border border-white/[0.05] p-5 relative overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 relative z-10 px-1">
                <h3 className="font-display font-semibold text-white flex items-center gap-3 text-lg">
                  {col.label}
                  <span className="bg-white/10 border border-white/10 text-text-secondary text-xs px-2.5 py-0.5 rounded-full font-mono">
                    {colTasks.length}
                  </span>
                </h3>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pb-4 hide-scrollbar relative z-10">
                {colTasks.map((task, i) => {
                  const agent = agents.find(a => a.id === task.agentId);
                  
                  return (
                    <motion.div
                      key={task.id}
                      layoutId={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: colIdx * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      draggable
                      onDragStart={(e: any) => handleDragStart(e, task.id)}
                      className={cn(
                        "glass-card p-5 cursor-grab active:cursor-grabbing group",
                        draggedTaskId === task.id && "opacity-50 scale-95"
                      )}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            task.priority === 'urgent' ? 'bg-red glow-red' :
                            task.priority === 'high' ? 'bg-amber glow-amber' :
                            task.priority === 'medium' ? 'bg-cyan glow-cyan' : 'bg-primary glow-primary'
                          )} />
                          <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                            {task.priority}
                          </span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform" title={agent?.name}>
                          {agent?.emoji}
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-medium text-white mb-5 leading-relaxed">
                        {task.title}
                      </h4>
                      
                      {task.status === 'doing' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px] text-text-muted font-mono">
                            <span>Progress</span>
                            <span className="text-white">{task.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-primary to-cyan glow-primary"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
