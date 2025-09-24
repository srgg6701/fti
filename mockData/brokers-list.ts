export type brokerData = {
  key: string;
  title: string;
  value: string | string[];
};
export type Brokers = {
  key: string;
  label: string;
  data: brokerData[];
};
const Brokers: Brokers[] = [
  {
    key: "roboforex",
    label: "RoboForex",
    data: [
      { key: "platform", title: "MT4/MT5", value: ["MT4", "MT5"] },
      { key: "serverName", title: "Server", value: "text" },
      { key: "accountNumber", title: "Login", value: "text" },
      { key: "password", title: "Password", value: "password" },
    ],
  },
  {
    key: "binance",
    label: "Binance",
    data: [
      { key: "apiKey", title: "API key", value: "text" },
      { key: "secretKey", title: "Secret key", value: "text" },
    ],
  },
  {
    key: "bybit",
    label: "Bybit",
    data: [
      { key: "apiKey", title: "API key", value: "text" },
      { key: "secretKey", title: "Secret key", value: "text" },
    ],
  },
];

export default Brokers;
