'use client';
import { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import PopupWrapper from './popup-wrapper';
import GenerateCheckbox from '@/components/checkboxes';

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
  const onRadioSelect = (
    group: 'growthType' | 'strategyType',
    value: string
  ) => {
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

  const sliderPosition = filters.winningRatio;

  return (
    <PopupWrapper onClose={onClose} h="[673px]" w="[380px]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-white">Filter</h2>
        <p className="text-sm text-white/70">Select the types of filtering</p>
      </div>
      {/* Type of growth */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-white">Type of growth</h3>
        <div className="space-y-3">
          {growthOptions.map((option) => (
            <GenerateCheckbox
              key={option.value}
              onChange={(e) => {
                onRadioSelect('growthType', e.target.value);
                updateFilter('growthType', e.target);
              }}
              checkedCondition={filters.growthType}
              type="radio"
              name="growthType"
              option={option}
            />
          ))}
        </div>
      </div>
      {/* Type of strategy */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-white">Type of strategy</h3>
        <div className="space-y-3">
          {strategyOptions.map((option) => (
            <GenerateCheckbox
              key={option.value}
              onChange={(e) => {
                onRadioSelect('strategyType', e.target.value);
                updateFilter('strategyType', e.target);
              }}
              type="radio"
              name="strategyType"
              checkedCondition={filters.strategyType}
              option={option}
            />
          ))}
        </div>
      </div>
      {/* The winning ratio outline-dotted outline-1 */}
      <div className="pr-[25px] pl-[16px]">
        <h3 className="h-[144px] text-lg font-semibold">The winning ratio</h3>
        <div className="relative flex mt-[-55px] mb-[55px]">
          <span className="absolute -top-3 left-[-16px] z-1">1</span>
          <span className="absolute -top-3 right-[-25px] z-1">100</span>
          <input
            type="range"
            min="1"
            max="100"
            value={filters.winningRatio}
            onChange={(e) => updateFilter('winningRatio', e.target)}
            className="custom-slider h-[1px] w-full cursor-pointer appearance-none rounded-lg bg-white/20"
            style={{
              background: `linear-gradient(to right, #3B57FF 0%, #3B57FF ${sliderPosition}%, rgba(255,255,255,0.2) ${sliderPosition}%, rgba(255,255,255,0.2) 100%)`,
            }}
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
      {/* Apply Button */}
      <Button onClick={handleApply} className="btn-rounded bg-blue h-10 w-full">
        Apply here
      </Button>
      <style jsx>{`
        .custom-slider {
        }
        .custom-slider::-webkit-slider-thumb {
          background: #3b82f6;
          appearance: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .custom-slider::-moz-range-thumb {
          background: #3b82f6;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </PopupWrapper>
  );
}
