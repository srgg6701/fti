'use client';
//import { Switch } from '@heroui/react';
import DottedCircularProgress from '@/components/dottedCircularProgress';

export default function TestSwitch() {
  return (
    <div className="p-8">
      <h1>Circulars</h1>
      {/* <Switch defaultSelected aria-label="test" /> */}
      <div style={{ padding: 40 }}>
        {/* Вариант с одноразовой анимацией 0→1 */}
        <DottedCircularProgress
          animate
          dot={0.028}
          duration={2500}
          gap={0.072}
          ring={4}
          size={240}
        />

        {/* Вариант с ручным управлением прогрессом (например, 25%) */}
        {/* <DottedCircularProgress progress={0.25} size={240} ring={3} /> */}
      </div>
    </div>
  );
}
