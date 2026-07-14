// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { socket } from "../services/socket";
// import { updateCurrentMarketData } from "../features/market/components/slices/marketSlice"

// export const useSocket = () => {
//     const dispatch = useDispatch()

//     useEffect(() => {
//         socket.connect()

//         socket.on('market_tickers',(data) => dispatch(updateCurrentMarketData(data)))
//         socket.on('connect', () => console.log("connect"))
//         socket.on("disconnect", () => console.log("dixkonnect"))
//         return () => {
//         socket.removeAllListeners()
//         socket.disconnect()
//         }

//     }, [dispatch])
// }
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentMarketData } from "../features/market/slices/marketSlice"
import { type RootState } from "../app/store";

export const useSocket = () => {
    const dispatch = useDispatch();
    const selectedCoinId = useSelector((state: RootState) => state.market.selectedCoinId);

    useEffect(() => {
        console.log(`🎰 Запущен режим имитации рынка для: ${selectedCoinId}`);

        // Функция генерирует массив точек для графика за последние 7 сессий
        const generateMockData = (basePrice: number) => {
            const priceLine = Array.from({ length: 15 }, (_, i) => ({
                time: `${10 + i}:00`,
                price: basePrice + (Math.random() - 0.5) * 20 // Колебания цены
            }));

            const volumeBar = Array.from({ length: 15 }, (_, i) => ({
                time: `${10 + i}:00`,
                volume: Math.floor(Math.random() * 5000) + 1000
            }));

            return { priceLine, volumeBar };
        };


        const basePrices: { [key: string]: number } = {
            bitcoin: 897.40,
            ethereum: 3200.50,
            solana: 145.20
        };

        const startPrice = basePrices[selectedCoinId] || 100;


        const initialCharts = generateMockData(startPrice);
        dispatch(updateCurrentMarketData({
            current_price: startPrice,
            change_24h_percent: +(Math.random() * 5).toFixed(2),
            charts: {
                price_line: initialCharts.priceLine,
                volume_bar: initialCharts.volumeBar
            }
        }));


        let currentPrice = startPrice;
        const interval = setInterval(() => {
            currentPrice += (Math.random() - 0.5) * 5; // Слегка меняем цену
            const updatedCharts = generateMockData(currentPrice);

            dispatch(updateCurrentMarketData({
                current_price: +currentPrice.toFixed(2),
                change_24h_percent: +((currentPrice - startPrice) / startPrice * 100).toFixed(2),
                charts: {
                    price_line: updatedCharts.priceLine,
                    volume_bar: updatedCharts.volumeBar
                }
            }));
        }, 2000);

        return () => {
            clearInterval(interval);
            console.log("🎰 Имитация рынка остановлена");
        };
    }, [dispatch, selectedCoinId]); // Хук перезапустится с новыми ценами, если сменится монета
};