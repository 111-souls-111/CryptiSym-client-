import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../services/socket';
import {
  updateCurrentMarketData,
  updateCurrentMarketTickers,
} from '../features/market/slices/marketSlice';
import { type RootState } from '../app/store';
import { type currentCoins, type DataCoins } from '../features/market/types';

export const useSocket = () => {
  const dispatch = useDispatch();
  const selectedCoinId = useSelector((state: RootState) => state.market.selectedCoinId);
  const selectedTimeFrame = useSelector((state: RootState) => state.market.selectedTimeFrame);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleMarketTickers = (data: DataCoins[]) => {
      console.log(data);
      dispatch(updateCurrentMarketTickers(data));
    };
    const handleMarketData = (data: currentCoins) => {
      console.log(data);
      dispatch(updateCurrentMarketData(data));
    };

    socket.on('market_tickers', handleMarketTickers);

    socket.on('market_data', handleMarketData);

    socket.on('connect', () => {
      console.log(' Сеть восстановлена');
      socket.emit('subscribe_market', {
        coin_id: selectedCoinId,
        time_range: selectedTimeFrame,
      });
    });

    return () => {
      socket.off('market_tickers', handleMarketData);
      socket.off('connect');
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    if (socket.connected) {
      console.log(`${selectedCoinId} - ${selectedTimeFrame}`);

      socket.emit('subscribe_market', {
        coin_id: selectedCoinId,
        time_range: selectedTimeFrame,
      });
    }
  }, [selectedCoinId, selectedTimeFrame]);
};
