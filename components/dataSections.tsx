"use client";
import type { status } from "@/types/ui";
import type {
  TDataStrategies,
  TDataTopPerforming,
  TDataNews,
  TDataWorldLeaders,
  TDataTheBestOfTheDay,
  TDataTheBestOfTheWeek,
  TDataTheBestOfTheMonth,
} from "@/types/apiData";

import { useEffect, useState } from "react";

//import DataNews from "@/mockData/dataNews";
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import { useAdjustArticleWidth } from "@/hooks/useAdjustArticleWidth";
import CardMyStrategies from "@/components/cards/my-strategies";
import CardShared from "@/components/cards/card-shared";
import CardNews from "@/components/cards/news";
import { clampText } from "@/lib/utils";
import { apiFetch2 } from "@/lib/api";
import "@/styles/style-sections.css";

//TODO: temporal solution, DataTopPerforming should be changed to real data obtained from server
/* const DataWorldLeaders = [...DataTopPerforming];
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
} */

export default function HomeSections({ section }: { section: string }) {
  useAdjustArticleWidth();
  const [status, setStatus] = useState<status>("idle");
  const [strategiesData, setStategiesData] = useState<TDataStrategies[]>([]);
  const [topPerformingData, setTopPerformingData] = useState<
    TDataTopPerforming[]
  >([]);
  const [newsData, setNewsData] = useState<TDataNews[]>([]);
  const [worldLeadersData, setWorldLeadersData] = useState<TDataWorldLeaders[]>(
    [],
  );
  const [theBestOfTheDayData, setTheBestOfTheDayData] = useState<
    TDataTheBestOfTheDay[]
  >([]);
  const [theBestOfTheWeekData, setTheBestOfTheWeekData] = useState<
    TDataTheBestOfTheWeek[]
  >([]);
  const [theBestOfTheMonthData, setTheBestOfTheMonthData] = useState<
    TDataTheBestOfTheMonth[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");

        if (section === "home" || section === "home/strategies") {
          const dataPerforming =
            await apiFetch2<TDataTopPerforming[]>("dataTopPerforming");

          setTopPerformingData(dataPerforming);
          const dataNews = await apiFetch2<TDataNews[]>("dataNews");

          setNewsData(dataNews);
        }
        if (section === "home/strategies") {
          const dataMyStrategies =
            await apiFetch2<TDataStrategies[]>("dataMyStrategies");

          setStategiesData(dataMyStrategies);
        } else if (section === "strategies") {
          const dataWorldLeaders =
            await apiFetch2<TDataWorldLeaders[]>("dataTopPerforming");

          setWorldLeadersData(dataWorldLeaders);

          const dataTheBestOfTheDay =
            await apiFetch2<TDataTheBestOfTheDay[]>("dataTopPerforming");

          setTheBestOfTheDayData(dataTheBestOfTheDay);

          const dataTheBestOfTheWeek =
            await apiFetch2<TDataTheBestOfTheWeek[]>("dataTopPerforming");

          setTheBestOfTheWeekData(dataTheBestOfTheWeek);

          const dataTheBestOfTheMonth =
            await apiFetch2<TDataTheBestOfTheMonth[]>("dataTopPerforming");

          setTheBestOfTheMonthData(dataTheBestOfTheMonth);
        }
        /*await apiFetch(query, {
          method: "POST",
          body: JSON.stringify({ data }),
        }); */
        setStatus("success");
      } catch (e) {
        setStatus("error");
      } finally {
        //setTimeout(() => setStatus("idle"), 1000);
      }
    })();
  }, [section]);

  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      {section === "home/strategies" && (
        <SectionData
          data={strategiesData as TDataStrategies[]} // My Strategies
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
        <>
          <SectionData
            data={topPerformingData as TDataTopPerforming[]} // Top Performing
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
          <SectionData
            data={newsData as TDataNews[]} // Data News
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
        </>
      )}
      {section === "strategies" && (
        <>
          <SectionData
            data={worldLeadersData}
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
            data={theBestOfTheDayData}
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
            data={theBestOfTheWeekData}
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
            data={theBestOfTheMonthData}
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
