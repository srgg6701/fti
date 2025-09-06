'use client';
import { useState } from 'react';
import { Button } from '@heroui/button';

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
  currentSort = 'alphabetical' 
}: SortingModalProps) {
  const [selectedSort, setSelectedSort] = useState(currentSort);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(selectedSort);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-[380px] h-[357px] bg-[#121212] rounded-lg p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Sorting
          </h2>
          <p className="text-sm text-white/80">
            Select the sort type
          </p>
        </div>

        {/* Sort Options */}
        <div className="space-y-4 mb-8">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer group"
            >
              <div className="relative mr-3">
                <input
                  type="radio"
                  name="sortType"
                  value={option.value}
                  checked={selectedSort === option.value}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedSort === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-white/30 group-hover:border-white/50'
                  }`}
                >
                  {selectedSort === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <span className="text-white text-sm font-normal group-hover:text-white/90 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>

        {/* Apply Button */}
        <Button
          onClick={handleApply}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}