import type { CommonModal } from '@/components/pop-ups/types';

import { ChangeEvent } from 'react';
import { Input, Select, SelectItem } from '@heroui/react';

import allStrategies from '@/mockData/accounts';
import { ButtonRoundedBlue } from '@/components/button-rounded';
import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import SliderInternals from '@/components/pop-ups/slider-internals';
import { Header4Left } from '@/components/pop-ups/styled-popup-header';
import { inputStyle, selectStyle } from '@/styles/style-variables';

export default function Invest({ isOpen, onClose }: CommonModal) {
  if (!isOpen) {
    return;
  }
  const onInvest = () => {
    console.log('Invest started');
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onChange, e:', e);
  };

  return (
    <PopupWrapper deeper={true} h="673px" reducePb={true} w="380px" onClose={onClose}>
      <SliderInternals header="Invest" slider_header="Choose a risk">
        {({ txtLeftSemibold }) => (
          <>
            <div>
              <Header4Left>Enter the amount</Header4Left>
              <Input
                classNames={{ inputWrapper: inputStyle }}
                placeholder="$000"
                onChange={onChange}
              />
            </div>
            <div>
              <Header4Left>Choose an account</Header4Left>
              <Select classNames={{ trigger: selectStyle }}>
                {allStrategies.map((acc) => (
                  <SelectItem key={acc.brokerCode}>{acc.brokerName}</SelectItem>
                ))}
              </Select>
            </div>
          </>
        )}
      </SliderInternals>
      <ButtonRoundedBlue btnText="Invest" onClick={onInvest} />
    </PopupWrapper>
  );
}
