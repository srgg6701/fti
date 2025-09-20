"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// INFO:temporal measure, remove as we have real data
import DataNews, { type IDataNews } from "@/mockData/dataNews";
// ----------------------------------------------------
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import CardNews from "@/components/cards/news";
import UserBlockNews from "@/components/cards/user-block-news";
import { clampText } from "@/lib/utils";
import formatTextToParagraphs from "@/components/formatText";
import "@/styles/style-sections.css";

type SelectedNews = {
  id?: number;
  slug?: string;
};

function selectTargetNews(data: IDataNews[], slug: SelectedNews["slug"]) {
  const news = data.find((data) => `/${data.slug}` === slug);

  if (news) {
    return news;
  }
}

export default function DataSectionNews({ slug }: SelectedNews) {
  const [newsData, setNewsData] = useState<IDataNews[] | []>([]);
  const [actualNews, setSelectedNews] = useState<IDataNews | null>(null);
  const [horizontalLayout, setLayoutHorizontal] = useState(true);

  async function fetchNews() {
    // реальный запрос к серверу (пока отключён)
    // const r = await fetch('/api/news', { cache: 'no-store' });
    // if (!r.ok) throw new Error(`Fetch error: ${r.status}`);
    // const data = await r.json();
    // return data;

    // имитация работы сети
    new Promise((resolve) => {
      setTimeout(() => {
        setNewsData(DataNews);
        resolve(DataNews);
      }, 500); // mocking delay
    });
  }

  fetchNews();

  useEffect(() => {
    console.log({ newsData, slug });
    if (slug && newsData.length > 0) {
      const targetNews = selectTargetNews(newsData, slug);

      console.log("targetNews", targetNews);
      if (targetNews) {
        setSelectedNews(targetNews);
      }
    }
  }, [newsData, slug]);

  //
  useEffect(() => {
    console.log("actualNews is absent", actualNews);
    if (actualNews) {
      console.log("actualNews", actualNews);
    }
  }, [actualNews]);

  return (
    <div className={`mt-[80px] mb-[80px] flex ${horizontalLayout ? "flex-col" : ""} gap-[5rem]`}>
      {actualNews && (
        <div
          className={`flex flex-col gap-10 ${horizontalLayout ? "m-auto max-w-[550px]" : "-mr-[400px] pr-[400px]"} w-full`}
        >
          <UserBlockNews
            date={actualNews.date}
            title={actualNews.title}
            userImg={actualNews.userImg}
            username={actualNews.username}
          />
          <Image
            alt={actualNews.title}
            className={`rounded-[15px] ${!horizontalLayout ? "mx-auto" : ""}`}
            height={394}
            src={`/assets/images/news/target-news/${actualNews.img}`}
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
              {formatTextToParagraphs(actualNews.text)}
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
            date={d.date}
            img={d.img}
            slug={d.slug}
            text={clampText(d.text)}
            title={d.title}
            userImg={d.userImg}
            username={d.username}
          />
        )}
        rowClassName="w-full flex-wrap gap-y-2.5"
        seeAllHref="/top"
        title="DataNews"
      />
    </div>
  );
}
