"use client";

import Image from "next/image";

import { Header4Center } from "@/components/pop-ups/styled-popup-header";
import PopupWrapper from "@/components/pop-ups/popup-wrapper";

export default function DeletingSubscritpionConfirmation({
  accountNumber,
  broker,
  platform,
  onClick,
  onClose,
}: {
  accountNumber?: string;
  broker?: string;
  platform?: string;
  onClick: () => void;
  onClose: () => void;
}) {
  let img = "";

  switch (broker) {
    case "Binance":
      img = "binance.png";
      break;

    case "Bybit":
      img = "green-fur.png";
      break;

    default: // RoboForex
      img = "roboforex.png";
      break;
  }

  return (
    <button onClick={onClick}>
      <PopupWrapper
        deeper={true}
        reducePb={true}
        style={{ width: "360px" }}
        onClose={onClose}
      >
        <Header4Center $limitW="52" className="mb-4 mt-4">
          <Image
            alt="Broker"
            className="mx-auto"
            height={55}
            src={`/assets/images/exchange/${img}`}
            width={55}
          />
          <div className="mt-2.5">{accountNumber}</div>
        </Header4Center>
        <p className="text-sm opacity-50">
          {broker}
          {platform || ""}.
        </p>
        <p className="pt-4 text-xs opacity-35 mb-4">Verifying...</p>
        {/* <ButtonRoundedBlue
        btnText="Ok"
        marginBottom="mt-5 mb-2.5"
        onClick={onClose}
      /> */}
      </PopupWrapper>
    </button>
  );
}
