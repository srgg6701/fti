'use client';

import { Card, CardHeader, CardBody, CardFooter, Input, Avatar } from '@heroui/react';
import Image from 'next/image';
import { Select, SelectItem } from '@heroui/select';
import { ReactElement } from 'react';

import brokers from '@/mockData/brokers-list';
import PopupHeader, { Header4Left } from '@/components/pop-ups/styled-popup-header';
import { ButtonRoundedBlue } from '@/components/button-rounded';
import { selectStyle, inputStyle } from '@/styles/style-variables';

import PopupWrapper from './popup-wrapper';

function AccountCard({ onRemove }: { onRemove: () => void }) {
  return (
    <Card className="bg-translusent-extreme relative mt-2.5 rounded-[15px] p-2 pb-3">
      <button className="absolute top-4 right-3 z-11 cursor-pointer" onClick={onRemove}>
        <Image
          alt="Close card, remove account"
          height={16}
          src="/assets/images/cross/cross-light-bolder.svg"
          width={16}
        />
      </button>
      <CardHeader className="pb-0">Total balance</CardHeader>
      <CardBody>
        <div className="text-[28px] leading-7 font-medium">$ 1000.00</div>
        <div className="pt-5 pb-[3px]">
          <div className="mb-2 text-sm leading-3.5">Brokers used</div>
          <div className="flex pl-1.5">
            {['face-male-spectacles', 'user-joshua', 'face-male-all-orange'].map((img) => (
              <Avatar
                key={img}
                classNames={{
                  base: 'relative z-0 -ml-1.5 w-[30px] h-[30px] min-w-[30px] min-h-[30px]',
                }}
                src={`/assets/images/users/${img}.svg`}
              />
            ))}
          </div>
        </div>
      </CardBody>
      <CardFooter className="h-[17px] gap-10 py-0">
        {[
          { label: 'Deposit', rotate: '' },
          { label: 'Bring out', rotate: '180' },
        ].map((block) => (
          <div key={block.label} className="color-blue-secondary flex text-sm font-medium">
            <Image
              alt={block.label}
              className={`mr-[5px] ${block.rotate && `rotate-${block.rotate}`}`}
              height={8}
              src="/assets/images/icons/arrows/arrow_up_blue.svg"
              width={8}
            />
            {block.label}
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}

function MainBlock({ children }: { children: ReactElement }) {
  return <div className="flex w-1/2 flex-col gap-5 text-left">{children}</div>;
}

function InnerBlock({ header4, children }: { header4: string; children: ReactElement }) {
  return (
    <div>
      <Header4Left>{header4}</Header4Left>
      {children}
    </div>
  );
}

export default function Backtesting({
  onClose,
  onRemove,
  addAccount,
}: {
  onClose: () => void;
  onRemove: () => void;
  addAccount: () => void;
}) {
  return (
    <PopupWrapper deeper={true} h="630px" reducePb={true} w="700px" onClose={onClose}>
      <div className="flex w-[620px] flex-col gap-5">
        <PopupHeader>Backtesting</PopupHeader>
        <div className="flex w-full gap-5">
          <MainBlock>
            <>
              <InnerBlock header4="Enter the amount">
                <Input classNames={{ inputWrapper: inputStyle }} placeholder="$000" />
              </InnerBlock>
              <InnerBlock header4="For how long">
                <Select
                  classNames={{
                    trigger: selectStyle,
                  }}
                  id="for-how-long"
                  placeholder="Choose value"
                  onChange={(e) => console.log('value for how long', e.target.value)}
                >
                  <SelectItem key="1d">1 Day</SelectItem>
                </Select>
              </InnerBlock>
              <div className="relative text-left">
                <InnerBlock header4="Select an account">
                  <>
                    <button
                      className="color-blue-canonical absolute top-0.5 ml-[18px] font-semibold underline"
                      onClick={addAccount}
                    >
                      Add
                    </button>
                    <AccountCard onRemove={onRemove} />
                  </>
                </InnerBlock>
              </div>
            </>
          </MainBlock>
          <MainBlock>
            <>
              <InnerBlock header4="Choose a broker">
                <Select
                  classNames={{
                    trigger: selectStyle,
                  }}
                  id="choose-broker"
                  placeholder="Broker's name"
                  onChange={(e) => console.log('value for broker chosen', e.target.value)}
                >
                  {brokers.map((broker) => (
                    <SelectItem key={broker.key}>{broker.label}</SelectItem>
                  ))}
                </Select>
              </InnerBlock>
              <InnerBlock header4="Choose a risk">
                <Select
                  classNames={{
                    trigger: selectStyle,
                  }}
                >
                  {[1, 2, 3, 4].map((risk) => (
                    <SelectItem key={risk}>{risk}</SelectItem>
                  ))}
                </Select>
              </InnerBlock>
              <div>
                <Header4Left>&nbsp;</Header4Left>
                <AccountCard onRemove={onRemove} />
              </div>
            </>
          </MainBlock>
        </div>
        <ButtonRoundedBlue btnText="Simulation" maxW="max-w-[300px]" />
      </div>
    </PopupWrapper>
  );
}
