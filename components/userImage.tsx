import Image from "next/image";
export default function UserImage({
  title,
  userImg = "/assets/images/default-user.png",
  width,
  height,
}: {
  title: string;
  userImg?: string;
  width: number;
  height?: number;
}) {
  return (
    <Image
      alt={title}
      height={height}
      //src={`/assets/images/users/${userImg}`}
      src={userImg}
      title={title}
      width={width}
    />
  );
}
