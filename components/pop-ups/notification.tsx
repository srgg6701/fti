'use client';
import Link from 'next/link';
import Image from 'next/image';

import PopupWrapper from './popup-wrapper';
export default function Notification({ onCloseModal }: { onCloseModal: () => void }) {
  return (
    <PopupWrapper h="[85px]" w="[220px]">
      <Image
        alt="Close pop-up"
        className="fixed top-[90px] right-[60px]"
        height={36}
        src="/assets/images/cross/cross-light.svg"
        width={36}
        onClick={onCloseModal}
      />
      <div className="m-[-10px] flex flex-col justify-center text-center">
        <Image
          alt="New Assed Added!"
          className="mx-auto mb-[5px]"
          height={25}
          src="/assets/images/icons/party.svg"
          width={26}
        />
        <h4 className="h-[21px]">Notification</h4>
        <p className="color-secondary pt-[15px] text-sm">
          <span className="color-secondary text-sm opacity-50">Added a new asset named</span>{' '}
          <Link className="color-blue-canonical" href="/contents/memicon">
            &quot;memcoin&quot;
          </Link>
        </p>
      </div>
    </PopupWrapper>
  );
}
