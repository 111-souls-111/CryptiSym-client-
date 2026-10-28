import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Card, Typography, Button, Flex, Empty, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { type AppDispatch, type RootState } from '../../../app/store';
import { fetchPortfolio } from '../slice/portfolioSlice';
import { safeFormat } from '../../../utils/formatters';
import styles from './PortfolioPage.module.css';

const { Title, Text } = Typography;

interface Row {
  coin_id: string;
  quantity: number;
  avg_buy_price: number;
  current_price: number;
  value: number;
  pnl: number;
  pnlPercent: number;
}

export const PortfolioPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { balance, items, loading } = useSelector((s: RootState) => s.portfolio);
  const pricesByCoinId = useSelector((s: RootState) => s.market.pricesByCoinId);

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  const rows: Row[] = useMemo(() => {
    return Object.values(items).map(item => {
      const currentPrice = pricesByCoinId[item.coin_id] || 0;
      const value = currentPrice * item.quantity;
      const cost = item.avg_buy_price * item.quantity;
      const pnl = value - cost;
      const pnlPercent = cost > 0 ? (pnl / cost) * 100 : 0;

      return {
        coin_id: item.coin_id,
        quantity: item.quantity,
        avg_buy_price: item.avg_buy_price,
        current_price: currentPrice,
        value,
        pnl,
        pnlPercent,
      };
    });
  }, [items, pricesByCoinId]);

  const totalValue = rows.reduce((sum, r) => sum + r.value, 0);
  const totalPnl = rows.reduce((sum, r) => sum + r.pnl, 0);
  const portfolioValue = balance + totalValue;

  const columns: ColumnsType<Row> = [
    {
      title: t('portfolio.coin') || 'Монета',
      dataIndex: 'coin_id',
      key: 'coin_id',
      render: (id: string) => id.charAt(0).toUpperCase() + id.slice(1),
    },
    {
      title: t('portfolio.quantity') || 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      render: (v: number) => safeFormat(v, { maximumFractionDigits: 8 }),
    },
    {
      title: t('portfolio.avgPrice') || 'Средняя цена',
      dataIndex: 'avg_buy_price',
      key: 'avg_buy_price',
      align: 'right',
      render: (v: number) => `$${safeFormat(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      title: t('portfolio.currentPrice') || 'Текущая цена',
      dataIndex: 'current_price',
      key: 'current_price',
      align: 'right',
      render: (v: number) => `$${safeFormat(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      title: t('portfolio.value') || 'Стоимость',
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      render: (v: number) => `$${safeFormat(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      title: t('portfolio.pnl') || 'P&L',
      dataIndex: 'pnl',
      key: 'pnl',
      align: 'right',
      render: (v: number, row) => {
        const cls = v >= 0 ? styles.pnlUp : styles.pnlDown;
        return (
          <span className={cls}>
            {v >= 0 ? '+' : ''}
            ${safeFormat(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <br />
            <small>
              ({row.pnlPercent >= 0 ? '+' : ''}
              {row.pnlPercent.toFixed(2)}%)
            </small>
          </span>
        );
      },
    },
  ];

  if (loading && rows.length === 0) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Title level={2} className={styles.title}>
          {t('portfolio.title') || 'Портфель'}
        </Title>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => dispatch(fetchPortfolio())}
          loading={loading}
        >
          {t('common.refresh') || 'Обновить'}
        </Button>
      </Flex>

      <Card className={styles.summaryCard} bordered={false}>
        <Flex justify="space-around" wrap="wrap" gap="large">
          <div className={styles.summaryItem}>
            <Text type="secondary">{t('portfolio.cash') || 'Свободные средства'}</Text>
            <Title level={3}>
              ${safeFormat(balance, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Title>
          </div>
          <div className={styles.summaryItem}>
            <Text type="secondary">{t('portfolio.assets') || 'Стоимость активов'}</Text>
            <Title level={3}>
              ${safeFormat(totalValue, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Title>
          </div>
          <div className={styles.summaryItem}>
            <Text type="secondary">{t('portfolio.total') || 'Всего'}</Text>
            <Title level={3}>
              ${safeFormat(portfolioValue, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Title>
          </div>
          <div className={styles.summaryItem}>
            <Text type="secondary">{t('portfolio.pnl') || 'P&L'}</Text>
            <Title level={3} className={totalPnl >= 0 ? styles.pnlUp : styles.pnlDown}>
              {totalPnl >= 0 ? '+' : ''}
              ${safeFormat(totalPnl, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Title>
          </div>
        </Flex>
      </Card>

      {rows.length === 0 ? (
        <Empty description={t('portfolio.empty') || 'В портфеле пока нет активов'} />
      ) : (
        <Table
          className={styles.table}
          rowKey="coin_id"
          columns={columns}
          dataSource={rows}
          pagination={false}
        />
      )}
    </div>
  );
};