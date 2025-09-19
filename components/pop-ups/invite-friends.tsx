'use client';
import Image from 'next/image';

import PopupWrapper from '@/components/pop-ups/popup-wrapper';
import { ButtonRoundedBlue } from '@/components/button-rounded';
import { CommonModal } from '@/components/pop-ups/types';

import { Header4Center } from './styled-popup-header';

export default function InviteFriends({ isOpen, onClose }: CommonModal) {
  if (!isOpen) {
    return;
  }

  return (
    <PopupWrapper deeper={true} h="430px" innerPadding={false} w="380px" onClose={onClose}>
      <div className="">
        <Image
          alt="Notice"
          className=""
          height={214}
          src="/assets/images/invite-a-friend.png"
          width={380}
        />
        <section className="px-10 pt-10 pb-[30px]">
          <div className="mb-[37px]">
            <Header4Center $h="[39px]" $mBottom="2.5" $size="!text-[32px]">
              Invite a friend
            </Header4Center>
            <p className="m-auto text-sm opacity-80">And take the bonus of 2x</p>
          </div>
          <ButtonRoundedBlue
            btnImageParams={{
              alt: 'Invite friends!',
              className: 'mr-2.5',
              height: 16,
              width: 17,
              src: '/assets/images/icons/sharing.svg',
            }}
            btnText="Invite friends"
            marginBottom="0"
            padding="p-5"
          />
        </section>
      </div>
    </PopupWrapper>
  );
}
