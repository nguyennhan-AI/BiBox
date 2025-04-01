import { create } from 'zustand';

interface StoreState {
  cardShow: boolean;
  setCardShow: (value: boolean) => void;
}

const useCardPopup = create<StoreState>((set) => ({
  cardShow: false,
  setCardShow: (value: boolean) => set(() => ({ cardShow: value })),
}));

export default useCardPopup;
