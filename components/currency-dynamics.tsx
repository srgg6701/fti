import ArrowsUpDown from "@/components/arrows/up-down";
import { setArrowColor } from "@/styles/style-variables";
export default function CurrencyDynamics({
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
    <div
      className={`flex ${wrapperJustify} ${setArrowColor(direction)} text-right items-center`}
    >
      {direction && <ArrowsUpDown direction={direction} />}
      <div className={`px-[5px] ${changeTextSize} whitespace-nowrap`}>
        {value}
      </div>
      {<span className={changeTextSize}>{`(${change})`}</span>}
    </div>
  );
}
