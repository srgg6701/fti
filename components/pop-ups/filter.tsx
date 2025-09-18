'use client';

import type { CommonModal, Option } from '@/components/pop-ups/types';

import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import RadioBlock from '@/components/pop-ups/radioblock';
import { ButtonRoundedBlue } from '@/components/button-rounded';
import SliderInternals from '@/components/pop-ups/slider-internals';

import '@/styles/style-popup-slider.css';
import { ChangeEvent } from 'react';

export default function FilterModal({ isOpen, onClose }: CommonModal) {
  if (!isOpen) return null;

  const growthOptions: Option<'growthType'>[] = [
    { value: 'all', label: 'All' },
    { value: 'raising', label: 'Raising' },
    { value: 'downgrading', label: 'Downgrading' },
  ];

  const strategyOptions: Option<'strategyType'>[] = [
    { value: 'stocks', label: 'Stocks' },
    { value: 'crypto', label: 'Crypto' },
  ];
  const handleApply = () => {
    onClose();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onChange, e:', e);
  };

  return (
    <PopupWrapper deeper={true} h="673px" reducePb={true} w="380px" onClose={onClose}>
      <SliderInternals
        header="Filter"
        slider_header="The winning ratio"
        subheader="Select the types of filtering"
      >
        {({ txtLeftSemibold }) => (
          <>
            <RadioBlock
              dataArray={growthOptions}
              header="Growth type"
              textStyle={txtLeftSemibold}
              onChange={onChange}
            />
            <RadioBlock
              dataArray={strategyOptions}
              header="Type of strategy"
              textStyle={txtLeftSemibold}
              onChange={onChange}
            />
          </>
        )}
      </SliderInternals>
      <ButtonRoundedBlue btnText="Apply" onClick={handleApply} />
    </PopupWrapper>
  );
}
