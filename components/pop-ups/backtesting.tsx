import type { CommonModal } from '@/components/pop-ups/types';

import { ChangeEvent } from 'react';
import { Input } from '@heroui/react';

import { ButtonRoundedBlue } from '@/components/button-rounded';
import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import SliderInternals from '@/components/pop-ups/slider-internals';
import { Header4Left } from '@/components/pop-ups/styled-popup-header';
import { inputStyle } from '@/styles/style-variables';

export default function Backtesting({ isOpen, onClose }: CommonModal) {
  if (!isOpen) {
    return;
  }
  const onSimulation = () => {
    console.log('Simulation started');
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onChange, e:', e);
  };

  return (
    <PopupWrapper deeper={true} h="673px" reducePb={true} w="380px" onClose={onClose}>
      <SliderInternals header="Backtesting" slider_header="Choose a risk">
        {({ txtLeftSemibold }) => (
          <div>
            <Header4Left>Enter the amount</Header4Left>
            <Input
              classNames={{ inputWrapper: inputStyle }}
              placeholder="$000"
              onChange={onChange}
            />
          </div>
        )}
      </SliderInternals>
      <ButtonRoundedBlue btnText="Simulation" onClick={onSimulation} />
    </PopupWrapper>
  );
}
