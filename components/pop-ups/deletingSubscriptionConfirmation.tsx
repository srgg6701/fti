'use client';
import Image from 'next/image';

import { ButtonRoundedBlue, ButtonRoundedGrey } from '@/components/button-rounded';

import PopupWrapper from './popup-wrapper';
export default function DeletingSubscritpionConfirmation({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  return (
    <PopupWrapper h="[268px]" w="[421px]">
      <Image
        alt="Close pop-up"
        className="fixed top-[90px] right-[60px]"
        height={36}
        src="/assets/images/cross/cross-light.svg"
        width={36}
        onClick={onCloseModal}
      />
      <div className="m-[-10px] flex flex-col justify-center text-center">
        <h4 className="mb-5">Confirm the deletion of the subscription</h4>
        <ButtonRoundedBlue
          btnText="No, I want to keep my subscription"
          marginBottom="mb-2.5"
          onClick={onCloseModal}
        />
        <ButtonRoundedGrey
          btnText="Yes, I want to delete my subscription"
          fontColor="color-ultra-violet"
          onClick={onCloseModal}
        />
      </div>
    </PopupWrapper>
  );
}
