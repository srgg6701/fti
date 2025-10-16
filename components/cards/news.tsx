"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { routeAliases } from "@/config/site";
import { defineImgBase64 } from "@/lib/utils";
import UserBlockNews from "@/components/cards/user-block-news";

const CardNews = ({
  author,
  date,
  id,
  img,
  imageBase64,
  slug,
  title,
  text,
  marginRight = "mr-[10px]",
  padding = "p-5",
  xtraClasses,
}: {
  author: string;
  date: string;
  id: number;
  img?: string | null;
  imageBase64?: string | null;
  slug?: string;
  title: string;
  text: string;
  marginRight?: string;
  padding?: string;
  xtraClasses?: string;
}) => {
  const router = useRouter();

  return (
    <article
      className={`md:h-[376px] md:w-[320px] ${marginRight} ${padding} flex flex-col gap-5 ${xtraClasses}`}
    >
      <UserBlockNews author={author} date={date} slug={slug} title={title} />
      <div className="flex min-h-[180px] items-center overflow-hidden rounded-[16px]">
        {(img || imageBase64) && (
          <Image
            alt={title}
            className="min-h-[180px]"
            height={180}
            src={
              img ? `/assets/images/news/${img}` : defineImgBase64(imageBase64!)
            }
            width={280}
          />
        )}
      </div>
      <div className="text-left">
        <h3 className="mb-[10px] text-lg leading-[1.2] font-semibold">
          <button
            className="cursor-pointer text-left"
            onClick={() => router.push(`/${routeAliases.news}/${slug}`)}
          >
            {title}
          </button>
        </h3>
        <p className="relative text-sm leading-[1.215]">
          <span className="opacity-80">{text}</span>
          <Link className="read-more" href={`/${routeAliases.news}/${slug}`}>
            <span className="color-blue-secondary"> read more</span>
          </Link>
        </p>
      </div>
    </article>
  );
};

export default CardNews;
