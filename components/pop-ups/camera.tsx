'use client';
import Image from 'next/image';

import { ButtonRoundedGrey } from '@/components/button-rounded';
import DottedCircularProgress from '@/components/dottedCircularProgress';

export default function Camera({ imgSrc, onClose }: { imgSrc: string; onClose: () => void }) {
  return (
    <div id="camera-overlay">
      <ButtonRoundedGrey
        btnText="Back"
        style={{ position: 'absolute', top: '40px', right: '60px', zIndex: 3, width: '79px' }}
        onPress={onClose}
      />

      <div id="camera-progress">
        {/* See API description inside: */}
        <DottedCircularProgress
          animate
          color="#3B57FF" // --color-blue-second-rgb
          dot={0.03}
          duration={7500}
          gap={0.06}
          progress={0}
          ring={3}
          startDeg={-90}
        />
      </div>

      <div className="camera-image absolute inset-0 flex bg-black">
        <Image alt="Client image" className="m-auto" height={752} src={imgSrc} width={1029} />
      </div>

      <div className="text-semibold absolute bottom-[6.8vh] z-51 text-[18px]">
        Turn your head to the left...
      </div>
    </div>
  );
}
