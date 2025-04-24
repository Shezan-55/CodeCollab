import { io } from "socket.io-client";

export const socket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io("https://miniprojectsem6-rtrk.onrender.com", options);
};
