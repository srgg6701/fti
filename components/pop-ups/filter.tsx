'use client';
import { useState, useEffect } from 'react';
import { Button } from '@heroui/button';

import GenerateCheckbox from '@/components/checkboxes';
import PopupHeader, { Subheader } from '@/components/pop-ups/styled-popup-header';

import PopupWrapper from './popup-wrapper';

import '@/styles/style-popup-slider.css';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  growthType: 'all' | 'raising' | 'downgrading';
  strategyType: 'stocks' | 'crypto';
  winningRatio: number;
  posIndicator?: number;
}

const growthOptions = [
  { value: 'all', label: 'All' },
  { value: 'raising', label: 'Raising' },
  { value: 'downgrading', label: 'Downgrading' },
];

const strategyOptions = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'crypto', label: 'Crypto' },
];

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  initialFilters = {
    growthType: 'all',
    strategyType: 'stocks',
    winningRatio: 0,
    posIndicator: 0,
  },
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    setFilters({ ...initialFilters, posIndicator: -4 });
  }, []);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };
  // Stub handler for radio selection side-effects
  const onRadioSelect = (group: 'growthType' | 'strategyType', value: string) => {
    // no-op stub; replace with analytics/telemetry or side-effects if needed
    console.debug('Radio selected:', group, value);
  };
  const updateFilter = (key: keyof FilterState, target: HTMLInputElement) => {
    if (key === 'winningRatio') {
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
        [key]: target.value as FilterState['growthType'] | FilterState['strategyType'],
      }));
    }
  };

  interface RadioBlockProps {
    header: string;
    dataArray: {
      value: string;
      label: string;
    }[];
    checkedCondition: FilterState['growthType'] | FilterState['strategyType'];
    dataType: 'growthType' | 'strategyType';
  }

  const txtLeftSemibold = 'text-left font-semibold';
  const atz = 'absolute -top-3 z-1';

  const RadioBlock = ({ header, dataArray, checkedCondition, dataType }: RadioBlockProps) => (
    <div className="mb-8">
      <h3 className={`mb-4 ${txtLeftSemibold}`}>{header}</h3>
      <div className="space-y-3">
        {dataArray.map((option) => (
          <GenerateCheckbox
            key={option.value}
            checkedCondition={checkedCondition}
            name="growthType"
            option={option}
            type="radio"
            onChange={(e) => {
              onRadioSelect(dataType, option.value);
              updateFilter(dataType, e.currentTarget);
            }}
          />
        ))}
      </div>
    </div>
  );

  const sliderPosition = filters.winningRatio;

  return (
    <PopupWrapper deeper={true} h="[673px]" w="[380px]" onClose={onClose}>
      {/* Header */}
      <div className="mb-8">
        <PopupHeader>Filter</PopupHeader>
        <Subheader>Select the types of filtering</Subheader>
      </div>
      {/* Type of growth */}
      <RadioBlock
        checkedCondition={filters.growthType}
        dataArray={growthOptions}
        dataType="growthType"
        header="Type of growth"
      />
      {/* Type of strategy */}
      <RadioBlock
        checkedCondition={filters.strategyType}
        dataArray={growthOptions}
        dataType="strategyType"
        header="Type of strategy"
      />
      {/* The winning ratio outline-dotted outline-1 */}
      <div>
        <h3 className={`h-[144px] ${txtLeftSemibold}`}>The winning ratio</h3>
        <div className="pr-[25px] pl-[16px]">
          <div className="relative mt-[-55px] mb-[55px] flex">
            <span className={`${atz} left-[-16px]`}>1</span>
            <span className={`${atz} right-[-25px]`}>100</span>
            <input
              className="custom-slider h-[1px] w-full cursor-pointer appearance-none rounded-lg bg-white/20"
              max="100"
              min="1"
              style={{
                background: `linear-gradient(to right, #3B57FF 0%, #3B57FF ${sliderPosition}%, rgba(255,255,255,0.2) ${sliderPosition}%, rgba(255,255,255,0.2) 100%)`,
              }}
              type="range"
              value={filters.winningRatio}
              onChange={(e) => updateFilter('winningRatio', e.target)}
            />
            <div
              className="pointer-events-none absolute -top-[50px] z-1"
              style={{ left: `${filters.posIndicator}px` }}
            >
              <div className="min-w-[38px] rounded-full bg-[rgba(244,249,255,0.05)] px-3 py-1 text-center">
                <span className="text-center text-sm font-medium text-white">
                  {filters.winningRatio}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Apply Button */}
      <Button className="btn-rounded bg-blue h-10 w-full" onClick={handleApply}>
        Apply here
      </Button>
    </PopupWrapper>
  );
}
