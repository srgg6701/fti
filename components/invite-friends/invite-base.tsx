import InviteFriendsContent from '@/components/invite-friends';

import InviteImage from './invite-image';

export default function InviteBase({ onClose }: { onClose?: () => void }) {
  return (
    <div>
      <InviteImage />
      <section className="px-10 pt-10 pb-[30px]">
        <InviteFriendsContent onClose={onClose} />
      </section>
    </div>
  );
}
