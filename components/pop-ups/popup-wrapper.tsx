import { ReactNode } from 'react';
import Image from 'next/image';

export default function PopupWrapper({
  children,
  onClose,
  deeper,
  reducePb,
  h,
  w,
}: {
  children: ReactNode;
  onClose?: () => void;
  deeper?: boolean;
  reducePb?: boolean;
  h: string;
  w: string;
}) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center h-[${h}] w-[${w}]`}>
      {/* Overlay layer */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        role="button"
        onClick={onClose}
      />
      <div
        className={`bg-translusent-extreme relative flex justify-between overflow-y-auto rounded-[15px] p-10 ${reducePb && 'pb-[30px]'} shadow-2xl`}
      >
        {deeper ? (
          <>
            <Image
              alt="Close pop-up"
              className="fixed top-[90px] right-[60px]"
              height={36}
              src="/assets/images/cross/cross-light.svg"
              width={36}
              onClick={onClose}
            />
            {/* m-[-10px]  */}
            <div className="flex w-full flex-col justify-center text-center">{children}</div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
