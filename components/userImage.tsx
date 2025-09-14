import Image from 'next/image';
export default function UserImage({
  title,
  userImg,
  width,
  height,
}: {
  title: string;
  userImg: string;
  width: number;
  height?: number;
}) {
  return (
    <Image
      alt={title}
      height={height}
      src={`/assets/images/users/${userImg}`}
      title={title}
      width={width}
    />
  );
}
