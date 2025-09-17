'use client';
import type { FilterModalProps } from '@/components/pop-ups/types';

import { ButtonRoundedBlue } from '@/components/button-rounded';
import SliderInternals from '@/components/pop-ups/slider-internals';

import '@/styles/style-popup-slider.css';

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  initialBoxValues = {
    growthType: 'all',
    strategyType: 'stocks',
  },
}: FilterModalProps) {
  if (!isOpen) return null;

  const handleApply = () => {
    //if (onApply) onApply(filters);
    onClose();
  };

  return (
    <SliderInternals initialBoxValues={initialBoxValues} onClose={onClose}>
      <ButtonRoundedBlue btnText="Apply" />
    </SliderInternals>
  );
}
