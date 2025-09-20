"use client";
import DataMyStrategies from "@/mockData/dataMyStrategies";
import DataTopPerforming from "@/mockData/dataTopPerforming";
import DataNews from "@/mockData/dataNews";
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import { useAdjustArticleWidth } from "@/hooks/useAdjustArticleWidth";
import CardMyStrategies from "@/components/cards/my-strategies";
import CardShared from "@/components/cards/card-shared";
import CardNews from "@/components/cards/news";
import { clampText } from "@/lib/utils";
import "@/styles/style-sections.css";

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

export default function HomeSections({ section }: { section: string }) {
  useAdjustArticleWidth();

  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      {section === "home/strategies" && (
        <SectionData
          data={DataMyStrategies}
          getKey={(d, i) => `${d.username}-${i}`}
          height={95}
          renderItem={(d, i) => (
            <CardMyStrategies
              key={i}
              data={d.data}
              direction={d.direction}
              invested={d.invested}
              proRata={d.proRata}
              userImg={d.userImg}
              username={d.username}
            />
          )}
          title="My Strategies"
        />
      )}
      {(section === "home" || section === "home/strategies") && (
        <SectionData
          data={DataTopPerforming}
          getKey={(d, i) => `${d.timeFrame}-${i}`}
          height={310}
          renderItem={(d, i) => (
            <CardShared
              key={i}
              chartImg={d.chartImg}
              risk={d.risk}
              roi={d.roi}
              timeFrame={d.timeFrame}
              userImg={d.userImg}
              username={d.username}
            />
          )}
          seeAllHref="/top"
          title="Top Performing"
        />
      )}
      {(section === "home" || section === "home/strategies") && (
        <SectionData
          data={DataNews}
          getKey={(d, i) => `${d.title}-${i}`}
          height={378}
          renderItem={(d, i) => (
            <CardNews
              key={i}
              date={d.date}
              img={d.img}
              text={clampText(d.text)}
              title={d.title}
              userImg={d.userImg}
              username={d.username}
            />
          )}
          seeAllHref="/top"
          title="DataNews"
        />
      )}
      {section === "strategies" && (
        <>
          <SectionData
            data={DataWorldLeaders}
            getKey={(d, i) => `${d.timeFrame}-${i}`}
            height={310}
            renderItem={(d, i) => (
              <CardShared
                key={i}
                chartImg={d.chartImg}
                risk={d.risk}
                roi={d.roi}
                timeFrame={d.timeFrame}
                userImg={d.userImg}
                username={d.username}
              />
            )}
            seeAllHref="/top"
            title="World leaders"
          />
          <SectionData
            data={DataTheBestOfTheDay}
            getKey={(d, i) => `${d.timeFrame}-${i}`}
            height={310}
            renderItem={(d, i) => (
              <CardShared
                key={i}
                chartImg={d.chartImg}
                risk={d.risk}
                roi={d.roi}
                timeFrame={d.timeFrame}
                userImg={d.userImg}
                username={d.username}
              />
            )}
            seeAllHref="/top"
            title="The best of the day"
          />
          <SectionData
            data={DataTheBestOfTheWeek}
            getKey={(d, i) => `${d.timeFrame}-${i}`}
            height={310}
            renderItem={(d, i) => (
              <CardShared
                key={i}
                chartImg={d.chartImg}
                risk={d.risk}
                roi={d.roi}
                timeFrame={d.timeFrame}
                userImg={d.userImg}
                username={d.username}
              />
            )}
            seeAllHref="/top"
            title="The best of the week"
          />
          <SectionData
            data={DataTheBestOfTheMonth}
            getKey={(d, i) => `${d.timeFrame}-${i}`}
            height={310}
            renderItem={(d, i) => (
              <CardShared
                key={i}
                chartImg={d.chartImg}
                risk={d.risk}
                roi={d.roi}
                timeFrame={d.timeFrame}
                userImg={d.userImg}
                username={d.username}
              />
            )}
            seeAllHref="/top"
            title="The best of the month"
          />
        </>
      )}
    </div>
  );
}
