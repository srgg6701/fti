'use client';
import InviteFriendsContent from '@/components/invite-friends';
import InviteImage from '@/components/invite-friends/invite-image';

export default function RefferalSystem() {
  return (
    <section className="mx-auto max-w-[550px] py-[56px]">
      <InviteImage height={311} width={550} />
      <InviteFriendsContent refSyst={true} />
    </section>
  );
}
