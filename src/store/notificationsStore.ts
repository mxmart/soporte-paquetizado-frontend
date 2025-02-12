import { NotificationToast } from "@/components/notifications/NotificationToast";
import { INotification } from "@/interfaces/notifications/NotificationsInterfaces";
import { getNotifications, saveNotificationsConnections } from "@/services";
import { create } from "zustand";

interface State {
    socket: WebSocket | null;
    unreadedNotifications: number;
    isLoadingNotifications: boolean,
    totalNotifications: number;
    notifications: INotification[];
    setSocketNotifications: () => void;
    setNotificationsCount: ( count: number ) => void;
    setIsLoadingNotifications: ( isLoading: boolean ) => void;
    getNotifications: ( page_number: string, filter: "all" | "readed" | "unreaded" ) => void;
};

export const useNotificationsStore = create<State>()(( set, get ) => ({

    socket: null,
    notifications: [],
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
            
            const { unreadedNotifications } = get();
            const notification = JSON.parse( event.data );

            if( notification.connectionId ) {
                await saveNotificationsConnections({ connection_id: notification.connectionId });
                return;
            } else {
                const audio = new Audio('/sounds/notification.mp3');
                NotificationToast({ notification });
                set({ unreadedNotifications: unreadedNotifications + 1 })
                audio.play();
            }

        };

    },
 
    getNotifications: async( page_number, filter ) => {
        const { setIsLoadingNotifications } = get();
        setIsLoadingNotifications( true );
        const response = await getNotifications({ page_number, filter });
        set({ notifications: response?.notifications });
        set({ totalNotifications: response?.total_notifications });
        set({ unreadedNotifications: response?.unreaded_notifications });
        setIsLoadingNotifications( false );
    },

    setIsLoadingNotifications: ( isLoading ) => {
        set({ isLoadingNotifications: isLoading });
    },

    setNotificationsCount(count: number) {
        set({ unreadedNotifications: count })
    },

}));