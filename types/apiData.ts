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
  status: string;
  broker: string;
  platform: string;
  connectionState: number;
  balance: string;
  currency: number;
  created_at: string; // ISO-date
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
  strategyId: number;
  strategyName: string;
  strategyDescription: string;
  subscribedAt: string;
}
interface CData {
  date: string;
  equity: number;
  timestamp: number;
}
interface Data {
  absoluteChange: number;
  chartData: CData[];
  currentBalance: number;
  dataPoints: number;
  isPositive: boolean;
  percentageChange: number;
}
export interface ChartData {
  data: Data;
  message: string;
  success: boolean;
}
