'use client';
import { Switch } from '@heroui/react';

export default function TestSwitch() {
  return (
    <div className="p-8">
      <h1>Switch Test</h1>
      <Switch defaultSelected aria-label="test" />
    </div>
  );
}