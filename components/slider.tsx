import type { /* FilterActions,  */ FilterStateBottom } from "./pop-ups/types";

import { Dispatch, SetStateAction } from "react";

const SValues = ({ val, offset }: { val: number; offset: string }) => (
  <span className={`absolute -top-3 z-1 ${offset}`}>{val}</span>
);

export default function Slider({
  sliderPosition,
  winningRatio,
  posIndicator,
  updateFilter,
  setFilters,
  ratioType = "winningRatio",
}: {
  sliderPosition: number;
  winningRatio: number;
  posIndicator: number | undefined;
  setFilters: Dispatch<SetStateAction<FilterStateBottom>>;
  updateFilter: Function;
  ratioType: string;
}) {
  return (
    <div className="pr-[25px] pl-[16px]">
      <div className="relative mt-[-55px] mb-[55px] flex">
        <SValues offset={"left-[-16px]"} val={1} />
        <SValues offset={"right-[-25px]"} val={100} />
        <input
          className="custom-slider h-[1px] w-full cursor-pointer appearance-none rounded-lg bg-white/20"
          max="100"
          min="1"
          style={{
            background: `linear-gradient(to right, #3B57FF 0%, #3B57FF ${sliderPosition}%, rgba(255,255,255,0.2) ${sliderPosition}%, rgba(255,255,255,0.2) 100%)`,
          }}
          type="range"
          value={winningRatio}
          onChange={(e) => updateFilter(ratioType, e.currentTarget, setFilters)}
        />
        <div
          className="pointer-events-none absolute -top-[50px] z-1"
          style={{ left: `${posIndicator}px` }}
        >
          <div className="min-w-[38px] rounded-full bg-[rgba(244,249,255,0.05)] px-3 py-1 text-center">
            <span className="text-center text-sm font-medium text-white">
              {winningRatio}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
