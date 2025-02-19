import { IMessage } from "@/interfaces";
import { create } from "zustand";
import { useUserStore } from "./userStore";

interface State {
    socket: WebSocket | undefined;
    isConnected: boolean;
    messages: IMessage[];
    // connectionId: string;
    // ticket: ITicketData,
    // agents: User[],
    // customers: User[],
    // writters: any;

    setSocketTicket: () => void;
    createChatRoom: ( id: string ) => void;
    leaveChatRoom: () => void;
    closeSocketConnection: () => void;
    sendMessage: ( message: IMessage ) => void;
    setReceivedMessage: ( message: IMessage ) => void;
    // setMessages: ( messages: IMessage[] ) => void;
    // setTicket: ( ticket: ITicketData ) => void;
    // setCustomersInTicket: ( users: User[] ) => void;
    // setAgentsInTicket: ( users: User[] ) => void;
    // removeTicketUsers: () => void;
    // sendEvent: ( event: string, user: IUser, ticket: string ) => void;
    // setTicketHours: ( hours: number ) => void;
    // newRealTimeUser: ( user: any ) => void;
};

export const useTicketStore = create<State>(( set, get ) => ({

    socket: undefined,
    isConnected: false,
    messages: [],

    setSocketTicket: () => {

        const { setSocketTicket } = get();
        const socket = new WebSocket(`${ process.env.NEXT_PUBLIC_API_WEBSOCKET_CHAT }`);

        socket.onopen = () => {
            set({ socket: socket });
            set({ isConnected: true });
        };

        socket.onclose = () => {
            window.location.reload();
            setTimeout(() => {
                setSocketTicket(); 
            }, 3000);
        };

        setInterval(() => {
            socket.send(JSON.stringify({ action: 'refreshConnectionId' }));
        }, 30000);

        socket.onmessage = async( event: any ) => {

            const storeUser = useUserStore.getState().user;
            const message = JSON.parse( event.data );
            const cognito_sub = storeUser?.cognito_sub;
            
            // if( message.type === 'typing' ){
            //     const { writters } = get();
            //     if( !writters.some( (writter: any) => writter.cognito_sub == message.content.cognito_sub )){
            //         if( message.content.isTyping ){
            //             set({ writters: [ ...writters, message.content ]  });
            //         }
            //     } else {
            //         if( !message.content.isTyping ){
            //             const newWritters = writters.filter( (writter: any) => writter.cognito_sub !== message.content.cognito_sub );
            //             set({ writters: newWritters });
            //         }
            //     }
            //     setInterval( () => set({ writters: [] }), 60000);
            // }

            if( message.type === 'message' ){

                const { setReceivedMessage } = get();
                const receivedMessage = JSON?.parse( message.content );

                // if( receivedMessage.type === 'newUser' ){
                //     if( receivedMessage.user.rol === "Administrativo" ) return setAgentsInTicket([ receivedMessage.user ]);
                //     return setCustomersInTicket([ receivedMessage.user ]);
                // };

                if( receivedMessage.type === 'EVENT' ) {

                };

                if( receivedMessage.cognito_sub !== cognito_sub ){
                    setReceivedMessage( receivedMessage );
                }

            };

        };

    },

    sendMessage: ( message: IMessage ) => {

        const { messages, socket } = get();
        set({ messages: [ ...messages, message ] })
        const action = {"action": "sendMessage","message": JSON.stringify( message )}
        socket?.send( JSON.stringify(action) );
        // const stopWritting = {"action": "sendTypingNotification", "username": message.send_by, "cognito_sub": message.cognito_sub, "typing": false}
        // socket?.send( JSON.stringify(stopWritting) );

    },

    createChatRoom: async( id ) => {
        new Promise((resolve, reject) => {
            const socket = new WebSocket(`${ process.env.NEXT_PUBLIC_API_WEBSOCKET_CHAT }`);
            socket.onopen = () => {
                const message = {"action": "createChatRoom", "ticket_id": String(id) };
                socket.send( JSON.stringify(message));
                socket.close();
            };
            resolve(true);
        });
    },

    leaveChatRoom() {
        const { socket } = get();
        if( socket ) {
            const message = { "action": "disconnectFromChatRoom" }
            socket.send( JSON.stringify(message) )
        }
    },

    closeSocketConnection() {
        const { socket } = get();
        const message = { "action": "disconnectFromChatRoom" }
        if( socket ) {
            socket.send( JSON.stringify(message));
            socket.close();
        }
    },

    setReceivedMessage(message) {
        const { messages } = get();
        set({ messages: [ ...messages, message ] })
    },

}));