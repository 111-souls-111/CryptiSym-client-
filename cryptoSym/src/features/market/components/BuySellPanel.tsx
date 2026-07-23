import { useState } from 'react';
import { Card, Button, Flex, Typography, Space, InputNumber, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../app/store';
import { executeTrade } from '../../portfolio/slice/portfolioSlice';
import styles from './BuySellPanel.module.css';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

export const BuySellPanel = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const [tradeType, setTradeType] = useState<string>(t('trade.buy'));
  const [quantity, setQuantity] = useState<number | null>(null);

  const coinId = useSelector((state: RootState) => state.market.selectedCoinId) || 'bitcoin';
  const currentPrice = useSelector((state: RootState) => state.market.currentPrice) || 0;
  const change24h = useSelector((state: RootState) => state.market.change24hPercent) || 0;

  const balanceUsdc = useSelector((state: RootState) => state.portfolio.balance);
  const portfolioItems = useSelector((state: RootState) => state.portfolio.items);
  const isSubmitting = useSelector((state: RootState) => state.portfolio.loading);

  const ownedQuantity = portfolioItems[coinId]?.quantity || 0;

  const coinDisplayName = coinId.charAt(0).toUpperCase() + coinId.slice(1);
  const isPriceUp = change24h >= 0;

  const handlePay = async () => {
    if (!quantity || quantity < 0.00000001) {
      message.warning(t('common.count'));
      return;
    }

    if (tradeType === 'Buy' && quantity * currentPrice > balanceUsdc) {
      message.error('Insufficient funds for this transaction');
      return;
    }
    if (tradeType === 'Sell' && quantity > ownedQuantity) {
      message.error(`Not enough ${coinDisplayName} in your portfolio`);
      return;
    }

    try {
      const resultAction = await dispatch(
        executeTrade({
          coin_id: coinId,
          type: tradeType,
          quantity: quantity,
        })
      );

      if (executeTrade.fulfilled.match(resultAction)) {
        message.success('Ордер успешно исполнен');
        setQuantity(null);
      } else {
        message.error((resultAction.payload as string) || 'Ошибка при исполнении ордера');
      }
    } catch (err) {
      message.error('System error occurred');
    }
  };

  return (
    <Card className={styles.siderCard} bordered={false}>
      <Flex className={styles.actionButtons}>
        <Button
          className={`${tradeType === t('trade.sell') ? styles.activeSellBuyButton : styles.sellBuyButton}`}
          onClick={() => setTradeType(t('trade.sell'))}
        >
          {t('trade.sell')}
        </Button>
        <Button
          className={`${tradeType === t('trade.buy') ? styles.activeSellBuyButton : styles.sellBuyButton}`}
          onClick={() => setTradeType(t('trade.buy'))}
        >
          {t('trade.buy')}
        </Button>
      </Flex>

      {/* Balance Section */}
      <div className={styles.balanceSection}>
        <Title className={styles.bitcoinTitle}>
          {ownedQuantity.toLocaleString('en-US', { maximumFractionDigits: 8 })}{' '}
          <Text className={styles.bitcoinLabel}>{coinDisplayName}</Text>
        </Title>
        <Flex justify="space-between" align="center">
          <Text>{t('trade.balance')}</Text>
          <Text strong>
            {balanceUsdc.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            USDC
          </Text>
        </Flex>
      </div>

      {/* Price Card */}
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
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 14 }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: 14 }} />
                )}
                <Text style={{ color: isPriceUp ? '#52c41a' : '#ff4d4f' }}>
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

      <div style={{ margin: '16px 0 8px 0' }}>
        <Text
          type="secondary"
          style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '11px',
            textTransform: 'uppercase',
          }}
        >
          {t('trade.amountBuy')}
          {tradeType}
        </Text>
        <InputNumber
          min={0.00000001}
          step={0.0001}
          placeholder="0.0000"
          value={quantity}
          onChange={val => setQuantity(val)}
          style={{ width: '100%', borderRadius: '6px' }}
        />
      </div>

      <Button
        className={styles.payButton}
        onClick={handlePay}
        loading={isSubmitting}
        // disabled={!quantity || quantity <= 0}
      >
        {t('trade.pay')}
      </Button>
    </Card>
  );
};
