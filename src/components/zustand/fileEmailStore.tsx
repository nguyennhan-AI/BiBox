import { create } from 'zustand';
interface User{
  email:string,
  image:string,
  id:string,
  permissionType : number,
  date : string 
}
interface EmailState {
    act : boolean;
    setAct: () => void;
    fileEmailAct : User[];
    setFileEmailAct:(value: User | User[]) => void;
}
const useFileEmail = create<EmailState>((set) => ({
    act: false,
    setAct: () => set((state) => ({ act: !state.act })),
    fileEmailAct: [],
    setFileEmailAct: (value: User | User[]) =>
      set((state) => ({
        fileEmailAct: Array.isArray(value) ? value : [...state.fileEmailAct, value],
      })),
  }));
  
  export default useFileEmail;