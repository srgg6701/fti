import type {
  FilterState,
  FilterStateBottom,
} from "@/components/pop-ups/types";

import { useEffect, useState } from "react";

import PopupHeader, {
  Subheader,
} from "@/components/pop-ups/styled-popup-header";
import Slider from "@/components/slider";

type InjectedProps = {
  txtLeftSemibold: string;
  updateFilter: (key: keyof FilterState, target: HTMLInputElement) => void;
};

type SliderInternalsProps = {
  children: (p: InjectedProps) => React.ReactNode;
  header: string;
  subheader?: string;
  slider_header: string;
};

export default function SliderInternals({
  children,
  header,
  subheader,
  slider_header,
}: SliderInternalsProps) {
  const [filters, setFilters] = useState<FilterStateBottom>({
    winningRatio: 0,
    posIndicator: 0,
  });

  useEffect(() => {
    setFilters({ ...filters, posIndicator: -4 });
  }, []);

  const updateFilter = (key: keyof FilterState, target: HTMLInputElement) => {
    if (key === "winningRatio") {
      const value = parseInt(target.value, 10);
      const pos = target.getBoundingClientRect();
      const actualWidth = pos.width - 30;
      const indicatorPos = (actualWidth / 99) * value - 2.29 || 0;

      const wrLen = String(value).length;
      let posFix = 4;

      switch (wrLen) {
        case 3:
          posFix = 8;
          break;
        case 2:
          posFix = 6;
          break;
        default:
          break;
      }
      setFilters((prev) => ({
        ...prev,
        winningRatio: value,
        posIndicator: Number(indicatorPos.toFixed()) - posFix,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: target.value as
          | FilterState["growthType"]
          | FilterState["strategyType"],
      }));
    }
  };

  const sliderPosition = filters.winningRatio;
  const txtLeftSemibold = "text-left font-semibold";

  const injected: InjectedProps = {
    txtLeftSemibold,
    updateFilter,
  };

  return (
    <div className="flex flex-col gap-5 text-left">
      <PopupHeader>{header}</PopupHeader>
      {subheader && <Subheader>{subheader}</Subheader>}
      {children(injected)}
      <div>
        <h3 className={`h-[144px] ${txtLeftSemibold}`}>{slider_header}</h3>
        <Slider
          posIndicator={filters?.posIndicator}
          ratioType="winningRatio"
          setFilters={setFilters}
          sliderPosition={sliderPosition}
          updateFilter={updateFilter}
          winningRatio={filters?.winningRatio || 1}
        />
      </div>
    </div>
  );
}
