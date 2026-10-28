import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Card, Typography, Button, Flex, Select, Empty, Spin, Tag } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { type AppDispatch, type RootState } from '../../../app/store';
import { fetchTransactions } from '../slice/portfolioSlice';
import { safeFormat } from '../../../utils/formatters';
import type { Transaction } from '../types';
import styles from './TransactionsPage.module.css';

const { Title, Text } = Typography;

const PAGE_SIZE = 20;

export const TransactionsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { transactions, transactionsLoading } = useSelector((s: RootState) => s.portfolio);

  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<'BUY' | 'SELL' | 'ALL'>('ALL');
  const [coinFilter, setCoinFilter] = useState<string>('ALL');

  // Загрузка при изменении фильтров / страницы
  useEffect(() => {
    dispatch(
      fetchTransactions({
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        type: typeFilter === 'ALL' ? undefined : typeFilter,
        coin_id: coinFilter === 'ALL' ? undefined : coinFilter,
      })
    );
  }, [dispatch, page, typeFilter, coinFilter]);

  const columns: ColumnsType<Transaction> = [
    {
      title: t('transactions.date'),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (v: string) => new Date(v).toLocaleString(),
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: t('transactions.type'),
      dataIndex: 'type',
      key: 'type',
      render: (v: 'BUY' | 'SELL') => (
        <Tag color={v === 'BUY' ? 'green' : 'red'}>
          {v === 'BUY' ? t('transactions.buy') : t('transactions.sell')}
        </Tag>
      ),
    },
    {
      title: t('transactions.coin'),
      dataIndex: 'coin_id',
      key: 'coin_id',
      render: (id: string) => id.charAt(0).toUpperCase() + id.slice(1),
    },
    {
      title: t('transactions.quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      render: (v: number) => safeFormat(v, { maximumFractionDigits: 8 }),
    },
    {
      title: t('transactions.price'),
      dataIndex: 'price_at_trade',
      key: 'price_at_trade',
      align: 'right',
      render: (v: number) =>
        `$${safeFormat(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      title: t('transactions.total'),
      dataIndex: 'total_usd',
      key: 'total_usd',
      align: 'right',
      render: (v: number) =>
        `$${safeFormat(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
  ];

  return (
    <div className={styles.page}>
      <Flex justify="space-between" align="center" className={styles.header} wrap="wrap" gap="small">
        <Title level={2} className={styles.title}>
          {t('transactions.title')}
        </Title>

        <Flex gap="small" wrap="wrap">
          <Select
            value={typeFilter}
            onChange={v => {
              setTypeFilter(v);
              setPage(1);
            }}
            style={{ minWidth: 140 }}
            options={[
              { value: 'ALL', label: t('transactions.allTypes') },
              { value: 'BUY', label: t('transactions.buy') },
              { value: 'SELL', label: t('transactions.sell') },
            ]}
          />
          <Select
            value={coinFilter}
            onChange={v => {
              setCoinFilter(v);
              setPage(1);
            }}
            style={{ minWidth: 160 }}
            options={[
              { value: 'ALL', label: t('transactions.allCoins') },
              { value: 'bitcoin', label: 'Bitcoin' },
              { value: 'ethereum', label: 'Ethereum' },
              { value: 'litecoin', label: 'Litecoin' },
              { value: 'cardano', label: 'Cardano' },
              { value: 'polkadot', label: 'Polkadot' },
            ]}
          />
          <Button
            icon={<ReloadOutlined />}
            loading={transactionsLoading}
            onClick={() =>
              dispatch(
                fetchTransactions({
                  limit: PAGE_SIZE,
                  offset: (page - 1) * PAGE_SIZE,
                  type: typeFilter === 'ALL' ? undefined : typeFilter,
                  coin_id: coinFilter === 'ALL' ? undefined : coinFilter,
                })
              )
            }
          >
            {t('common.refresh')}
          </Button>
        </Flex>
      </Flex>

      {transactionsLoading && transactions.length === 0 ? (
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      ) : transactions.length === 0 ? (
        <Card className={styles.emptyCard} bordered={false}>
          <Empty description={t('transactions.empty')} />
        </Card>
      ) : (
        <Table
          className={styles.table}
          rowKey="id"
          columns={columns}
          dataSource={transactions}
          loading={transactionsLoading}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            onChange: p => setPage(p),
            showSizeChanger: false,
            // Бэк не отдаёт total, поэтому показываем «есть ли ещё»
            // — pagination просто по страницам, без общего числа
            showTotal: undefined,
          }}
        />
      )}
    </div>
  );
};