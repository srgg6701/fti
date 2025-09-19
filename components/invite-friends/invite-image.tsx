import Image from 'next/image';
export default function InviteImage({
  height = 214,
  width = 380,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <Image
      alt="Invite a friend!"
      className=""
      height={height}
      src="/assets/images/invite-a-friend.png"
      width={width}
    />
  );
}
