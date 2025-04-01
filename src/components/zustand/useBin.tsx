import { create } from 'zustand';
interface StoreState {
  binAct: boolean;
  setBinAct: () => void;
}
const useBin = create<StoreState>((set) => ({
  binAct: false,
  setBinAct: () => set((state) => ({ binAct: !state.binAct })),
}));

export default useBin;