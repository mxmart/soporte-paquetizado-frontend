import { NotificationToast } from "@/components/notifications/NotificationToast";
import { saveNotificationsConnections } from "@/services";
import { create } from "zustand";

interface State {
    socket: WebSocket | null;
    unreadedNotifications: number;
    isLoadingNotifications: boolean,
    totalNotifications: number;
    setSocketNotifications: () => void;
    setNotificationsCount: ( count: number ) => void;
    setIsLoadingNotifications: ( isLoading: boolean ) => void;
};

export const useNotificationsStore = create<State>()(( set, get ) => ({

    socket: null,
    unreadedNotifications: 0,
    isLoadingNotifications: true,
    totalNotifications: 0,

    setSocketNotifications: () => {

        const { setSocketNotifications } = get();
        const socket = new WebSocket(`${ process.env.NEXT_PUBLIC_API_WEBSOCKET_NOTIFICATION }`);

        socket.onopen = () => {
            set({ socket });
            socket.send( JSON.stringify({ action: 'refreshConnectionId' }));
        };

        socket.onclose = () => {
            window.location.reload();
            setTimeout(() => {
                setSocketNotifications();
            }, 3000);
        };

        socket.onmessage = async( event ) => {
            
            const notification = JSON.parse( event.data );

            if( notification.connectionId ) {
                await saveNotificationsConnections({ connection_id: notification.connectionId });
                return;
            } else {
                const audio = new Audio('/sounds/notification.mp3');
                NotificationToast({ notification });
                audio.play();
            }

        };

    },

    setIsLoadingNotifications: ( isLoading ) => {
        set({ isLoadingNotifications: isLoading });
    },

    setNotificationsCount(count: number) {
        set({ unreadedNotifications: count })
    },

}));