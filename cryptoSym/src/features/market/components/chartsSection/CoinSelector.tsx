import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../../app/store';
import { changeSelectedCoin } from '../../slices/marketSlice';
import { Select } from 'antd';
import { useEffect } from 'react';
import styles from './coinSelector.module.css';

export const CoinSelector = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.market.coinsList);
  const currentCoin = useSelector((state: RootState) => state.market.selectedCoinId);

  useEffect(() => {
    if (coins.length > 0 && !currentCoin) {
      dispatch(changeSelectedCoin(coins[0].id));
    }
  }, [coins, currentCoin, dispatch]);

  const handleChange = (value: string) => {
    dispatch(changeSelectedCoin(value));
  };

  return (
    <div>
      <Select
        className={styles.coinSelect}
        value={currentCoin || coins[0]?.id.charAt(0).toLocaleUpperCase + coins[0]?.id.slice(1)}
        options={coins.map(coin => ({
          label: coin.name.charAt(0).toLocaleUpperCase() + coin.name.slice(1),
          value: coin.id,
        }))}
        onChange={handleChange}
        dropdownStyle={{
          backgroundColor: 'orange',
        }}
      />
    </div>
  );
};
