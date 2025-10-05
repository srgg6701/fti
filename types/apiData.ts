interface User {
  username: string;
}
interface UserImg {
  userImg: string;
}
export interface TDataStrategies extends User, UserImg {
  invested: string;
  proRata: string;
  direction: string;
  data: [string, string];
}
export interface TDataTopPerforming extends User, UserImg {
  chartImg: string;
  risk: number;
  roi: number;
  timeFrame: string;
}
export interface TDataNews extends User, UserImg {
  id: number;
  date: string;
  img: string;
  text: string;
  title: string;
  slug: string;
}

export type TDataWorldLeaders = TDataTopPerforming;
export type TDataTheBestOfTheDay = TDataTopPerforming;
export type TDataTheBestOfTheWeek = TDataTopPerforming;
export type TDataTheBestOfTheMonth = TDataTopPerforming;
export interface UserAccount {
  id: number;
  account: string;
  broker: string;
  platform: string;
  status: string;
  balance: string;
  currency: number;
  connectionState: number;
  created_at: string; // ISO-date
  // should be added:
  brokerCode?: number;
  brokerImg?: string;
  chartImg?: string;
}

export interface TradeSystems {
  id: number;
  name: string;
  description: string;
  status: number;
  account: string;
  server: string;
  is_connected: number;
  is_mt5: number;
  account_type: number;
}
export interface UserSubscription {
  accountId: number;
  accountNumber: string;
  amount: string;
  risk: number;
  strategyId: number;
  strategyName: string;
  strategyDescription: string;
  subscribedAt: string;
}
export interface CData {
  date?: string;
  equity?: number;
  timestamp?: number;
}
export interface Data {
  absoluteChange: number;
  chartData: CData[];
  currentBalance: number;
  dataPoints: number;
  isPositive: boolean;
  percentageChange: number;
}
export interface ChartData {
  data?: Data;
  message?: string;
  success?: boolean;
}
interface DailyPnl {
  date: string;
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
interface HourlyData {
  timestamp: string;
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
interface Performance {
  risk: number;
  last_year: PeriodResult;
  last_week: PeriodResult;
  last_day: PeriodResult;
  roi: PeriodResult;
  max_drawdown: PeriodResult;
}
interface PeriodResult {
  amount: number;
  percent: number;
}
interface YearResult {
  year: number;
  amount: number;
  percent: number;
  months: MonthResult[];
}
interface Details {
  years: YearResult[];
}
interface MonthResult {
  month: number;
  amount: number;
  percent: number;
}
export interface UniversalEquity {
  entity_type: string;
  entity_id: string;
  current_balance: number;
  balance_change: number;
  balance_change_percent: number;
  daily_pnl_curve: DailyPnl[];
  hourly_data: HourlyData[];
  performance: Performance;
  details: Details;
  calculation_time: string;
  system_id: string;
  trading_account_id: string | null;
}
export interface Partner {
  id: number;
  name: string;
  description: boolean;
  logoUrl: string;
  websiteUrl: string;
  referralId: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}
