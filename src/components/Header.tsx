import React from 'react';
import { ChevronLeft, HelpCircle, LogOut } from 'lucide-react';

export function Header() {
  return (
    <header className="h-20 flex-shrink-0 border-b border-white/[0.08] bg-[#0a0a0f] flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center">
        <button className="p-2 text-text-muted hover:text-white transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-full px-4 py-2">
          <button className="text-text-muted hover:text-white transition-colors">
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>

        <div className="w-px h-8 bg-white/10" />

        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500 font-bold">
            U
          </div>
          <button className="ml-4 p-2 text-text-muted hover:text-white transition-colors">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
