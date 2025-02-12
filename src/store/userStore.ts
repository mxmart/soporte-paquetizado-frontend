import { create } from 'zustand'
import { IUser } from "@/interfaces";

interface State {
    setUser: (user: IUser) => void;
    user: IUser;
};

export const useUserStore = create<State>()((set) => ({
    user: {} as IUser,
    setUser: ( user: IUser ) => set({ user }),
}));