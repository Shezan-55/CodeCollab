import { io } from "socket.io-client";
const API_URL = import.meta.env.VITE_Backend_URL;

export const socket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io(`${API_URL}`, options);
};
