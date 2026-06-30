import { create } from 'zustand';

export interface Dish {
  id: string;
  name: string;
  price: string;
  description?: string;
  allergens?: string[];
}

export interface Category {
  id: string;
  name: string;
  dishes: Dish[];
}

interface MenuState {
  menuName: string;
  categories: Category[];
  activeCategoryId: string;
  setMenuName: (name: string) => void;
  setActiveCategory: (id: string) => void;
  addCategory: (name: string) => void;
  // AGGIUNGI QUESTE TRE RIGHE NELL'INTERFACCIA:
  addDish: (categoryId: string, dish: Omit<Dish, 'id'>) => void;
  removeDish: (categoryId: string, dishId: string) => void;
  resetMenu: () => void;
}

const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Antipasti', dishes: [] },
  { id: 'cat-2', name: 'Primi', dishes: [] },
];

export const useMenuStore = create<MenuState>((set) => ({
  menuName: '',
  activeCategoryId: 'cat-1', 
  categories: initialCategories,

  setMenuName: (name) => set({ menuName: name }),
  setActiveCategory: (id) => set({ activeCategoryId: id }),

  addCategory: (name) => set((state) => ({
    categories: [...state.categories, { id: `cat-${Date.now()}`, name, dishes: [] }]
  })),

  addDish: (categoryId, dish) => set((state) => ({
    categories: state.categories.map((cat) => 
      cat.id === categoryId 
        ? { ...cat, dishes: [...cat.dishes, { ...dish, id: `dish-${Date.now()}` }] }
        : cat
    )
  })),

  // AGGIUNGI L'IMPLEMENTAZIONE DI REMOVEDISH:
  removeDish: (categoryId, dishId) => set((state) => ({
    categories: state.categories.map((cat) => 
      cat.id === categoryId 
        ? { ...cat, dishes: cat.dishes.filter((d) => d.id !== dishId) }
        : cat
    )
  })),

  resetMenu: () => set({
    menuName: '',
    categories: initialCategories,
    activeCategoryId: 'cat-1'
  }),
}));
