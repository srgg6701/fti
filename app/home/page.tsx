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
    <div className="mb-[56px] mt-[80px] flex min-h-screen flex-col gap-[5rem] text-white">
      {/* Empty state / CTA */}
      <section className="mx-auto py-[80px]">
        <div className="mx-auto flex w-full max-w-[370px] flex-col text-center">
          <h2 className="text-lg font-medium">You don't have any strategies at the moment</h2>
          <div className="my-[10px]">Add your first strategy</div>
          <button className="text-center" onClick={addStrategy}>
            <Image
              className="mx-auto"
              src="/assets/images/cross/plus.svg"
              alt="Add your first strategy"
              height="45"
              width="45"
            />
          </button>
        </div>
      </section>

      {/* Top Performing */}
      <section className="w-full scroller">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top Perfoming</h2>
          <Link className="text-sm text-white/70 hover:text-white" href="/#">
            See all
          </Link>
        </div>
        <div className="row article-container h-[327px]">
          {/* Card 1 */}
          <CardTopPerforming
            userImg="face-female.png"
            timeFrame="6 Months"
            chartImg="home/top-performing/graph1.svg"
            roi={51.25}
            risk={5}
          />
          {/* Card 2 */}
          <CardTopPerforming
            userImg="face-female2.png"
            timeFrame="6 Months"
            chartImg="home/top-performing/graph1.svg"
            roi={51.25}
            risk={5}
          />
          {/* Card 3 */}
          <CardTopPerforming
            userImg="face-male.png"
            timeFrame="6 Months"
            chartImg="home/top-performing/graph3.svg"
            roi={51.25}
            risk={5}
          />
          {/* Card 4 */}
          <CardTopPerforming
            userImg="face-male2.png"
            timeFrame="6 Months"
            chartImg="home/top-performing/graph1.svg"
            roi={51.25}
            risk={5}
          />
          {/* Card 5 */}
          <CardTopPerforming
            userImg="face-female.png"
            timeFrame="6 Months"
            chartImg="home/top-performing/graph1.svg"
            roi={51.25}
            risk={5}
          />
          {/* Card 6 */}
          <CardTopPerforming
            userImg="face-female2.png"
            timeFrame="6 Months"
            chartImg="home/top-performing/graph1.svg"
            roi={51.25}
            risk={5}
          />
        </div>
      </section>

      {/* News */}
      <section className="w-full scroller">
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
            userImg="face-male-spectacles.svg"
            date="10 May"
            img="bitcoin.png"
            title="The Future of Bitcoing: Will it Reach"
            text="Bitcoin’s price surges as institutional investors start buying more"
          />
          {/* News card 2 */}
          <CardNews
            userImg="male-yellow-face-bg-blue.svg"
            date="10 May"
            img="key-transparent.png"
            title="The Future of Bitcoing: Will it Reach"
            text="Bitcoin’s price surges as institutional investors start buying more"
          />
          {/* News card 3 */}
          <CardNews
            userImg="face-male-all-orange.svg"
            date="10 May"
            img="rings-vertical.jpg"
            title="The Future of Bitcoing: Will it Reach"
            text="Bitcoin’s price surges as institutional investors start buying more"
          />
          {/* News card 4 */}
          <CardNews
            userImg="face-female-rosy-darkhair.svg"
            date="10 May"
            img="monedas.png"
            title="The Future of Bitcoing: Will it Reach"
            text="Bitcoin’s price surges as institutional investors start buying more"
          />
          {/* News card 5 */}
          <CardNews
            userImg="face-male-spectacles.svg"
            date="10 May"
            img="bitcoin.png"
            title="The Future of Bitcoing: Will it Reach"
            text="Bitcoin’s price surges as institutional investors start buying more"
          />
        </div>
      </section>
    </div>
  );
}
