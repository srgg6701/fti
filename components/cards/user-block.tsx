import { ReactNode } from "react";

import UserImage from "@/components/userImage";
export default function UserBlock({
  userImg,
  imgAlt = "",
  children,
  headerDisplay,
  w = "md:w-[380px]",
  h = "md:h-[95px]",
  height = 55,
  width = 55,
  marginRight = "mr-[10px]",
  padding = "p-5",
  xClassName = "",
  mb = "mb-5",
  gap = "gap-3",
  onClick,
}: {
  userImg: string;
  imgAlt: string;
  children: ReactNode;
  headerDisplay?: string;
  w?: string;
  h?: string;
  height?: number;
  width?: number;
  marginRight?: string;
  padding?: string;
  xClassName?: string;
  mb?: string;
  gap?: string;
  onClick?: () => void;
}) {
  return (
    <button className={`${h} ${w} ${marginRight} ${padding} ${xClassName}`} onClick={onClick}>
      <header className={`${headerDisplay} ${mb} ${gap} flex items-center`}>
        <UserImage
          height={height}
          title={imgAlt}
          userImg={userImg}
          width={width}
        />
        {children}
      </header>
    </button>
  );
}
