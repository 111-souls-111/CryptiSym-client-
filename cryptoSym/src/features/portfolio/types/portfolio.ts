export interface TradeRequest {
  coin_id: string;
  type: string;
  quantity: number;
}

export interface PortfolioItem {
  coin_id: string;
  quantity: number;
  avg_buy_price: number;
}

export interface TradeResponse {
  success: boolean;
  message: string;
  data: {
    current_balance: number;
    updated_portfolio: PortfolioItem;
  };
}

export interface Transaction {
  id: string;
  coin_id: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price_at_trade: number;
  total_usd: number;
  created_at: string;
}


export interface PortfolioState {
  balance: number;
  items: Record<string, PortfolioItem>;
  transactions: Transaction[];
  loading: boolean;
  transactionsLoading: boolean;
  error: string | null;
}
