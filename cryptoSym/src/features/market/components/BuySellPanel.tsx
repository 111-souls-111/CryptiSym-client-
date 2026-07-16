import { Card, Button, Flex, Typography, Statistic, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import styles from './BuySellPanel.module.css';

const { Text, Title } = Typography;

export const BuySellPanel = () => {
  return (
    <Card className={styles.siderCard} bordered={false}>
      <Flex gap={8} className={styles.actionButtons}>
        <Button className={styles.sellButton} type="primary" danger block>
          Sell
        </Button>
        <Button className={styles.buyButton} type="primary" block>
          Buy
        </Button>
      </Flex>

      {/* Balance Section */}
      <div className={styles.balanceSection}>
        <Title level={2} className={styles.bitcoinTitle}>
          0{' '}
          <Text type="secondary" className={styles.bitcoinLabel}>
            Bitcoin
          </Text>
        </Title>
        <Flex justify="space-between" align="center">
          <Text type="secondary">current balance</Text>
          <Text strong>0 USDC</Text>
        </Flex>
      </div>

      {/* Price Card */}
      <Card className={styles.priceCard} bordered={false}>
        <Flex vertical gap="small">
          <div>
            <Text type="secondary">current price</Text>
            <div className={styles.priceWrapper}>
              <Text strong className={styles.priceValue}>
                $897
              </Text>
              <Space size={4}>
                <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 14 }} />
                <Text style={{ color: '#52c41a' }}>+52.28%</Text>
              </Space>
            </div>
          </div>
          <Flex justify="space-between" align="center">
            <Text type="secondary">currency</Text>
            <Text strong>USDC</Text>
          </Flex>
        </Flex>
      </Card>

      {/* Pay Button */}
      <Button type="primary" block className={styles.payButton} size="large">
        Pay
      </Button>
    </Card>
  );
};
