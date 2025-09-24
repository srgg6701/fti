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
      <Header4Center $limitW="52" className="mb-4">
        Account added!
      </Header4Center>
      <p>The account has been added and is being verified.</p>
      <p>This may take up to a minute.</p>
      <ButtonRoundedBlue
        btnText="Ok"
        marginBottom="mt-5 mb-2.5"
        onClick={onClose}
      />
    </PopupWrapper>
  );
}
