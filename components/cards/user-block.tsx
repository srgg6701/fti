import { ReactNode } from 'react';
import Image from 'next/image';
export default function UserBlock({
  userImg,
  imgAlt,
  children,
  imgTitle,
  w = 'md:w-[380px]',
  h = 'md:h-[95px]',
  height = 55,
  width = 55,
  marginRight = 'mr-[10px]',
  padding = 'p-5',
  mb = 'mb-5',
  gap = 'gap-3',
}: {
  userImg: string;
  imgAlt: string;
  children: ReactNode;
  imgTitle?: string;
  w?: string;
  h?: string;
  height?: number;
  width?: number;
  marginRight?: string;
  padding?: string;
  mb?: string;
  gap?: string;
}) {
  return (
    <article className={`${h} ${w} ${marginRight} ${padding}`}>
      <header className={`${mb} ${gap} flex items-center`}>
        <Image
          alt={imgAlt}
          height={height}
          src={`/assets/images/users/${userImg}`}
          title={imgTitle}
          width={width}
        />
        {children}
      </header>
    </article>
  );
}
