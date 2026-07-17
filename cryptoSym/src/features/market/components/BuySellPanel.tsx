import { useState } from 'react';
import { Card, Button, Flex, Typography, Space, InputNumber, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../app/store'; // Скорректируй пути под проект
import { executeTrade } from '../../portfolio/slice/portfolioSlice';
import styles from './BuySellPanel.module.css';

const { Text, Title } = Typography;

export const BuySellPanel = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Локальный стейт панели
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState<number | null>(null);

  // 1. Данные из стрима WebSocket (согласно контракту MarketTickersEvent)
  const coinId = useSelector((state: RootState) => state.market.selectedCoinId) || 'bitcoin';
  const currentPrice = useSelector((state: RootState) => state.market.currentPrice) || 0
  const change24h = useSelector((state: RootState) => state.market.change24hPercent) || 0;

  // 2. Данные кошелька из Redux
  const balanceUsdc = useSelector((state: RootState) => state.portfolio.balance);
  const portfolioItems = useSelector((state: RootState) => state.portfolio.items);
  const isSubmitting = useSelector((state: RootState) => state.portfolio.loading);

  // Количество текущей монеты в портфеле пользователя
  const ownedQuantity = portfolioItems[coinId]?.quantity || 0;

  const coinDisplayName = coinId.charAt(0).toUpperCase() + coinId.slice(1);
  const isPriceUp = change24h >= 0;

  // Обработчик клика по кнопке "Pay"
  const handlePay = async () => {
    if (!quantity || quantity < 0.00000001) {
      message.warning('Quantity must be at least 0.00000001');
      return;
    }

    // Пре-валидация на клиенте для экономии трафика и лучшего UX
    if (tradeType === 'BUY' && (quantity * currentPrice > balanceUsdc)) {
      message.error('Insufficient funds for this transaction');
      return;
    }
    if (tradeType === 'SELL' && quantity > ownedQuantity) {
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
        setQuantity(null); // Сбрасываем поле ввода
      } else {
        message.error(resultAction.payload as string || 'Ошибка при исполнении ордера');
      }
    } catch (err) {
      message.error('System error occurred');
    }
  };

  return (
    <Card className={styles.siderCard} bordered={false}>
      {/* Кнопки переключения BUY/SELL */}
      <Flex className={styles.actionButtons}>
        <Button 
          className={`${styles.sellButton} ${tradeType === 'SELL' ? styles.activeSell : ''}`}
          onClick={() => setTradeType('SELL')}
        >
          Sell
        </Button>
        <Button 
          className={`${styles.buyButton} ${tradeType === 'BUY' ? styles.activeBuy : ''}`}
          onClick={() => setTradeType('BUY')}
        >
          Buy
        </Button>
      </Flex>

      {/* Balance Section */}
      <div className={styles.balanceSection}>
        <Title className={styles.bitcoinTitle}>
          {ownedQuantity.toLocaleString('en-US', { maximumFractionDigits: 8 })}{' '}
          <Text className={styles.bitcoinLabel}>
            {coinDisplayName}
          </Text>
        </Title>
        <Flex justify="space-between" align="center">
          <Text>current balance</Text>
          <Text strong>{balanceUsdc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC</Text>
        </Flex>
      </div>

      {/* Price Card */}
      <Card className={styles.priceCard} bordered={false}>
        <Flex vertical gap="small">
          <div>
            <Flex justify="space-between" className={styles.priceWrapper}>
              <Text className={styles.currentPrice}>current price</Text>

              <Space size={4}>
                <Text className={styles.priceValue}>
                  ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
                {isPriceUp ? (
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 14 }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: 14 }} />
                )}
                <Text style={{ color: isPriceUp ? '#52c41a' : '#ff4d4f' }}>
                  {isPriceUp ? '+' : ''}{change24h.toFixed(2)}%
                </Text>
              </Space>
            </Flex>
          </div>
          <Flex justify="space-between">
            <Text className={styles.currency}>currency</Text>
            <Text className={styles.currency}>USDC</Text>
          </Flex>
        </Flex>
      </Card>

      {/* Поле ввода количества (Quantity) */}
      <div style={{ margin: '16px 0 8px 0' }}>
        <Text type="secondary" style={{ display: 'block', marginBottom: '6px', fontSize: '11px', textTransform: 'uppercase' }}>
          Amount to {tradeType}
        </Text>
        <InputNumber
          min={0.00000001}
          step={0.0001}
          placeholder="0.0000"
          value={quantity}
          onChange={(val) => setQuantity(val)}
          style={{ width: '100%', borderRadius: '6px' }}
        />
      </div>

      {/* Оранжевая кнопка действия (to pay) */}
      <Button 
        className={styles.payButton} 
        onClick={handlePay}
        loading={isSubmitting}
        disabled={!quantity || quantity <= 0}
      >
        Pay
      </Button>
    </Card>
  );
};