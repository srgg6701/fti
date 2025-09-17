'use client';
import CardShared from '@/components/cards/card-shared';
import { SectionData } from '@/components/sectionsWrapper/sectionData';
import { useAdjustArticleWidth } from '@/hooks/useAdjustArticleWidth';
import allStrategies from '@/mockData/accounts';

// TODO: clarify is this all strategies or accounts
export default function AllStrategies() {
  useAdjustArticleWidth();

  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      <SectionData
        data={allStrategies}
        getKey={(d) => d.brokerImg}
        height={310}
        noHeader={true}
        renderItem={(d, i) => (
          <CardShared
            key={i}
            brokerCode={d.brokerCode}
            brokerImg={d.brokerImg}
            brokerName={d.brokerName}
            chartImg={d.chartImg}
            status={d.status}
          />
        )}
        // to cancel horizontal scroll, add 'flex-wrap':
        rowClassName="w-full gap-y-2.5"
        seeAllHref="/top"
      />
    </div>
  );
}
