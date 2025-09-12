'use client';
import { Select, SelectItem } from '@heroui/select';
import { Input } from '@heroui/input';
import { ChangeEvent, useState } from 'react';

import { ButtonRoundedBlue } from '@/components/button-rounded';
import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import PopupHeader, { Header4Left } from '@/components/pop-ups/styled-popup-header';

const brokers = [
  { key: 'roboforex', label: 'RoboForex MT4' },
  { key: 'binance', label: 'Binance' },
];

export default function AddAccountModal({ onClose }: { onClose: () => void }) {

  const [activeSection, setActiveSection] = useState<'roboforex' | 'binance' | null>(null);

  function handleSelect(type: string) {
    console.log('handleSelect', type);
    setActiveSection(type as 'roboforex' | 'binance');
  }

  function addAccount(activeSection: string) {
    if (activeSection) {
      alert(`Added account of ${activeSection}`);
    }
  }

  return (
    <PopupWrapper deeper={true} h="426px" reducePb={true} w="380px" onClose={onClose}>
      {/* Header */}
      <div className="flex flex-col gap-5 text-left">
        <PopupHeader>Add account</PopupHeader>
        <div>
          <Header4Left>Choose a broker</Header4Left>
          <Select
            classNames={{
              trigger: 'mt-2.5 !rounded-[15px] h-[45px] mb-2.5 w-full',
            }}
            id="choose-broker"
            placeholder="Broker's name"
            onChange={(e) => handleSelect(e.target.value)}
          >
            {brokers.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
        {activeSection === 'roboforex' && (
          <div>
            <div className="flex flex-col gap-2.5">
              <Header4Left>Enter the data</Header4Left>
              {[
                { value: 'MT4/MT5', type: 'text' },
                { value: 'Server', type: 'text' },
                { value: 'Login', type: 'text' },
                { value: 'Password', type: 'password' },
              ].map((data) => (
                <Input
                  key={data.value}
                  placeholder={data.value}
                  type={data.type}
                  classNames={{ inputWrapper: 'rounded-[15px]  h-[45px]' }}
                />
              ))}
            </div>
          </div>
        )}
        {activeSection === 'binance' && (
          <div>
            <div className="flex flex-col gap-2.5">
              <Header4Left>Enter the key</Header4Left>
              {[
                { value: 'API key', type: 'text' },
                { value: 'Secret key', type: 'text' },
              ].map((data) => (
                <Input
                  key={data.value}
                  placeholder={data.value}
                  type={data.type}
                  classNames={{ inputWrapper: 'rounded-[15px]  h-[45px]' }}
                />
              ))}
            </div>
          </div>
        )}
        {activeSection && <ButtonRoundedBlue onClick={() => addAccount(activeSection)} btnText="Add" />}
      </div>
    </PopupWrapper>
  );
}
