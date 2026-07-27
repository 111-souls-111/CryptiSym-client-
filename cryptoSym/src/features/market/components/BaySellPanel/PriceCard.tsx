import { Card, Flex, Typography, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import styles from './PriceCard.module.css';
import { type PriceCardProps } from '../../types';

const { Text } = Typography;

export const PriceCard = ({ currentPrice, t, isPriceUp, change24h }: PriceCardProps) => {
  return (
    <Card className={styles.priceCard} bordered={false}>
      <Flex vertical gap="small">
        <div>
          <Flex justify="space-between" className={styles.priceWrapper}>
            <Text className={styles.currentPrice}>{t('trade.price')}</Text>

            <Space size={4}>
              <Text className={styles.priceValue}>
                $
                {currentPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              {isPriceUp ? (
                <ArrowUpOutlined className={styles.arrowUp} />
              ) : (
                <ArrowDownOutlined className={styles.arrowUp} />
              )}
              <Text className={`${isPriceUp ? styles.arrowUp : styles.arrowDown}`}>
                {isPriceUp ? '+' : ''}
                {change24h.toFixed(2)}%
              </Text>
            </Space>
          </Flex>
        </div>
        <Flex justify="space-between">
          <Text className={styles.currency}>{t('trade.currency')}</Text>
          <Text className={styles.currency}>USDC</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
