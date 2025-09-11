'use client';
import DataTopPerforming from '@/mockData/dataTopPerforming';
import DataNews from '@/mockData/dataNews';
import { SectionData } from '@/components/sectionsWrapper/sectionData';
import '@/styles/style-sections.css';
import CardNews from '@/components/cards/news';

//TODO: temporal solution, DataTopPerforming should be changed to real data obtained from server
const DataWorldLeaders = [...DataTopPerforming];
const DataTheBestOfTheDay = [...DataTopPerforming];
const DataTheBestOfTheWeek = [...DataTopPerforming];
const DataTheBestOfTheMonth = [...DataTopPerforming];

export function filterData(message: string) {
  console.log(`${message}, DATA`, {
    DataWorldLeaders,
    DataTheBestOfTheDay,
    DataTheBestOfTheWeek,
    DataTheBestOfTheMonth,
  });
}

export default function DataSectionNews() {
  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      <SectionData
        data={DataNews}
        getKey={(d, i) => `${d.title}-${i}`}
        noHeader={true}
        renderItem={(d, i) => (
          <CardNews
            key={i}
            date={d.date}
            img={d.img}
            text={d.text}
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
