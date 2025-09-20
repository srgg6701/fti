/* export type PerfItem = {
  label: string;
  value: string | number;
  change?: string;
  direction?: 'Up' | 'Down';
};
 */
const perfData /* : PerfItem[] */ = [
  { label: "RISK", value: 5 },
  { label: "Last Year", value: "$ 324", change: "(3.23%)", direction: "Up" },
  { label: "Last Week", value: "$ 64", change: "(1.79%)", direction: "Up" },
  { label: "Last Day", value: "$ 8", change: "(0.27%)", direction: "Down" },
  { label: "ROI", value: "$ 3524", change: "(39.23%)", direction: "Up" },
  { label: "Max. Drawdown", value: "$ 32", change: "(1.23%)", direction: "Down" },
];

export default perfData;
