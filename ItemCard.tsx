import React from 'react';
import { Item } from '../types';
import { RARITY_COLORS } from '../constants';

interface ItemCardProps {
  item: Item;
  onClick?: () => void;
  showPrice?: boolean;
  className?: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onClick, showPrice = true, className = '' }) => {
  const rarityClass = RARITY_COLORS[item.rarity];

  return (
    <div 
      onClick={onClick}
      className={`relative group rounded-lg border-2 overflow-hidden flex flex-col items-center bg-gray-800 transition-transform active:scale-95 ${rarityClass} ${className} ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
    >
      <div className="w-full aspect-square relative p-2 bg-gradient-to-b from-transparent to-black/50">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover rounded-md shadow-md z-10 relative"
          loading="lazy"
        />
        {/* Glow effect behind item */}
        <div 
          className="absolute inset-0 opacity-20 blur-xl z-0"
          style={{ backgroundColor: item.imageColor }}
        />
      </div>
      
      <div className="w-full p-2 text-center z-10 bg-gray-900/90 flex flex-col h-full justify-between">
        <span className="text-xs font-bold truncate w-full block text-gray-100" title={item.name}>
          {item.name}
        </span>
        {showPrice && (
          <span className="text-xs text-green-400 font-mono mt-1">
            {item.price.toFixed(2)} C
          </span>
        )}
      </div>
    </div>
  );
};