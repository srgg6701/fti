import { ReactNode } from "react";
import Image from "next/image";
export default function ExchangeBlock({
  src,
  imgAlt = "",
  children,
  headerDisplay,
  w = "",
  h = "",
  height = 55,
  width = 55,
  marginRight = "",
  padding = "",
  mb = "",
  gap = "gap-5",
}: {
  src: string;
  imgAlt: string;
  children: ReactNode;
  headerDisplay?: string;
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
      <header className={`${headerDisplay} ${mb} ${gap} flex items-center`}>
        <Image
          alt={imgAlt}
          height={height}
          src={src}
          title={imgAlt}
          width={width}
        />
        {children}
      </header>
    </article>
  );
}
