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
  emailAct : User[];
  setEmailAct:(value: User | User[]) => void;
  updateUserDate: (email: string, newDate: string) => void;
}
const useEmail = create<EmailState>((set) => ({
  act: false,
  setAct: () => set((state) => ({ act: !state.act })),
  emailAct: [],
  setEmailAct: (value: User | User[]) =>
    set((state) => ({
      emailAct: Array.isArray(value) ? value : [...state.emailAct, value],
    })),
  updateUserDate: (email:string, newDate:string) =>
      set((state) => ({
        emailAct: state.emailAct.map(user =>
          user.email === email ? { ...user, date: newDate } : user
        )
      }))
}));

export default useEmail;