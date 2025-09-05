'use client'; // TODO: check if it should be a client component
import { useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      <section className="scroller w-full">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top Perfoming</h2>
          <Link className="text-sm text-white/70 hover:text-white" href="/#">
            See all
          </Link>
        </div>
        <div className="row article-container h-[327px]">
          {/* Card 1 */}
          <CardTopPerforming
            chartImg="home/top-performing/graph1.svg"
            risk={5}
            roi={51.25}
            timeFrame="6 Months"
            userImg="face-female.png"
          />
          {/* Card 2 */}
          <CardTopPerforming
            chartImg="home/top-performing/graph1.svg"
            risk={5}
            roi={51.25}
            timeFrame="6 Months"
            userImg="face-female2.png"
          />
          {/* Card 3 */}
          <CardTopPerforming
            chartImg="home/top-performing/graph3.svg"
            risk={5}
            roi={51.25}
            timeFrame="6 Months"
            userImg="face-male.png"
          />
          {/* Card 4 */}
          <CardTopPerforming
            chartImg="home/top-performing/graph1.svg"
            risk={5}
            roi={51.25}
            timeFrame="6 Months"
            userImg="face-male2.png"
          />
          {/* Card 5 */}
          <CardTopPerforming
            chartImg="home/top-performing/graph1.svg"
            risk={5}
            roi={51.25}
            timeFrame="6 Months"
            userImg="face-female.png"
          />
          {/* Card 6 */}
          <CardTopPerforming
            chartImg="home/top-performing/graph1.svg"
            risk={5}
            roi={51.25}
            timeFrame="6 Months"
            userImg="face-female2.png"
          />
        </div>
      </section>

      {/* News */}
      <section className="scroller w-full">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">News</h2>
          <Link className="text-sm text-white/70 hover:text-white" href="/#">
            See all
          </Link>
        </div>
        {/* <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"> */}
        <div className="row article-container h-[393px]">
          {/* News card 1 */}
          <CardNews
            date="10 May"
            img="bitcoin.png"
            text="Bitcoin’s price surges as institutional investors start buying more"
            title="The Future of Bitcoing: Will it Reach"
            userImg="face-male-spectacles.svg"
          />
          {/* News card 2 */}
          <CardNews
            date="10 May"
            img="key-transparent.png"
            text="Bitcoin’s price surges as institutional investors start buying more"
            title="The Future of Bitcoing: Will it Reach"
            userImg="male-yellow-face-bg-blue.svg"
          />
          {/* News card 3 */}
          <CardNews
            date="10 May"
            img="rings-vertical.jpg"
            text="Bitcoin’s price surges as institutional investors start buying more"
            title="The Future of Bitcoing: Will it Reach"
            userImg="face-male-all-orange.svg"
          />
          {/* News card 4 */}
          <CardNews
            date="10 May"
            img="monedas.png"
            text="Bitcoin’s price surges as institutional investors start buying more"
            title="The Future of Bitcoing: Will it Reach"
            userImg="face-female-rosy-darkhair.svg"
          />
          {/* News card 5 */}
          <CardNews
            date="10 May"
            img="bitcoin.png"
            text="Bitcoin’s price surges as institutional investors start buying more"
            title="The Future of Bitcoing: Will it Reach"
            userImg="face-male-spectacles.svg"
          />
        </div>
      </section>
    </div>
  );
}
