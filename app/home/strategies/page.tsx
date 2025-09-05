'use client'; // TODO: check if it should be a client component
import { useAdjustArticleWidth } from '@/hooks/useAdjustArticleWidth';
import Image from 'next/image';
import HomeSections from '@/app/home/homeSections';
import HomeStrategiesGraph from '@/mockData/graphs/home-strategies';
import DropdownPill from '@/components/dateDropDown';
import SectionHeader from '@/components/sectionsWrapper/sectionHeader';
import '@/app/home/style.css';

export default function Home() {
  useAdjustArticleWidth();

  return (
    <>
      <section className="flex w-full py-5 lg:p-[80px] lg:pb-[90px] gap-11 flex-wrap xl:flex-nowrap">
        <div className="flex flex-col max-w-[452px] gap-2.5">
          <h3 className="text-2xl font-medium">Total Balance</h3>
          <h1 className="text-5xl font-medium">$ 1000.00</h1>
          <p className='color-secondary opacity-50 leading-normal'>
            Google's free service allows you to instantly translate words, phrases, and web pages.
            It supports over 100 languages.
          </p>
        </div>
        <div className="h-[246px] w-[590px] max-w-[100%] xl:p-[20px]">
          <div className="jus flex justify-between">
            <div className="flex gap-2.5">
              <span className="font-semibold">Graph</span>
              <span className="flex gap-1 text-blue-600">
                <Image
                  src="/assets/images/icons/arrows/arrow_up_blue.svg"
                  alt="Up"
                  height={7}
                  width={7}
                />
                <span>$ 32 (1.23%)</span>
              </span>
            </div>
            <div>
              <DropdownPill
                items={[
                  { label: '1 Week', value: '1week' },
                  { label: '1 Month', value: '1month' },
                  { label: '6 Months', value: '6month' },
                  { label: '1 Year', value: '1year' },
                  { label: '2 Years', value: '2years' },
                  { label: '3 Years', value: '3years' },
                ]}
                onSelect={(item) => console.log('selected:', item)}
              />
            </div>
          </div>
          <HomeStrategiesGraph />
        </div>
      </section>
      {/* <SectionHeader title="My Strategies" seeAllHref='#' /> */}
      <HomeSections />
    </>
  );
}
