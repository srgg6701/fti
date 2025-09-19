'use client';
import { useRouter } from 'next/navigation';

import { ButtonRoundedBlue } from '@/components/button-rounded';
import { Header4Center, Header4Left } from '@/components/pop-ups/styled-popup-header';

type ProgramCondProps = {
  refSyst?: boolean;
  onClose?: () => void;
};

const ProgramCond = () => (
  <div className="py-5">
    <Header4Left className="font-medium">Program conditions</Header4Left>
    <h6 className="mt-[21px] mb-2.5 text-sm opacity-80">1. How does it work?</h6>
    <p className="text-xs opacity-50">
      Our referral program allows you and your friends to earn rewards for recommending our app. You
      share your unique link (or code) with friends. When they meet the necessary condition, you
      both receive bonuses.
    </p>
    <h6 className="mt-[21px] mb-2.5 text-sm opacity-80">2. Program participants</h6>
    <ul className="list-disc pl-5 text-xs opacity-50">
      <li className="">
        Anyone with an active account on the application can participate in the program.
      </li>
      <li className="">
        The program is intended for personal, non-commercial use. It is prohibited to post referral
        links on platforms for mass distribution (coupons, discount aggregators, etc.) without our
        written consent.
      </li>
    </ul>
  </div>
);

export default function InviteFriendsContent({ refSyst = false, onClose }: ProgramCondProps) {
  const router = useRouter();
  const goAndClose = () => {
    if (onClose) onClose();
    router.push('/referral-system');
  };

  return (
    <>
      {!refSyst ? (
        <div className="mb-[37px]">
          <Header4Center $h="[39px]" $mBottom="2.5" $size="!text-[32px]">
            Invite a friend
          </Header4Center>
          <p className="m-auto text-sm opacity-80">
            <button className="hover:underline" onClick={goAndClose}>
              And take the bonus of 2x
            </button>
          </p>
        </div>
      ) : (
        <ProgramCond />
      )}
      <div className="flex">
        <ButtonRoundedBlue
          btnImageParams={{
            alt: 'Invite friends!',
            className: `mr-2.5`,
            height: 16,
            width: 17,
            src: '/assets/images/icons/sharing.svg',
          }}
          btnText="Invite friends"
          height="h-[45px]"
          marginBottom="0"
          marginClass={`${refSyst && 'ml-auto'}`}
          padding="p-5"
          width="w-[300px]"
        />
      </div>
    </>
  );
}
