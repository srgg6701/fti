export type MockAccounts = {
  brokerImg: string;
  chartImg: string;
  brokerCode: number;
  brokerName: string;
  status: "Successfully" | "Verifying..." | "Invalid password";
};

const allStrategies: MockAccounts[] = [
  {
    brokerImg: "binance.png",
    chartImg: "home/top-performing/graph1.svg",
    brokerCode: 54354535342,
    brokerName: "Binance",
    status: "Successfully",
  },
  {
    brokerImg: "roboforex.png",
    chartImg: "home/top-performing/graph1.svg",
    brokerCode: 54354535341,
    brokerName: "Roboforex",
    status: "Verifying...",
  },
  {
    brokerImg: "green-fur.png",
    chartImg: "home/top-performing/graph1.svg",
    brokerCode: 54354535340,
    brokerName: "Greenfur",
    status: "Invalid password",
  },
];

export default allStrategies;
