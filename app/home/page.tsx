'use client'; // TODO: check if it should be a client component
import { useLayoutEffect } from 'react';
//import Link from 'next/link';
import Image from 'next/image';
import DataTopPerforming from '@/mockData/dataTopPerforming';
import DataNews from '@/mockData/dataNews';
import { SectionData } from '@/components/sectionData';
import CardTopPerforming from '@/components/cards/top-performing';
import CardNews from '@/components/cards/news';
import './style.css';

export default function Home() {
  function addStrategy() {
    if (window) {
      window.alert('Add Strategy');
    } else {
      console.log('Add Strategy');
    }
  }
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const main = document.querySelector<HTMLElement>('main');
    const overlay = document.querySelector<HTMLDivElement>('[data-overlay-container]');

    if (!main) return;

    const apply = () => {
      const mainRect = main.getBoundingClientRect();
      const workingWidth = window.innerWidth - mainRect.left;
      const articleContainers = document.getElementsByClassName(
        'article-container',
      ) as HTMLCollectionOf<HTMLElement>;

      for (let i = 0; i < articleContainers.length; i++) {
        (articleContainers[i] as HTMLElement).style.width = `${workingWidth}px`;
      }
    };

    overlay && (overlay.style.overflowX = 'hidden');
    // first run
    apply();

    const ro = new ResizeObserver(apply);

    ro.observe(main);
    window.addEventListener('resize', apply, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  return (
    <div className="mt-[80px] mb-[56px] flex min-h-screen flex-col gap-[5rem] text-white">
      {/* Empty state / CTA */}
      <section className="mx-auto py-[80px]">
        <div className="mx-auto flex w-full max-w-[370px] flex-col text-center">
          <h2 className="text-lg font-medium">You don&apos;t have any strategies at the moment</h2>
          <div className="my-[10px]">Add your first strategy</div>
          <button className="text-center" onClick={addStrategy}>
            <Image
              alt="Add your first strategy"
              className="mx-auto"
              height="45"
              src="/assets/images/cross/plus.svg"
              width="45"
            />
          </button>
        </div>
      </section>
      {/* Top Performing */}
      <SectionData
        data={DataTopPerforming}
        title="Top Performing"
        seeAllHref="/top"
        height={327}
        rowClassName=""
        renderItem={(d, i) => (
          <CardTopPerforming
            key={i} // если есть id — лучше его
            chartImg={d.chartImg}
            risk={d.risk}
            roi={d.roi}
            timeFrame={d.timeFrame}
            userImg={d.userImg}
          />
        )}
        getKey={(d, i) => `${d.timeFrame}-${i}`}
      />
      {/* News */}
      <SectionData
        data={DataNews}
        title="DataNews"
        seeAllHref="/top"
        height={393}
        rowClassName=""
        renderItem={(d, i) => (
          <CardNews
            key={i} // если есть id — лучше его
            date={d.date}
            img={d.img}
            text={d.text}
            title={d.title}
            userImg={d.userImg}
          />
        )}
        getKey={(d, i) => `${d.title}-${i}`}
      />
    </div>
  );
}
