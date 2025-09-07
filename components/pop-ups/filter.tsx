'use client';
import { useState } from 'react';
import { Button } from '@heroui/button';

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
    winningRatio: 15,
    posIndicator: -4,
  },
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const updateFilter = (key: keyof FilterState, target: HTMLInputElement) => {
    const pos = target.getBoundingClientRect();
    const value = parseInt(target.value);
    const indicatorPos = ((pos.width - 30) / 100) * value + 1;
    console.log({ pos, ratioValue: value, offset: (pos.width / 100) * value, indicatorPos });
    if (key === 'winningRatio') {
      setFilters((prev) => ({ ...prev, ...{ [key]: value, posIndicator: indicatorPos } }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const sliderPosition = filters.winningRatio;
  const posIndicator = filters.posIndicator;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="flex flex-col relative h-[673px] w-[380px] overflow-y-auto rounded-lg bg-[#121212] p-10 shadow-2xl">
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
              <label key={option.value} className="group flex cursor-pointer items-center">
                <div className="relative mr-3">
                  <input
                    type="radio"
                    name="growthType"
                    value={option.value}
                    checked={filters.growthType === option.value}
                    onChange={(e) => updateFilter('growthType', e.target)}
                    className="sr-only"
                  />
                  <div
                    className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                      filters.growthType === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-white/30 group-hover:border-white/50'
                    }`}
                  >
                    {filters.growthType === option.value && (
                      <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm font-normal transition-colors ${
                    filters.growthType === option.value
                      ? 'text-white'
                      : 'text-white/70 group-hover:text-white/90'
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Type of strategy */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-white">Type of strategy</h3>
          <div className="space-y-3">
            {strategyOptions.map((option) => (
              <label key={option.value} className="group flex cursor-pointer items-center">
                <div className="relative mr-3">
                  <input
                    type="radio"
                    name="strategyType"
                    value={option.value}
                    checked={filters.strategyType === option.value}
                    onChange={(e) => updateFilter('strategyType', e.target)}
                    className="sr-only"
                  />
                  <div
                    className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                      filters.strategyType === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-white/30 group-hover:border-white/50'
                    }`}
                  >
                    {filters.strategyType === option.value && (
                      <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm font-normal transition-colors ${
                    filters.strategyType === option.value
                      ? 'text-white'
                      : 'text-white/70 group-hover:text-white/90'
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* The winning ratio outline-dotted outline-1 */}
        <div className="mb-4 pr-[25px] pl-[16px]">
          <h3 className="mb-12 text-lg font-semibold text-white">The winning ratio</h3>
          <div className="relative flex h-[60px]">
            <span className="absolute -top-3 left-[-16px] z-1">1</span>
            <span className="absolute -top-3 right-[-25px] z-1">100</span>
            <input
              type="range"
              min="1"
              max="100"
              height={1}
              value={filters.winningRatio}
              onChange={(e) => updateFilter('winningRatio', e.target)}
              className="custom-slider w-full cursor-pointer appearance-none rounded-lg bg-white/20"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${sliderPosition}%, rgba(255,255,255,0.2) ${sliderPosition}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className="pointer-events-none absolute -top-8 -translate-x-[7px]" style={{ left: posIndicator }}>
              <div className="min-w-[38px] rounded-full bg-[rgba(244,249,255,0.05)] px-3 py-1 text-center">
                <span className="text-sm text-center font-medium text-white">{filters.winningRatio}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-auto">
          <Button
            onClick={handleApply}
            className="h-12 w-full rounded-lg bg-blue-500 font-semibold text-white outline-0 transition-colors duration-200 hover:bg-blue-600"
          >
            Apply
          </Button>
        </div>
      </div>

      <style jsx>{`
        .custom-slider::-webkit-slider-thumb {
          appearance: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .custom-slider::-moz-range-thumb {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
