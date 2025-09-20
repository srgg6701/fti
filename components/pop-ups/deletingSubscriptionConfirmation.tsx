"use client";

import {
  ButtonRoundedBlue,
  ButtonRoundedGrey,
} from "@/components/button-rounded";
import { Header4Center } from "@/components/pop-ups/styled-popup-header";

import PopupWrapper from "./popup-wrapper";
export default function DeletingSubscritpionConfirmation({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  return (
    <PopupWrapper
      deeper={true}
      h="268px"
      reducePb={true}
      w="421px"
      onClose={onCloseModal}
    >
      <Header4Center $limitW="52">
        Confirm the deletion of the subscription
      </Header4Center>
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
