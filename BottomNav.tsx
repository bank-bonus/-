import React from 'react';
import { ViewState } from '../types';
import { Briefcase, PackageOpen, LayoutGrid } from 'lucide-react';

interface BottomNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  credits: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, credits }) => {
  const navItem = (view: ViewState, icon: React.ReactNode, label: string) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => setView(view)}
        className={`flex flex-col items-center justify-center flex-1 py-3 transition-colors ${
          isActive ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        {icon}
        <span className="text-[10px] uppercase font-bold mt-1 tracking-wider">{label}</span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 z-50 pb-safe">
       {/* Credit Display in Nav for Mobile convenience */}
      <div className="absolute -top-10 right-4 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 text-sm font-mono text-green-400 shadow-lg flex items-center gap-2">
         <span>💰</span>
         {credits.toFixed(0)}
      </div>

      <div className="flex justify-around items-center max-w-md mx-auto h-16">
        {navItem('cases', <Briefcase size={20} />, 'Кейсы')}
        {navItem('opener', <PackageOpen size={20} />, 'Рулетка')}
        {navItem('inventory', <LayoutGrid size={20} />, 'Инвентарь')}
      </div>
    </div>
  );
};