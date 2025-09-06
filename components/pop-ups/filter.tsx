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
    winningRatio: 15
  }
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-[380px] h-[673px] bg-[#121212] rounded-lg p-10 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Filter
          </h2>
          <p className="text-sm text-white/70">
            Select the types of filtering
          </p>
        </div>

        {/* Type of growth */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Type of growth
          </h3>
          <div className="space-y-3">
            {growthOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer group"
              >
                <div className="relative mr-3">
                  <input
                    type="radio"
                    name="growthType"
                    value={option.value}
                    checked={filters.growthType === option.value}
                    onChange={(e) => updateFilter('growthType', e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                      filters.growthType === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-white/30 group-hover:border-white/50'
                    }`}
                  >
                    {filters.growthType === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
                <span className={`text-sm font-normal transition-colors ${
                  filters.growthType === option.value
                    ? 'text-white'
                    : 'text-white/70 group-hover:text-white/90'
                }`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Type of strategy */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Type of strategy
          </h3>
          <div className="space-y-3">
            {strategyOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer group"
              >
                <div className="relative mr-3">
                  <input
                    type="radio"
                    name="strategyType"
                    value={option.value}
                    checked={filters.strategyType === option.value}
                    onChange={(e) => updateFilter('strategyType', e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                      filters.strategyType === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-white/30 group-hover:border-white/50'
                    }`}
                  >
                    {filters.strategyType === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
                <span className={`text-sm font-normal transition-colors ${
                  filters.strategyType === option.value
                    ? 'text-white'
                    : 'text-white/70 group-hover:text-white/90'
                }`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* The winning ratio */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            The winning ratio
          </h3>
          
          {/* Value display */}
          <div className="flex justify-center mb-4">
            <div className="bg-black/30 rounded-lg px-3 py-1">
              <span className="text-white font-medium text-sm">
                {filters.winningRatio}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="relative px-2">
            <div className="flex justify-between text-xs text-white/70 mb-2">
              <span>1</span>
              <span>100</span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="1"
                max="100"
                value={filters.winningRatio}
                onChange={(e) => updateFilter('winningRatio', parseInt(e.target.value))}
                className="w-full h-[1px] bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((filters.winningRatio - 1) / 99) * 100}%, rgba(255,255,255,0.2) ${((filters.winningRatio - 1) / 99) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-auto">
          <Button
            onClick={handleApply}
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Apply
          </Button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}