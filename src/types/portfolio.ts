export interface StockHolding {
  avg_price: number;
  company_code: string;
  current_value: number;
  invested_amount: number;
  is_buy_allowed: boolean;
  is_sell_allowed: boolean;
  last_updated_on: number;
  live_price: number;
  logo: string;
  market_cap: string;
  name: string;
  quantity: number;
  sector: string;
  ticker: string;
  todays_percent_change: number;
  todays_profit_loss: number;
  total_percent_change: number;
  total_profit_loss: number;
  [key: string]: any; // For any additional properties
}

export interface PortfolioData {
  data: StockHolding[];
}
