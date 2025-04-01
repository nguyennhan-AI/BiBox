import { create } from 'zustand';
interface StoreState {
  act: boolean;
  setAct: () => void;
}
const useStore = create<StoreState>((set) => ({
  act: false,
  setAct: () => set((state) => ({ act: !state.act })),
}));

export default useStore;