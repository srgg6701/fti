"use client";
import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import { CommonModal } from "@/components/pop-ups/types";
import InviteBase from "@/components/invite-friends/invite-base";

export default function InviteFriends({ isOpen, onClose }: CommonModal) {
  if (!isOpen) {
    return;
  }

  return (
    <PopupWrapper deeper={true} h="430px" innerPadding={false} w="380px" onClose={onClose}>
      <InviteBase onClose={onClose} />
    </PopupWrapper>
  );
}
