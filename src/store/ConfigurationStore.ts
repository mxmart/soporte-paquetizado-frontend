import { create } from 'zustand'

interface State {
    setLogo: ( logo: string ) => void;
    setIsLoadingLogo: ( isLoadingLogo: boolean ) => void;
    logo: string;
    isLoadingLogo: boolean;
};

export const useConfigurationStore = create<State>()((set) => ({
    logo: '',
    isLoadingLogo: false,

    setIsLoadingLogo: ( isLoadingLogo: boolean ) => set({ isLoadingLogo }),

    setLogo: ( logo: string ) => {
        set({ isLoadingLogo: true })
        set({ logo })
        set({ isLoadingLogo: false })
    },

}));