import { Flex, Typography } from 'antd';
import styles from './BalanceSection.module.css';
import { safeFormat } from '../../../../utils/formatters';
import { type BalanseSectionProps } from '../../types';
const { Text, Title } = Typography;

export const BalanceSection = ({
  ownedQuantity,
  balanceUsdc,
  coinDisplayName,
  t,
}: BalanseSectionProps) => {
  return (
    <div className={styles.balanceSection}>
      <Title className={styles.bitcoinTitle}>
        {safeFormat(ownedQuantity, { maximumFractionDigits: 8 })}{' '}
        <Text className={styles.bitcoinLabel}>{coinDisplayName}</Text>
      </Title>
      <Flex justify="space-between" align="center">
        <Text>{t('trade.balance')}</Text>
        <Text strong>
          {safeFormat(balanceUsdc, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          USDC
        </Text>
      </Flex>
    </div>
  );
};
