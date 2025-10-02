import Image from "next/image";
export default function InviteImage({
  height = 214,
  width = 380,
  src = "invite-a-friend.png",
}: {
  height?: number;
  width?: number;
  src?: string;
}) {
  return (
    <Image
      alt="Invite a friend!"
      className=""
      height={height}
      src={`/assets/images/${src}`}
      width={width}
    />
  );
}
