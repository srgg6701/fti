'use client';

import { ButtonRoundedBlue, ButtonRoundedGrey } from '@/components/button-rounded';

import PopupWrapper from './popup-wrapper';
export default function DeletingSubscritpionConfirmation({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  return (
    <PopupWrapper deeper={true} h="[268px]" w="[421px]" onClose={onCloseModal}>
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
    </PopupWrapper>
  );
}
