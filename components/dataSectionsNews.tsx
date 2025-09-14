'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// INFO:temporal measure, remove as we have real data
import DataNews, { type IDataNews } from '@/mockData/dataNews';
// ----------------------------------------------------
import { SectionData } from '@/components/sectionsWrapper/sectionData';
import CardNews from '@/components/cards/news';
import UserBlockNews from '@/components/cards/user-block-news';
import { clampText } from '@/lib/utils';
import formatTextToParagraphs from '@/components/formatText';
import '@/styles/style-sections.css';

type SelectedNews = {
  id?: number;
  slug?: string;
};

function selectTargetNews(data: IDataNews[], slug: SelectedNews['slug']) {
  const news = data.find((data) => `/${data.slug}` === slug);

  if (news) {
    return news;
  }
}

export default function DataSectionNews({ slug }: SelectedNews) {
  const [newsData, setNewsData] = useState<IDataNews[] | []>([]);
  const [actualNews, setSelectedNews] = useState<IDataNews | null>(null);

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

      console.log('targetNews', targetNews);
      if (targetNews) {
        setSelectedNews(targetNews);
      }
    }
  }, [newsData, slug]);

  //
  useEffect(() => {
    console.log('actualNews is absent', actualNews);
    if (actualNews) {
      console.log('actualNews', actualNews);
    }
  }, [actualNews]);

  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      {actualNews && (
        <div className="m-auto flex w-full max-w-[550px] flex-col gap-10">
          <UserBlockNews
            date={actualNews.date}
            title={actualNews.title}
            userImg={actualNews.userImg}
            username={actualNews.username}
          />
          <Image
            alt={actualNews.title}
            className="rounded-[15px]"
            height={394}
            src={`/assets/images/news/target-news/${actualNews.img}`}
            width={550}
          />
          <div>
            <h2 className="mb-5 !text-2xl leading-7 font-semibold">{actualNews.title}</h2>
            <div className="text-sm">{formatTextToParagraphs(actualNews.text)}</div>
          </div>
        </div>
      )}
      <SectionData
        data={newsData}
        getKey={(d, i) => `${d.title}-${i}`}
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
