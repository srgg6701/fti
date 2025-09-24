"use client";

import { ButtonRoundedBlue } from "@/components/button-rounded";
import { Header4Center } from "@/components/pop-ups/styled-popup-header";

import PopupWrapper from "./popup-wrapper";
export default function DeletingSubscritpionConfirmation({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <PopupWrapper deeper={true} reducePb={true} onClose={onClose}>
      <Header4Center $limitW="52">Account added!</Header4Center>
      <ButtonRoundedBlue
        btnText="Ok"
        marginBottom="mt-5 mb-2.5"
        onClick={onClose}
      />
    </PopupWrapper>
  );
}
