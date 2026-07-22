import { useDispatch, useSelector } from 'react-redux';
import { type SelectedCoin } from '../types';
import { type RootState } from '../../../app/store';
import { changeSelectedCoin } from '../slices/marketSlice';
import { Select } from 'antd';
import styles from './coinSelector.module.css';

export const CoinSelector = () => {
  const dispatch = useDispatch();

  const coins = useSelector((state: RootState) => state.market.coinsList);
  // const currentCoin = useSelector((state: RootState) => state.market.selectedCoinId)
  const handleChange = (selectedOption: SelectedCoin) => {
    dispatch(changeSelectedCoin(selectedOption.value));
  };

  return (
    <div>
      <Select
        className={styles.coinSelect}
        labelInValue
        options={coins.map(coin => ({
          label: coin.name,
          value: coin.id,
        }))}
        onChange={handleChange}
        placeholder="Bitcoin (BTC)"
                    dropdownStyle={{
            backgroundColor: ' #d76f08 ',
          }}
      />
    </div>
  );
};
