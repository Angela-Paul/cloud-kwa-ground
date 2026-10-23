import { LayoutDashboard, Brain, Lightbulb, Layers, BarChart3, Cloud } from 'lucide-react';
import type { PageId } from '@/types';

interface NavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string; icon: typeof Cloud }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'quiz', label: 'Smart Quiz', icon: Brain },
  { id: 'explain', label: 'Explain It Simply', icon: Lightbulb },
  { id: 'flashcards', label: 'Flashcards', icon: Layers },
  { id: 'progress', label: 'My Progress', icon: BarChart3 },
];

export function Navigation({ currentPage, onNavigate }: NavProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 h-full bg-navy-900/80 backdrop-blur-md border-r border-navy-700/50 z-40">
        <div className="p-6 border-b border-navy-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet to-cyan flex items-center justify-center flex-shrink-0">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-white text-sm leading-tight">Cloud Kwa Ground</h1>
              <p className="text-[10px] text-navy-400 leading-tight">AZ-900 Exam Prep</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${active
                    ? 'bg-gradient-to-r from-violet/20 to-cyan/10 text-white border border-violet/30'
                    : 'text-navy-300 hover:bg-navy-800/60 hover:text-navy-100'}
                `}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-violet-light' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-navy-700/50">
          <p className="text-[10px] text-navy-500 leading-relaxed">
            Independent learning project. Not affiliated with or endorsed by Microsoft.
          </p>
        </div>
      </aside>

      {/* Mobile top bar + bottom nav */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-navy-900/90 backdrop-blur-md border-b border-navy-700/50 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center flex-shrink-0">
            <Cloud className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-semibold text-white text-sm">Cloud Kwa Ground</h1>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900/95 backdrop-blur-md border-t border-navy-700/50 px-2 py-2 flex justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-medium
                transition-all duration-200 flex-1
                ${active ? 'text-violet-light' : 'text-navy-400'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
