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
import * as React from 'react';

export default function BacktestingPanel() {
  return (
    <div style={{ width: 700, height: 630, display: 'flex', flexDirection: 'column' }}>
      <h1>Backtesting</h1>

      {/* Row 1 */}
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Input label="Enter the amount" placeholder="$000" />
        </div>
        <div style={{ flex: 1 }}>
          <Input label="Choose a broker" placeholder="Broker's name" />
        </div>
      </div>

      {/* GAP #1 (розовая полоса) */}
      <div style={{ height: 20 }} />

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

      {/* GAP #2 (розовая полоса) */}
      <div style={{ height: 20 }} />

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
      <Button size="lg" variant="bordered">
        Simulation
      </Button>
    </div>
  );
}

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
        <Button size="sm" variant="flat">
          + Deposit
        </Button>
        <Button size="sm" variant="flat">
          Bring out
        </Button>
      </CardFooter>
    </Card>
  );
}
