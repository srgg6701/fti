"use client";
import type { News } from "@/types/apiData";

import { useState, useEffect } from "react";
import Image from "next/image";

// INFO:temporal measure, remove as we have real data
// ----------------------------------------------------
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import CardNews from "@/components/cards/news";
import UserBlockNews from "@/components/cards/user-block-news";
import { clampText, defineImgBase64, formatDate, makeSlug } from "@/lib/utils";
import formatTextToParagraphs from "@/components/formatText";
import "@/styles/style-sections.css";
import { routeAliases } from "@/config/site";
import { apiFetch } from "@/lib/api";

function selectTargetNews(data: News[]) {
  const id = localStorage.getItem("newsId");
  const news = data.find((data) => `/${data.id}` === id);

  if (news) {
    return news;
  }
}

export default function DataSectionNews({ slug }: { slug?: string }) {
  const [newsData, setNewsData] = useState<News[] | []>([]);
  const [actualNews, setSelectedNews] = useState<News | null>(null);
  const [horizontalLayout, setLayoutHorizontal] = useState(true);

  // get all news
  useEffect(() => {
    async function fetchNews() {
      const news = await apiFetch<News[]>(`/api/${routeAliases.news}`);

      setNewsData(news);
    }

    fetchNews();
  }, []);

  useEffect(() => {
    //console.log({ newsData, id });
    if (slug && newsData.length > 0) {
      const targetNews = selectTargetNews(newsData);

      //console.log("targetNews", targetNews);
      if (targetNews) {
        setSelectedNews(targetNews);
      }
    }
  }, [newsData, slug]);

  return (
    <div
      className={`mt-[80px] mb-[80px] flex ${horizontalLayout ? "flex-col" : ""} gap-[5rem]`}
    >
      {actualNews && (
        <div
          className={`flex flex-col gap-10 ${horizontalLayout ? "m-auto max-w-[550px]" : "-mr-[400px] pr-[400px]"} w-full`}
        >
          <UserBlockNews
            author={actualNews.author}
            date={actualNews.timestamp}
            title={actualNews.title}
            //userImg={actualNews.userImg}
            //username={actualNews.username}
          />
          <Image
            alt={actualNews.title}
            className={`rounded-[15px] ${!horizontalLayout ? "mx-auto" : ""}`}
            height={394}
            src={
              actualNews.img
                ? `/assets/images/news/${actualNews.img}`
                : defineImgBase64(actualNews.imageBase64!)
            }
            width={550}
          />
          <div>
            <h2 className="mb-5 !text-2xl leading-7 font-semibold">
              <button
                className="cursor-pointer text-left hover:opacity-60"
                onClick={() => setLayoutHorizontal(!horizontalLayout)}
              >
                {actualNews.title}
              </button>
            </h2>
            <div
              className={`relative text-sm ${horizontalLayout ? "max-h-80 overflow-hidden" : ""}`}
            >
              {formatTextToParagraphs(actualNews.content)}
              <button
                className="color-blue-secondary absolute right-0 bottom-0 cursor-pointer"
                onClick={() => setLayoutHorizontal(!horizontalLayout)}
              >
                <span className="font-medium">{`show ${horizontalLayout ? "more" : "less"} ...`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <SectionData
        data={newsData}
        getKey={(d, i) => `${d.title}-${i}`}
        horizontalLayout={horizontalLayout}
        noHeader={true}
        renderItem={(d, i) => (
          <CardNews
            key={i}
            author={d.author}
            date={formatDate(d.timestamp)}
            id={d.id}
            imageBase64={d.imageBase64}
            img={d.img}
            slug={makeSlug(d.title)}
            text={clampText(d.content)}
            title={d.title}
            //userImg={d.userImg}
            //username={d.username}
          />
        )}
        rowClassName="w-full flex-wrap gap-y-2.5"
        seeAllHref="/top"
        title="News"
      />
    </div>
  );
}
