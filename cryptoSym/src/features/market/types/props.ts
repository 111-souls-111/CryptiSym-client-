export interface QuantityInputProps {
  tradeType: string;
  quantity: number | null;
  setQuantity: (value: number | null) => void;
  t: (key: string) => string;
}

export interface BalanseSectionProps {
  ownedQuantity: number;
  balanceUsdc: number;
  coinDisplayName: string;
  t: (key: string) => string;
}

export interface PriceCardProps {
  currentPrice: number;
  t: (value: string) => string;
  isPriceUp: boolean;
  change24h: number;
}
