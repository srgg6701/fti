'use client';
import { useState } from 'react';
import { Button } from '@heroui/button';

import GenerateCheckbox from '@/components/checkboxes';
import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import PopupHeader, { Subheader } from '@/components/pop-ups/styled-popup-header';

interface SortingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sortType: string) => void;
  currentSort?: string;
}

const sortOptions = [
  { value: 'alphabetical', label: 'Alphabetically A-Z' },
  { value: 'creation-date', label: 'By creation date' },
  { value: 'profit-level', label: 'By profit level' },
];

export default function SortingModal({
  isOpen,
  onClose,
  onApply,
  currentSort = 'alphabetical',
}: SortingModalProps) {
  const [selectedSort, setSelectedSort] = useState(currentSort);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(selectedSort);
    onClose();
  };
  // Stub handler for radio selection side-effects
  const onRadioSelect = (value: string) => {
    // no-op stub; replace with analytics/telemetry or side-effects if needed
    console.debug('Radio selected:', value);
  };

  return (
    <PopupWrapper deeper={true} h="357px" reducePb={true} w="380px" onClose={onClose}>
      {/* Header */}
      <div className="mb-6">
        <PopupHeader>Sorting</PopupHeader>
        <Subheader>Select the sort type</Subheader>
      </div>
      {/* Sort Options */}
      <div className="mb-8 space-y-4">
        {sortOptions.map((option) => (
          <GenerateCheckbox
            key={option.value}
            checkedCondition={selectedSort}
            name="sortType"
            option={option}
            type="radio"
            onChange={(e) => {
              onRadioSelect(e.target.value);
              setSelectedSort(e.target.value);
            }}
          />
        ))}
      </div>
      {/* Apply Button */}
      <Button className="btn-rounded bg-blue h-10 w-full" onClick={handleApply}>
        Apply
      </Button>
    </PopupWrapper>
  );
}
