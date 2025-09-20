import ArrowsUpDown from "@/components/arrows/up-down";
import { setArrowColor } from "@/styles/style-variables";
export default function UserBlockSecondary({
  direction,
  value, // dynamics[0]
  change, // dynamics[1]
  wrapperJustify = "justify-end",
  changeTextSize = "text-xs",
}: {
  direction: string;
  value: string;
  change: string;
  wrapperJustify?: string;
  changeTextSize?: string;
}) {
  return (
    <div className={`flex w-full ${wrapperJustify} text-right`}>
      {direction && <ArrowsUpDown direction={direction} />}
      <div className={`px-[5px] ${changeTextSize} whitespace-nowrap`}>{value}</div>
      {<span className={`${setArrowColor(direction)} ${changeTextSize}`}>{`(${change})`}</span>}
    </div>
  );
}
