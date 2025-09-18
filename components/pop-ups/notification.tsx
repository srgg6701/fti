'use client';
import Link from 'next/link';
import Image from 'next/image';

import PopupWrapper from './popup-wrapper';
import { CommonModal } from './types';
export default function Notification({ isOpen, onClose }: CommonModal) {
  if (!isOpen) return;

  return (
    <PopupWrapper deeper={true} h="85px" w="220px" onClose={onClose}>
      <Image
        alt="New Assed Added!"
        className="mx-auto mb-[5px]"
        height={25}
        src="/assets/images/icons/party.svg"
        width={26}
      />
      <h4 className="h-[21px]">Notification</h4>
      <p className="pt-[15px] text-sm">
        <span className="text-sm opacity-50">Added a new asset named</span>{' '}
        <Link className="color-blue-canonical" href="/contents/memicon">
          &quot;memcoin&quot;
        </Link>
      </p>
    </PopupWrapper>
  );
}
