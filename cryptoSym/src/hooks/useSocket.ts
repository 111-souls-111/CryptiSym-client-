import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../services/socket';
import { updateCurrentMarketData } from '../features/market/slices/marketSlice';
import { type RootState } from '../app/store';

export const useSocket = () => {
  const dispatch = useDispatch();
  const selectedCoinId = useSelector((state: RootState) => state.market.selectedCoinId);
  const selectedTimeFrame = useSelector((state: RootState) => state.market.selectedTimeFrame);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleMarketTickers = (data: any) => {
      dispatch(updateCurrentMarketData(data));
    };

    socket.on('market_tickers', handleMarketTickers);

    socket.on('connect', () => {
      console.log(' Сеть восстановлена');
      socket.emit('subscribe_market', {
        coinId: selectedCoinId,
        timeFrame: selectedTimeFrame,
      });
    });

    return () => {
      socket.off('market_tickers', handleMarketTickers);
      socket.off('connect');
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    if (socket.connected) {
      console.log(`${selectedCoinId} - ${selectedTimeFrame}`);

      socket.emit('subscribe_market', {
        coinId: selectedCoinId,
        timeFrame: selectedTimeFrame,
      });
    }
  }, [selectedCoinId, selectedTimeFrame]);
};
