import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../services/socket";
import { updateCurrentMarketData } from "../features/market/marketSlice"

export const useSocket = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        socket.connect()

        socket.on('market_tickers',(data) => dispatch(updateCurrentMarketData(data)))
        socket.on('connect', () => console.log("connect"))
        socket.on("disconnect", () => console.log("dixkonnect"))
        return () => {
        socket.removeAllListeners()
        socket.disconnect()
        }

    }, [dispatch])
}
