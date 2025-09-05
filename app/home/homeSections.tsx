import DataTopPerforming from '@/mockData/dataTopPerforming';
import DataNews from '@/mockData/dataNews';
import { SectionData } from '@/components/sectionData';
import CardTopPerforming from '@/components/cards/top-performing';
import CardNews from '@/components/cards/news';

export default function HomeSections() {
  return (
    <>
      {/* Top Performing */}
      <SectionData
        data={DataTopPerforming}
        title="Top Performing"
        seeAllHref="/top"
        height={327}
        rowClassName=""
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
            key={i}
            date={d.date}
            img={d.img}
            text={d.text}
            title={d.title}
            userImg={d.userImg}
          />
        )}
        getKey={(d, i) => `${d.title}-${i}`}
      />
    </>
  );
}
