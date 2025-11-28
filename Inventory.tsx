import React from 'react';
import { InventoryItem } from '../types';
import { ItemCard } from './ItemCard';

interface InventoryProps {
  items: InventoryItem[];
  onSell: (item: InventoryItem) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ items, onSell }) => {
  // Sort by rarity (desc) then price
  const sortedItems = [...items].sort((a, b) => b.price - a.price);
  
  const totalPrice = items.reduce((sum, i) => sum + i.price, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <div className="text-6xl mb-4">🎒</div>
        <p>Ваш инвентарь пуст</p>
        <p className="text-sm mt-2">Откройте кейсы, чтобы получить предметы!</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Инвентарь ({items.length})</h2>
        <span className="text-sm font-mono text-green-400">Стоимость: {totalPrice.toFixed(2)} C</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {sortedItems.map((item) => (
          <div key={item.uid} className="relative group">
             <ItemCard item={item} showPrice={true} />
             <button
               onClick={() => onSell(item)}
               className="absolute inset-0 bg-black/80 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg z-20 backdrop-blur-sm"
             >
               Продать
               <br />
               +{item.price} C
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};