export interface ApiResponse {
  success: boolean;
  message: string;
  strategies_info: StrategyInfo[];
  statistics: Statistics;
}

export interface StrategyInfo {
  id: number;
  name: string;
  account: string;
  server: string;
}

export interface Statistics {
  success: boolean;
  total_requested: number;
  successful: number;
  failed: number;
  results: StrategyResult[];
  errors: StatisticsError[];           // может быть []
  generated_at: string;                // ISO datetime
}

export interface StatisticsError {
  strategy_id: number;
  message: string;
  code?: string | number;
}

export interface StrategyResult {
  strategy_id: number;
  success: boolean;
  data: StrategyData;
}

export interface StrategyData {
  entity_type: string;                 // напр. "trade_system"
  entity_id: string | number;
  system_id: number;
  trading_account_id: number;

  current_balance: number;
  balance_change: number;
  balance_change_percent: number;

  daily_pnl_curve: DailyPnlPoint[];
  hourly_data: HourlyDataPoint[];

  performance: PerformanceBlock;
  details: DetailsBlock;

  calculation_time: string;            // ISO datetime
}

export interface DailyPnlPoint {
  date: string;                        // 'YYYY-MM-DD'
  balance: number;
  equity: number;
  open_positions: number;
  profit_percent: number;
  drawdown_percent: number;
  snp500: number;
  snp500_percent: number;
  realized_pnl: number;
  unrealized_pnl: number;
}

export interface HourlyDataPoint {
  timestamp: string;                   // ISO datetime
  balance: number;
  equity: number;
  open_positions: number;
  profit_percent: number;
  drawdown_percent: number;
  snp500: number;
  snp500_percent: number;
  realized_pnl: number;
  unrealized_pnl: number;
}

export interface PerformanceBlock {
  risk: number;
  last_year: AmountPercent;
  last_week: AmountPercent;
  last_day: AmountPercent;
  roi: AmountPercent;
  max_drawdown: AmountPercent;
}

export interface AmountPercent {
  amount: number;
  percent: number;
}

export interface DetailsBlock {
  years: YearDetails[];
}

export interface YearDetails {
  year: number;
  amount: number;
  percent: number;
  months: MonthDetails[];
}

export interface MonthDetails {
  month: number;                       // 1..12
  amount: number;
  percent: number;
}
