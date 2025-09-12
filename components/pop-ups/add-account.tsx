'use client';
import { Select, SelectItem } from '@heroui/select';
import { Input } from '@heroui/input';
import { useState } from 'react';

import brokers from '@/mockData/brokers-list';
import { ButtonRoundedBlue } from '@/components/button-rounded';
import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import PopupHeader, { Header4Left } from '@/components/pop-ups/styled-popup-header';
import { selectStyle, inputStyleInner } from '@/components/pop-ups/style-variables';

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
              trigger: selectStyle,
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
              {brokers[0].data.map((data) => (
                <Input
                  key={data.value}
                  classNames={{ inputWrapper: inputStyleInner }}
                  placeholder={data.value}
                  type={data.type}
                />
              ))}
            </div>
          </div>
        )}
        {activeSection === 'binance' && (
          <div>
            <div className="flex flex-col gap-2.5">
              <Header4Left>Enter the key</Header4Left>
              {brokers[1].data.map((data) => (
                <Input
                  key={data.value}
                  classNames={{ inputWrapper: inputStyleInner }}
                  placeholder={data.value}
                  type={data.type}
                />
              ))}
            </div>
          </div>
        )}
        {activeSection && (
          <ButtonRoundedBlue btnText="Add" onClick={() => addAccount(activeSection)} />
        )}
      </div>
    </PopupWrapper>
  );
}
