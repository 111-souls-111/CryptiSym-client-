import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../services/socket';
import { updateCurrentMarketData } from '../features/market/slices/marketSlice';
import { type RootState } from '../app/store';
import { type DataCoins } from '../features/market/slices/marketSlice';

export const useSocket = () => {
  const dispatch = useDispatch();

  const selectedCoinId = useSelector((state: RootState) => state.market.selectedCoinId);
  const selectedTimeFrame = useSelector((state: RootState) => state.market.selectedTimeFrame);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const subscribeToMarketData = () => {
      console.log(`📡 Запрос на бэк: ${selectedCoinId} за период ${selectedTimeFrame}`);

      socket.emit('subscribe_market', {
        coinId: selectedCoinId,
        timeFrame: selectedTimeFrame,
      });
    };

    const handleMarketTickers = (data: DataCoins[]) => {
      dispatch(updateCurrentMarketData(data));
      console.log(data);
    };

    socket.on('market_tickers', handleMarketTickers);

    socket.on('connect', () => {
      console.log('🟢 Соединение установлено');
      subscribeToMarketData();
    });

    return () => {
      socket.emit('unsubscribe_market', { coinId: selectedCoinId, timeFrame: selectedTimeFrame });
      socket.off('market_tickers', handleMarketTickers);
    };
  }, [dispatch, selectedCoinId, selectedTimeFrame]);
};
