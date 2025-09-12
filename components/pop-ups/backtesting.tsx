'use client';

import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Avatar } from '@heroui/react';
import { Select, SelectItem } from '@heroui/select';
import { ReactElement } from 'react';

import brokers from '@/mockData/brokers-list';
import PopupHeader, { Header4Left } from '@/components/pop-ups/styled-popup-header';
import { ButtonRoundedBlue } from '@/components/button-rounded';
import { selectStyle, inputStyle } from '@/components/pop-ups/style-variables';

import PopupWrapper from './popup-wrapper';

function AccountCard() {
  return (
    <Card>
      <CardHeader>Total balance</CardHeader>
      <CardBody>
        <div>$ 1000.00</div>
        <Divider />
        <div style={{ marginTop: 8, marginBottom: 8 }}>Brokers used</div>
        <div style={{ display: 'flex' }}>
          <Avatar size="sm" />
          <Avatar size="sm" />
          <Avatar size="sm" />
        </div>
      </CardBody>
      <CardFooter style={{ display: 'flex', gap: 8 }}>
        <div className="text-sm">+ Deposit</div>
        <div className="text-sm">Bring out</div>
      </CardFooter>
    </Card>
  );
}

function MainBlock({ children }: { children: ReactElement }) {
  return <div className="flex w-1/2 flex-col gap-5">{children}</div>;
}

function InnerBlock({ header4, children }: { header4: string; children: ReactElement }) {
  return (
    <div>
      <Header4Left>{header4}</Header4Left>
      {children}
    </div>
  );
}

export default function Backtesting({ onClose }: { onClose: () => void }) {
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
                  placeholder="choose value"
                  onChange={(e) => console.log('value for how long', e.target.value)}
                >
                  <SelectItem key="1d">1 Day</SelectItem>
                </Select>
              </InnerBlock>
              <InnerBlock header4="Select an account">
                <AccountCard />
              </InnerBlock>
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
                  }}>
                  {[1,2,3,4].map(risk => <SelectItem key={risk}>{risk}</SelectItem>)}
                </Select>
              </InnerBlock>
              <div>
                <Header4Left>&nbsp;</Header4Left>
                <AccountCard />
              </div>
            </>
          </MainBlock>
        </div>
        <ButtonRoundedBlue btnText="Simulation" maxW="max-w-[300px]" />
      </div>
    </PopupWrapper>
  );
}
