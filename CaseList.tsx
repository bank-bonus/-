import React from 'react';
import { Case } from '../types';
import { CASES } from '../constants';

interface CaseListProps {
  onSelectCase: (c: Case) => void;
}

export const CaseList: React.FC<CaseListProps> = ({ onSelectCase }) => {
  return (
    <div className="p-4 pb-24 grid grid-cols-2 gap-4">
      {CASES.map((box) => (
        <button
          key={box.id}
          onClick={() => onSelectCase(box)}
          className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-xl p-4 active:scale-95 transition-all hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10"
        >
          <img 
            src={box.image} 
            alt={box.name} 
            className="w-24 h-24 object-contain mb-4 drop-shadow-2xl"
          />
          <h3 className="text-sm font-bold text-center mb-1">{box.name}</h3>
          <span className="text-yellow-400 font-mono text-sm bg-yellow-400/10 px-2 py-0.5 rounded">
            {box.price} C
          </span>
        </button>
      ))}
      
      {/* Decorative promo banner */}
      <div className="col-span-2 mt-4 p-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl border border-blue-700 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">Ежедневный бонус</h2>
          <p className="text-blue-200 text-xs mb-3">Заходи каждый день за валютой!</p>
          <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-blue-50">
            Забрать 100 C
          </button>
        </div>
        <div className="absolute -right-5 -bottom-10 opacity-20">
           <svg width="150" height="150" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
        </div>
      </div>
    </div>
  );
};