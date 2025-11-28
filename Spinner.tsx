import React, { useEffect, useState, useRef } from 'react';
import { Case, Item } from '../types';
import { CARD_WIDTH, CARD_GAP, SPIN_DURATION_MS, getRandomItem } from '../constants';
import { ItemCard } from './ItemCard';
import { Volume2, VolumeX } from 'lucide-react';

interface SpinnerProps {
  selectedCase: Case;
  isSpinning: boolean;
  onSpinComplete: (item: Item) => void;
  winItem: Item | null;
}

export const Spinner: React.FC<SpinnerProps> = ({ selectedCase, isSpinning, onSpinComplete, winItem }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [offset, setOffset] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Constants for spinner mechanics
  const ITEM_FULL_WIDTH = CARD_WIDTH + CARD_GAP;
  const VISIBLE_ITEMS = 5; // How many items fit on screen roughly
  const BUFFER_START = 2; // Start buffer
  const WIN_INDEX = 35; // The winning item will be placed here
  const TOTAL_ITEMS = 50; // Total items in strip

  // Initialize spinner strip
  useEffect(() => {
    if (!selectedCase) return;

    if (!isSpinning) {
      // Reset state for static view
      const initialStrip: Item[] = [];
      for (let i = 0; i < 10; i++) {
        initialStrip.push(getRandomItem(selectedCase.contains));
      }
      setItems(initialStrip);
      setOffset(0);
    } else if (isSpinning && winItem) {
      // Generate winning strip
      const strip: Item[] = [];
      for (let i = 0; i < TOTAL_ITEMS; i++) {
         if (i === WIN_INDEX) {
           strip.push(winItem);
         } else {
           strip.push(getRandomItem(selectedCase.contains));
         }
      }
      setItems(strip);
      
      // Calculate landing position
      // We want WIN_INDEX to center.
      // Offset = (WIN_INDEX * ITEM_WIDTH) - (ScreenCenter) + (Random jitter inside card)
      
      const containerWidth = scrollContainerRef.current?.clientWidth || window.innerWidth;
      const centerOffset = containerWidth / 2 - (CARD_WIDTH / 2);
      
      // Add random jitter so it doesn't always land dead center of the card
      const jitter = Math.floor(Math.random() * (CARD_WIDTH - 20)) + 10; 
      
      const targetOffset = (WIN_INDEX * ITEM_FULL_WIDTH) - centerOffset + (jitter - CARD_WIDTH/2);
      
      // Trigger animation next frame
      requestAnimationFrame(() => {
         setOffset(targetOffset);
      });

      // Finish callback
      const timer = setTimeout(() => {
        onSpinComplete(winItem);
      }, SPIN_DURATION_MS);

      return () => clearTimeout(timer);
    }
  }, [selectedCase, isSpinning, winItem]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Sound Toggle (Visual only for now) */}
      <div className="w-full flex justify-end px-4 mb-2">
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-gray-500 hover:text-white"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Spinner Container */}
      <div className="relative w-full h-48 bg-black/40 border-y border-gray-700 overflow-hidden flex items-center shadow-inner">
        
        {/* Center Marker Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-400/50 z-20 transform -translate-x-1/2 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 spinner-marker"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 z-20 spinner-marker"></div>

        {/* Moving Strip */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center absolute left-0 h-full will-change-transform"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: isSpinning ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.15, 0, 0, 1)` : 'none',
            gap: `${CARD_GAP}px`,
            paddingLeft: '50vw' // Start somewhat centered initially before offset calc
          }}
        >
          {items.map((item, index) => (
             <ItemCard 
                key={`${item.id}-${index}`} 
                item={item} 
                showPrice={false}
                className="w-32 h-32 flex-shrink-0 shadow-lg"
             />
          ))}
        </div>
        
        {/* Gradient overlays to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
      </div>

      <div className="mt-6 text-center">
         {isSpinning ? (
           <p className="text-yellow-400 animate-pulse font-mono tracking-widest">OPENING...</p>
         ) : (
           <p className="text-gray-500 text-sm">Удачи!</p>
         )}
      </div>
    </div>
  );
};