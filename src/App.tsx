import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandDeck } from './components/CommandDeck';
import { AgentProfiles } from './components/AgentProfiles';
import { TaskBoard } from './components/TaskBoard';
import { AILog } from './components/AILog';
import { Council } from './components/Council';
import { MeetingIntelligence } from './components/MeetingIntelligence';

const TABS = ['Dashboard', 'Board', 'Ops Center', 'AI Employees', 'Automations', 'Goals Lab', 'Identity', 'AI Log', 'Questions', 'Skill Factory', 'Agent Teams', 'Workspace', 'Reports', 'Settings'];

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="flex h-screen w-full bg-background text-text-primary font-sans overflow-hidden selection:bg-primary/30">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-500/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-500/10 blur-[120px] pointer-events-none" />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="min-h-full"
            >
              {activeTab === 'Dashboard' && <CommandDeck />}
              {activeTab === 'AI Employees' && <AgentProfiles />}
              {activeTab === 'Board' && <TaskBoard />}
              {activeTab === 'AI Log' && <AILog />}
              {activeTab === 'Council' && <Council />}
              {activeTab === 'Meetings' && <MeetingIntelligence />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
