import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BottomNav } from './components/BottomNav';
import { CaseList } from './components/CaseList';
import { Spinner } from './components/Spinner';
import { Inventory } from './components/Inventory';
import { Case, Item, InventoryItem, ViewState, Toast } from './types';
import { CASES, INITIAL_CREDITS, getRandomItem, RARITY_COLORS } from './constants';
import { ArrowLeft, Loader2, X } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('cases');
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  
  // Spinner State
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetItem, setTargetItem] = useState<Item | null>(null);
  
  // Modal State for result
  const [showResultModal, setShowResultModal] = useState(false);
  const [wonItem, setWonItem] = useState<InventoryItem | null>(null);

  // Simple Notification System
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleSelectCase = (c: Case) => {
    setSelectedCase(c);
    setView('opener');
  };

  const handleStartSpin = () => {
    if (!selectedCase || isSpinning) return;

    if (credits < selectedCase.price) {
      addToast('Недостаточно кредитов!', 'error');
      return;
    }

    // Deduct cost
    setCredits(prev => prev - selectedCase.price);
    
    // Determine winner immediately
    const winner = getRandomItem(selectedCase.contains);
    setTargetItem(winner);
    setIsSpinning(true);
    setShowResultModal(false);
  };

  const handleSpinComplete = (item: Item) => {
    // Add unique ID for inventory
    const newItem: InventoryItem = { ...item, uid: uuidv4(), obtainedAt: Date.now() };
    
    setIsSpinning(false);
    setWonItem(newItem);
    setInventory(prev => [newItem, ...prev]);
    setShowResultModal(true);
    
    // Auto save (mock)
    // localStorage.setItem('inventory', JSON.stringify(...));
  };

  const handleSellItem = (item: InventoryItem) => {
    setCredits(prev => prev + item.price);
    setInventory(prev => prev.filter(i => i.uid !== item.uid));
    addToast(`Продано за ${item.price} C`, 'success');
    
    if (showResultModal && wonItem?.uid === item.uid) {
        setShowResultModal(false);
    }
  };

  const handleKeepItem = () => {
    setShowResultModal(false);
    addToast('Предмет добавлен в инвентарь', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
           {view === 'opener' && (
             <button onClick={() => setView('cases')} className="p-1 rounded hover:bg-gray-800">
               <ArrowLeft size={20} />
             </button>
           )}
           <h1 className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
             CS:VK
           </h1>
        </div>
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
          <span className="text-yellow-400 font-bold text-sm">C</span>
          <span className="font-mono font-medium">{credits.toFixed(0)}</span>
          <button 
            onClick={() => { setCredits(prev => prev + 100); addToast('+100 Кредитов (Бонус)', 'success'); }}
            className="ml-2 w-5 h-5 flex items-center justify-center bg-green-600 rounded-full text-[10px] hover:bg-green-500"
          >
            +
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-lg mx-auto min-h-[80vh]">
        {view === 'cases' && <CaseList onSelectCase={handleSelectCase} />}
        
        {view === 'inventory' && <Inventory items={inventory} onSell={handleSellItem} />}
        
        {view === 'opener' && selectedCase && (
          <div className="flex flex-col h-full pt-8">
            <h2 className="text-center text-2xl font-bold mb-2">{selectedCase.name}</h2>
            <div className="w-full flex justify-center mb-8">
               <img src={selectedCase.image} className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
            </div>

            <Spinner 
              selectedCase={selectedCase} 
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
              winItem={targetItem}
            />

            <div className="mt-8 px-4 w-full flex justify-center">
              <button
                disabled={isSpinning}
                onClick={handleStartSpin}
                className={`
                  w-full max-w-xs py-4 rounded-xl font-bold text-lg uppercase tracking-wider shadow-lg transition-all
                  ${isSpinning 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 active:scale-95 shadow-yellow-500/20'
                  }
                `}
              >
                {isSpinning ? 'Открываем...' : `Открыть за ${selectedCase.price} C`}
              </button>
            </div>
            
            {/* Loot pool preview */}
            <div className="mt-12 px-4 pb-24">
               <h3 className="text-xs uppercase text-gray-500 font-bold mb-3 tracking-widest text-center">Содержимое кейса</h3>
               <div className="flex flex-wrap justify-center gap-2">
                  {selectedCase.contains.sort((a,b) => b.price - a.price).map(item => (
                    <div 
                      key={item.id} 
                      className={`w-12 h-12 rounded border ${RARITY_COLORS[item.rarity]} bg-gray-800 flex items-center justify-center relative group cursor-help`}
                      title={item.name}
                    >
                      <img src={item.imageUrl} className="w-10 h-10 object-cover rounded opacity-80" />
                      {item.rarity.includes('Gold') && <div className="absolute inset-0 bg-yellow-400/20 animate-pulse"></div>}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Win Modal Overlay */}
      {showResultModal && wonItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-800 border border-gray-600 w-full max-w-sm rounded-2xl p-6 flex flex-col items-center relative shadow-2xl overflow-hidden">
            
            {/* Ray burst effect background */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-500 via-gray-900 to-yellow-500 animate-spin-slow"></div>

            <h2 className="text-3xl font-black italic text-white z-10 mb-2 drop-shadow-md">DROP!</h2>
            
            <div className={`w-48 h-48 rounded-xl border-4 ${RARITY_COLORS[wonItem.rarity]} bg-gray-900 z-10 flex items-center justify-center mb-6 shadow-xl relative`}>
               <img src={wonItem.imageUrl} className="w-full h-full object-cover rounded-lg" />
               <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-lg"></div>
            </div>

            <div className="z-10 text-center mb-6">
               <p className="text-sm text-gray-400 font-bold uppercase">{wonItem.rarity}</p>
               <h3 className="text-xl font-bold">{wonItem.name}</h3>
               <p className="text-green-400 font-mono mt-1">{wonItem.price.toFixed(2)} C</p>
            </div>

            <div className="flex gap-3 w-full z-10">
              <button 
                onClick={() => handleSellItem(wonItem)}
                className="flex-1 bg-red-600/20 border border-red-600 text-red-100 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                Продать
              </button>
              <button 
                onClick={handleKeepItem}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-500 transition-colors shadow-lg shadow-green-600/20"
              >
                Оставить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
         {toasts.map(toast => (
           <div 
             key={toast.id} 
             className={`px-4 py-2 rounded-lg shadow-lg text-sm font-bold animate-slide-in pointer-events-auto flex items-center gap-2
               ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-gray-800 border border-gray-600 text-white'}
             `}
           >
             {toast.type === 'error' && <X size={14} />}
             {toast.message}
           </div>
         ))}
      </div>

      <BottomNav currentView={view} setView={setView} credits={credits} />
    </div>
  );
}