'use client';
import Image from 'next/image';

import { ButtonRoundedGrey } from '@/components/button-rounded';

export default function Camera({ imgSrc, onClose }: { imgSrc: string; onClose: () => void }) {
  return (
    <div className="camera-overlay camera-overlay--large camera-overlay--left progress-on fixed inset-0 z-50 flex items-center justify-center">
      {
        <ButtonRoundedGrey
          btnText="Back"
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            zIndex: 1,
            width: '79px',
          }}
          onPress={onClose}
        />
      }
      <div className="camera-image absolute top-0 right-0 bottom-0 left-0 flex bg-black">
        <Image alt="Client image" className="m-auto" height={752} src={imgSrc} width={1029} />
      </div>
      <div className="text-semibold absolute bottom-[65px] text-[18px]">
        Turn your head to the left...
      </div>
    </div>
  );
}
