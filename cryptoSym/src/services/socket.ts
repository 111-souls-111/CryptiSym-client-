import {io, type Socket} from "socket.io-client"

export const socket: Socket = io("https://localhost: 5000", {autoConnect: false});