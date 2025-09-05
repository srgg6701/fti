'use client'; // TODO: check if it should be a client component
import { useAdjustArticleWidth } from "@/hooks/useAdjustArticleWidth";
import '@/app/home/style.css';
import HomeSections from "@/app/home/homeSections";

export default function Home() {

  useAdjustArticleWidth();

  return (
    <div className="mt-[80px] mb-[56px] flex min-h-screen flex-col gap-[5rem] text-white">
      {/* Empty state / CTA */}
      <section className="mx-auto py-[80px]">
        
      </section>
      <HomeSections />
    </div>
  );
}
