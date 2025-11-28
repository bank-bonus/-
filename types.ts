export enum Rarity {
  CONSUMER = 'Consumer Grade', // Gray
  INDUSTRIAL = 'Industrial Grade', // Light Blue
  MIL_SPEC = 'Mil-Spec', // Blue
  RESTRICTED = 'Restricted', // Purple
  CLASSIFIED = 'Classified', // Pink
  COVERT = 'Covert', // Red
  GOLD = 'Rare Special Item' // Gold
}

export interface Item {
  id: string;
  name: string;
  rarity: Rarity;
  price: number;
  imageColor: string; // Using colors since we don't have real assets
  imageUrl?: string;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  image: string;
  contains: Item[];
}

export interface InventoryItem extends Item {
  uid: string; // Unique ID for inventory instance
  obtainedAt: number;
}

export type ViewState = 'cases' | 'opener' | 'inventory';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}