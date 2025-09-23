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
