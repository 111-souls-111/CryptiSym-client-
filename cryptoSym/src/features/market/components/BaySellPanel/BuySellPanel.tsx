import { useState } from 'react';
import { Card, Button, Flex, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../../app/store';
import { executeTrade } from '../../../portfolio/slice/portfolioSlice';
import styles from './BuySellPanel.module.css';
import { useTranslation } from 'react-i18next';
import { BalanceSection } from './BalanceSection';
import { PriceCard } from './PriceCard';
import { QuantityInput } from './QuantityyInput';

export const BuySellPanel = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const [tradeType, setTradeType] = useState<string>(t('trade.buy'));
  const [quantity, setQuantity] = useState<number | null>(null);

  const priceHistory = useSelector((state: RootState) => state.market.priceHistory);
  const coinId = useSelector((state: RootState) => state.market.selectedCoinId) || 'bitcoin';
  const currentPrice = useSelector((state: RootState) => state.market.currentPrice) || 0;
  // const change24h = useSelector((state: RootState) => state.market.change24hPercent) || 0;

  const balanceUsdc = useSelector((state: RootState) => state.portfolio.balance);
  const portfolioItems = useSelector((state: RootState) => state.portfolio.items);
  const isSubmitting = useSelector((state: RootState) => state.portfolio.loading);

  const lastPrice = priceHistory[priceHistory.length - 1]?.price || 0;
  const firstPrice = priceHistory[0]?.price || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = ((priceChange / firstPrice) * 100) || 0;

  const ownedQuantity = portfolioItems[coinId]?.quantity || 0;

  const coinDisplayName = coinId.charAt(0).toUpperCase() + coinId.slice(1);
  const isPriceUp = lastPrice >=firstPrice;

  const handlePay = async () => {
    if (!quantity || quantity < 0.00000001) {
      message.warning(t('common.count'));
      return;
    }

    if (tradeType === 'Buy' && quantity * currentPrice > balanceUsdc) {
      message.error(t('common.insufficient'));
      return;
    }

    if (tradeType === 'Sell' && quantity > ownedQuantity) {
      message.error(`${t('commom.notCoin')} ${coinDisplayName}`);
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
        message.success(t('commom.orderSuccess'));
        setQuantity(null);
      } else {
        message.error((resultAction.payload as string) || t('common.orderError'));
      }
    } catch (err) {
      message.error(t('common.systemError'));
    }
  };

  return (
    <Card className={styles.siderCard} bordered={false}>
      <Flex className={styles.actionButtons}>
        <Button
          className={`${tradeType === t('trade.buy') ? styles.activeSellBuyButton : styles.sellBuyButton}`}
          onClick={() => setTradeType(t('trade.buy'))}
        >
          {t('trade.buy')}
        </Button>
        <Button
          className={`${tradeType === t('trade.sell') ? styles.activeSellBuyButton : styles.sellBuyButton}`}
          onClick={() => setTradeType(t('trade.sell'))}
        >
          {t('trade.sell')}
        </Button>
      </Flex>

      <BalanceSection
        ownedQuantity={ownedQuantity}
        balanceUsdc={balanceUsdc}
        coinDisplayName={coinDisplayName}
        t={t}
      />

      <PriceCard currentPrice={currentPrice} t={t} isPriceUp={isPriceUp} change24h={priceChangePercent} />

      <QuantityInput tradeType={tradeType} quantity={quantity} setQuantity={setQuantity} t={t} />

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
