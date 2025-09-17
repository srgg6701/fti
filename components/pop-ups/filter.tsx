'use client';
import type { FilterModalProps, FilterState } from '@/components/pop-ups/types';

import { useState, useEffect } from 'react';

import updateFilter from '@/components/pop-ups/update-filter';
import { ButtonRoundedBlue } from '@/components/button-rounded';
import PopupHeader, { Subheader } from '@/components/pop-ups/styled-popup-header';
import RadioBlock from '@/components/pop-ups/radioblock';
import Slider from '@/components/slider';

import PopupWrapper from './popup-wrapper';

import '@/styles/style-popup-slider.css';

const growthOptions = [
  { value: 'all', label: 'All' },
  { value: 'raising', label: 'Raising' },
  { value: 'downgrading', label: 'Downgrading' },
];

/* const strategyOptions = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'crypto', label: 'Crypto' },
]; */

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

  const txtLeftSemibold = 'text-left font-semibold';

  const sliderPosition = filters.winningRatio;

  return (
    <PopupWrapper deeper={true} h="673px" reducePb={true} w="380px" onClose={onClose}>
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
        setFilters={setFilters}
        textStyle={txtLeftSemibold}
        updateFilter={updateFilter}
      />
      {/* Type of strategy */}
      <RadioBlock
        checkedCondition={filters.strategyType}
        dataArray={growthOptions}
        dataType="strategyType"
        header="Type of strategy"
        setFilters={setFilters}
        textStyle={txtLeftSemibold}
        updateFilter={updateFilter}
      />
      {/* Choose an account */}
      {/* The winning ratio outline-dotted outline-1 */}
      <div>
        <h3 className={`h-[144px] ${txtLeftSemibold}`}>The winning ratio</h3>
        <Slider
          posIndicator={filters.posIndicator}
          ratioType="winningRatio"
          setFilters={setFilters}
          sliderPosition={sliderPosition}
          updateFilter={updateFilter}
          winningRatio={filters.winningRatio}
        />
      </div>
      {/* Apply Button */}
      <ButtonRoundedBlue btnText="Apply" />
    </PopupWrapper>
  );
}
