import { InputNumber, Typography } from 'antd';
import { type QuantityInputProps } from '../../types';
import styles from './QuantityInput.module.css';

const { Text } = Typography;

export const QuantityInput = ({ tradeType, quantity, setQuantity, t }: QuantityInputProps) => {
  return (
    <div className={styles.amountSection}>
      <Text type="secondary" className={styles.amount}>
        {t('trade.amountBuy')}
        {tradeType === t('trade.buy') ? t('trade.buy') : t('trade.sell')}
      </Text>
      <InputNumber
        min={0.00000001}
        step={0.0001}
        placeholder="0.0000"
        value={quantity}
        onChange={setQuantity}
        className={styles.amountInput}
      />
    </div>
  );
};
