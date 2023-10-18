import { create } from "zustand"

type HabitProgressStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useHabitProgress = create<HabitProgressStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))