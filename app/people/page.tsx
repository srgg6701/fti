"use client";
import InviteFriendsContent from "@/components/invite-friends";
import InviteImage from "@/components/invite-friends/invite-image";

export default function People() {
  return (
    <section className="mx-auto max-w-[550px] pt-20 pb-[56px]">
      <InviteImage height={311} src="invite-a-friend-big.png" width={550} />
      <InviteFriendsContent refSyst={true} />
    </section>
  );
}
