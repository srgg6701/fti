"use client";
import Image from "next/image";

import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import { ButtonRoundedBlue } from "@/components/button-rounded";
import { CommonModal } from "@/components/pop-ups/types";

export default function Notice({ isOpen, onClose }: CommonModal) {
  if (!isOpen) {
    return;
  }

  return (
    <PopupWrapper deeper={true} h="185px" w="330px" onClose={onClose}>
      <div className="-m-2.5">
        <h4 className="m-auto flex inline-block h-[21px] whitespace-nowrap">
          <Image
            alt="Notice"
            className="mr-[5px] inline-block"
            height={18}
            src="/assets/images/icons/info-small.svg"
            width={18}
          />
          <span>Notice</span>
        </h4>
        <p className="my-[15px] max-w-[300px] text-sm">
          <span className="opacity-50">You cannot connect strategy</span> XXX{" "}
          <span className="opacity-50">to trading account</span> YYYY.{" "}
          <span className="opacity-50">Reason</span> VVVV.
        </p>
        <ButtonRoundedBlue btnText="Ok" marginBottom="0" maxW="max-w-[18px]" padding="p-5" />
      </div>
    </PopupWrapper>
  );
}
