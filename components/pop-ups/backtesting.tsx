'use client';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Select,
  SelectItem,
  Avatar,
} from '@heroui/react';

import PopupHeader from '@/components/pop-ups/styled-popup-header';
import { ButtonRoundedBlue } from '@/components/button-rounded';

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

export default function Backtesting({ onClose }: { onClose: () => void }) {
  return (
    <PopupWrapper deeper={true} h="[85px]" w="[220px]" onClose={onClose}>
      <div className="flex flex-col gap-5">
        <PopupHeader>Backtesting</PopupHeader>
        {/* Row 1 */}
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Input label="Enter the amount" placeholder="$000" />
          </div>
          <div style={{ flex: 1 }}>
            <Input label="Choose a broker" placeholder="Broker's name" />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Select label="For how long" placeholder="1 Day">
              <SelectItem key="1d">1 Day</SelectItem>
            </Select>
          </div>
          <div style={{ flex: 1 }}>
            <Input label="Choose a risk" placeholder="4" />
          </div>
        </div>

        {/* Accounts header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Select an account</span>
          <Button size="sm" variant="flat">
            Add
          </Button>
        </div>

        {/* Accounts (2/2) */}
        <div style={{ display: 'flex', flex: 1 }}>
          <div style={{ flex: 1 }}>
            <AccountCard />
          </div>
          <div style={{ flex: 1 }}>
            <AccountCard />
          </div>
        </div>

        {/* Bottom button */}
        <ButtonRoundedBlue btnText="Simulation" maxW="max-w-[300px]" />
      </div>
    </PopupWrapper>
  );
}
