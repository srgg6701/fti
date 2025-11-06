interface User {
  username: string;
}
interface UserImg {
  userImg: string;
}
export interface BalanceDynamics {
  absoluteChange: number;
  chartData: CData[];
  currentBalance: number;
  dataPoints: number;
  isPositive: boolean;
  percentageChange: number;
}

export interface TopTradeSystem {
  id: number;
  name: string;
  pnlPercent: number;
  sharpe: number;
  maxDrawdown: number;
  equity: number;
  logo: string;
}

export interface Chart {
  data?: BalanceDynamics;
  message?: string;
  success?: boolean;
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
export interface TDataStrategies extends User, UserImg {
  invested: string;
  proRata: string;
  direction: string;
  data: [string, string];
}
export interface Strategy extends User, UserImg {
  strategyId: number;
  name: string;
  description: string;
  username: string; // interface User
  userImg: string; // interface UserImg
  risk: number;
  roi: number;
  timeFrame: string;
  message?: string;
  success?: boolean;
  data?: Data;
}
// FIXME: REMOVE this interface as soon as Strategy is ready.
export interface TDataTopPerforming extends User, UserImg {
  strategy: string;
  strategyId: number;
  chartImg?: string;
  risk: number;
  roi: number;
  timeFrame: string;
}
export interface News {
  id: number;
  title: string;
  author: string;
  content: string;
  description: string;
  img: string | null;
  imageBase64: string | null;
  timestamp: string; // ISO-date
  /* date: string;
  img: string;
  text: string;
  slug: string; */
}
/*
id: "34761a6f-a442-11f0-b34a-fa163e6929c1"
title: "Bitcoin Reaches New All-Time High"
author: "Crypto News"
content: "Bitcoin has achieved a remarkable milestone by reaching a new all-time high, surpassing all previous price records. This historic moment represents a significant achievement for the cryptocurrency market and demonstrates the growing acceptance of digital assets in the global financial landscape.\n\nThe surge to new heights comes amid several positive developments in the cryptocurrency space, including increased institutional adoption, regulatory clarity in key markets, and growing retail interest. Analysts suggest this could be the beginning of a new bullish cycle for Bitcoin and the broader cryptocurrency market.\n\nKey factors contributing to this surge include:\n• Increased institutional adoption by major financial institutions\n• Growing acceptance as a store of value\n• Limited supply and halving events\n• Global economic uncertainty driving demand\n• Technological improvements and network upgrades\n\nMarket analysts point to several technical and fundamental factors that support this upward movement:\n• Strong on-chain metrics indicating accumulation\n• Reduced selling pressure from long-term holders\n• Increased network activity and transaction volume\n• Positive sentiment across social media platforms\n• Growing institutional investment flows\n\nThe implications of this new all-time high extend beyond just price appreciation:\n• Increased mainstream media coverage\n• Growing interest from traditional investors\n• Potential regulatory developments\n• Enhanced market liquidity\n• Improved infrastructure development\n\nThis development suggests that cryptocurrency markets are maturing and becoming more integrated into traditional financial systems. The new all-time high serves as a testament to Bitcoin's resilience and its growing role in the global economy."
description: "Bitcoin has surged to a new all-time high, breaking previous records and showing strong bullish momentum."
imageBase64: "iVBORw0KGgoAAAANSUhEUgAAAQ4AAACICAYAAAAWLwXUAAAAC
timestamp: "2025-10-08T10:27:50.000Z"
*/
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
  strategyName: string; // Alex's Strategy
  strategyDescription: string;
  subscribedAt: string;
  userImage?: string;
}
export interface CData {
  date?: string;
  equity?: number;
  timestamp?: number;
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
  userImg?: string;
  username?: string;
}
interface createdUpdated {
  createdAt: string;
  updatedAt: string | null;
}
export interface Partner extends createdUpdated {
  id: number;
  name: string;
  description: boolean;
  logoUrl: string;
  websiteUrl: string;
  referralId: string;
  isActive: number;
}
export interface NotificationsData extends createdUpdated {
  id: string;
  userId: number;
  title: string;
  description: string;
  content: string;
  author: string;
  isRead: boolean;
  readAt: string | null;
}
export interface Notifications {
  data: NotificationsData[];
}
