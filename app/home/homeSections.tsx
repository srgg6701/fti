import DataMyStrategies from '@/mockData/dataMyStrategies';
import DataTopPerforming from '@/mockData/dataTopPerforming';
import DataNews from '@/mockData/dataNews';
import { SectionData } from '@/components/sectionsWrapper/sectionData';
import CardMyStrategies from '@/components/cards/my-strategies';
import CardTopPerforming from '@/components/cards/top-performing';
import CardNews from '@/components/cards/news';

export default function HomeSections() {
  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      <SectionData
        getKey={(d, i) => `${d.username}-${i}`}
        data={DataMyStrategies}
        title="My Strategies"
        renderItem={(d, i) => (
          <CardMyStrategies
          username={d.username}
          userImg={d.userImg}
          invested={d.invested}
          proRata={d.proRata}
          direction={d.direction}
          dynamics={d.dynamics}
          key={i}
          />
        )}
        />
      {/* Top Performing */}
      <SectionData
        data={DataTopPerforming}
        getKey={(d, i) => `${d.timeFrame}-${i}`}
        height={327}
        renderItem={(d, i) => (
          <CardTopPerforming
            key={i}
            chartImg={d.chartImg}
            risk={d.risk}
            roi={d.roi}
            timeFrame={d.timeFrame}
            userImg={d.userImg}
          />
        )}
        rowClassName=""
        seeAllHref="/top"
        title="Top Performing"
      />
      {/* News */}
      <SectionData
        data={DataNews}
        getKey={(d, i) => `${d.title}-${i}`}
        height={393}
        renderItem={(d, i) => (
          <CardNews
            key={i}
            date={d.date}
            img={d.img}
            text={d.text}
            title={d.title}
            userImg={d.userImg}
          />
        )}
        rowClassName=""
        seeAllHref="/top"
        title="DataNews"
      />
    </div>
  );
}
