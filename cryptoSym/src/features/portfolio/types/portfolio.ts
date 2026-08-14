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

export interface PortfolioState {
  balance: number;
  items: Record<string, PortfolioItem>;
  loading: boolean;
  error: string | null;
}
