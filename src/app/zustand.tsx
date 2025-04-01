import {create} from "zustand";

export const useSignState = create(set => {
    isSignIn = 0,
    change:() => set((state:any))=>({inSignIn:state.count+1}) 
})