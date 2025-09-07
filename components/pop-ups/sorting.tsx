'use client';
import { useState } from 'react';
import { Button } from '@heroui/button';
import PopupWrapper from './popup-wrapper';
import GenerateCheckbox from '@/components/checkboxes';

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
  const onRadioSelect = (
    value: string
  ) => {
    // no-op stub; replace with analytics/telemetry or side-effects if needed
    console.debug('Radio selected:', value);
  };

  return (
    <PopupWrapper onClose={onClose} h="[357px]" w="[380px]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="bigger mb-2.5">Sorting</h2>
        <p className="text-sm text-white/80">Select the sort type</p>
      </div>
      {/* Sort Options */}
      <div className="mb-8 space-y-4">
        {sortOptions.map((option) => (
          <GenerateCheckbox
            key={option.value}
            onChange={(e) => {
              onRadioSelect(e.target.value);
              setSelectedSort(e.target.value)}
            }
            checkedCondition={selectedSort}
            type='radio'
            name='sortType'
            option={option}
          />
        ))}
      </div>
      {/* Apply Button */}
      <Button onClick={handleApply} className="btn-rounded bg-blue h-10 w-full">
        Apply
      </Button>
    </PopupWrapper>
  );
}
