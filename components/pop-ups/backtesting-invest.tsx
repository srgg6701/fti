'use client';
// FIXME: remove this file if you don't need it anymore
import Image from 'next/image';
import { ReactElement } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar } from '@heroui/react';
import { Select, SelectItem } from '@heroui/select';

import brokers from '@/mockData/brokers-list';
import PopupHeader, { Header4Left } from '@/components/pop-ups/styled-popup-header';
import FormElementWrapper from '@/components/pop-ups/form-elements/form-element-wrapper';
import FormElementInput from '@/components/pop-ups/form-elements/form-element-input';
import { ButtonRoundedBlue } from '@/components/button-rounded';
import { selectStyle } from '@/styles/style-variables';

import PopupWrapper from './popup-wrapper';

function AccountCard({ onRemove }: { onRemove: () => void }) {
  return (
    <Card className="bg-translusent-extreme relative mt-2.5 rounded-[15px] p-2 pb-5">
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

export default function BacktestingInvest({
  popupHeader,
  onClose,
  onRemove,
  onSimulation,
  addAccount,
}: {
  popupHeader: string;
  onClose: () => void;
  onRemove: () => void;
  onSimulation: () => void;
  addAccount: () => void;
}) {
  return (
    <PopupWrapper deeper={true} h="630px" reducePb={true} w="700px" onClose={onClose}>
      <div className="flex w-[620px] flex-col gap-5">
        <PopupHeader>{popupHeader}</PopupHeader>
        <div className="flex w-full gap-5">
          <MainBlock>
            <>
              <FormElementWrapper header4="Enter the amount" id="enter-amount">
                <FormElementInput />
              </FormElementWrapper>
              <FormElementWrapper header4="For how long">
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
              </FormElementWrapper>
              <div className="relative text-left">
                <FormElementWrapper header4="Select an account">
                  <>
                    <button
                      className="color-blue-canonical absolute top-0.5 ml-[18px] font-semibold underline"
                      onClick={addAccount}
                    >
                      Add
                    </button>
                    <AccountCard onRemove={onRemove} />
                  </>
                </FormElementWrapper>
              </div>
            </>
          </MainBlock>
          <MainBlock>
            <>
              <FormElementWrapper header4="Choose a broker">
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
              </FormElementWrapper>
              <FormElementWrapper header4="Choose a risk">
                <Select
                  classNames={{
                    trigger: selectStyle,
                  }}
                >
                  {[1, 2, 3, 4].map((risk) => (
                    <SelectItem key={risk}>{risk}</SelectItem>
                  ))}
                </Select>
              </FormElementWrapper>
              <div>
                <Header4Left>&nbsp;</Header4Left>
                <AccountCard onRemove={onRemove} />
              </div>
            </>
          </MainBlock>
        </div>
        <ButtonRoundedBlue
          btnText="Simulation"
          maxW="max-w-[300px]"
          onPress={() => {
            onClose?.();
            onSimulation?.();
          }}
        />
      </div>
    </PopupWrapper>
  );
}
