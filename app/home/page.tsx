'use client'; // TODO: check if it should be a client component
import Image from 'next/image';
import { useAdjustArticleWidth } from '@/hooks/useAdjustArticleWidth';
import '@/app/home/style.css';
import HomeSections from "@/app/home/homeSections";

export default function Home() {
  function addStrategy() {
    if (window) {
      window.alert('Add Strategy');
    } else {
      console.log('Add Strategy');
    }
  }

  useAdjustArticleWidth();

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
      <HomeSections />
    </div>
  );
}
