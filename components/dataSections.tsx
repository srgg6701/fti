"use client";
import type { status } from "@/types/ui";
import type {
  ChartData,
  Strategy,
  TDataTopPerforming,
  TDataNews,
  TDataWorldLeaders,
  TDataTheBestOfTheDay,
  TDataTheBestOfTheWeek,
  TDataTheBestOfTheMonth,
  TradeSystems,
  UserSubscription,
} from "@/types/apiData";

import { useEffect, useState } from "react";

import { routeAliases /* , routeAliasesSecond */ } from "@/config/site";

//import DataNews from "@/mockData/dataNews";
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import TotalBalance from "@/components/total-balance";
import { useAdjustArticleWidth } from "@/hooks/useAdjustArticleWidth";
import CardMyStrategies from "@/components/cards/my-strategies";
import CardShared from "@/components/cards/card-shared";
import CardNews from "@/components/cards/news";
import { clampText } from "@/lib/utils";
// FIXME: remove apiFetch as data is real
import { apiFetch, apiFetch2 } from "@/lib/api";
import "@/styles/style-sections.css";

export default function HomeSections({ section }: { section: string }) {
  useAdjustArticleWidth();
  const [status, setStatus] = useState<status>("idle");
  //const [strategiesData, setStategiesData] = useState<TDataStrategies[]>([]);
  const [userSubscriptionsData, setUserSubscriptionsData] = useState<
    UserSubscription[]
  >([]);
  const [allStrategies, setAllStrategies] = useState<TradeSystems[] | []>();
  const [chart, setChart] = useState<ChartData>({});
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

        if (
          section === routeAliases.home
          //|| section === routeAliasesSecond.homeStrategies
        ) {
          const [
            userSubscriptionsData,
            tradeSystems,
            charts,
            dataPerforming,
            dataNews,
          ] = await Promise.all([
            // TODO: Define API routes as constants
            apiFetch<UserSubscription[]>(
              "/api/subscriptions/user-subscriptions",
            ),
            apiFetch<TradeSystems[]>("/api/trade-systems"), // INFO: do we need this?:
            apiFetch<ChartData>("/api/balance/equity/chart"),
            // MOCK DATA:// FIXME: use real data (apiFetch)
            apiFetch2<TDataTopPerforming[]>("dataTopPerforming"),
            apiFetch2<TDataNews[]>("dataNews"),
          ]);

          setUserSubscriptionsData(userSubscriptionsData);
          setAllStrategies(tradeSystems);
          setChart(charts);
          setTopPerformingData(dataPerforming);
          setNewsData(dataNews);
        } else if (section === routeAliases.strategies) {
          // /strategies

          const [
            dataWorldLeaders,
            dataTheBestOfTheDay,
            dataTheBestOfTheWeek,
            dataTheBestOfTheMonth,
          ] = await Promise.all([
            // INFO: World leaders = Strategy
            apiFetch2<TDataWorldLeaders[]>("dataTopPerforming"),
            apiFetch2<TDataTheBestOfTheDay[]>("dataTopPerforming"),
            apiFetch2<TDataTheBestOfTheWeek[]>("dataTopPerforming"),
            apiFetch2<TDataTheBestOfTheMonth[]>("dataTopPerforming"),
          ]);

          setWorldLeadersData(dataWorldLeaders);
          setTheBestOfTheDayData(dataTheBestOfTheDay);
          setTheBestOfTheWeekData(dataTheBestOfTheWeek);
          setTheBestOfTheMonthData(dataTheBestOfTheMonth);
        }
        setStatus("success");
      } catch (e) {
        setStatus("error");
      } finally {
        //setTimeout(() => setStatus("idle"), 1000);
      }
    })();
  }, []);

  {
    /* <h1>{chart?.data.currentBalance}</h1> */
  }

  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      {section === routeAliases.home && <TotalBalance chart={chart} />}
      {
        // home, // home/strategies
        section === routeAliases.home && (
          //|| section === routeAliasesSecond.homeStrategies
          <>
            {userSubscriptionsData.length > 0 && (
              <SectionData<UserSubscription>
                data={userSubscriptionsData} // My Strategies
                getKey={(d, i) => `${d.strategyName}-${i}`}
                height={95}
                renderItem={(d, i) => (
                  <CardMyStrategies
                    key={i}
                    changeDynamics={[0, 0]}
                    direction={"?"}
                    invested={d.amount}
                    proRata={"?"}
                    userImg={"?"}
                    username={d.strategyName}
                  />
                )}
                title="My Strategies"
              />
            )}
            <SectionData
              // FIXME: substitute with real data!
              // /api/statistics/universal-equity?systemId=<TradeSystems.id>&star
              data={topPerformingData as TDataTopPerforming[]} // Top Performing
              getKey={(d, i) => `${d.timeFrame}-${i}`}
              height={310}
              renderItem={(d, i) => (
                <CardShared
                  key={i}
                  chartImg={d.chartImg || ""}
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
              // FIXME: substitute with real data!
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
              title="Data News"
            />
          </>
        )
      }
      {
        //strategies
        section === routeAliases.strategies && (
          <>
            <SectionData
              // FIXME: substitute with real data!
              data={worldLeadersData}
              getKey={(d, i) => `${d.timeFrame}-${i}`}
              height={310}
              renderItem={(d, i) => (
                <CardShared
                  key={i}
                  chartImg={d.chartImg || ""}
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
              // FIXME: substitute with real data!
              data={theBestOfTheDayData}
              getKey={(d, i) => `${d.timeFrame}-${i}`}
              height={310}
              renderItem={(d, i) => (
                <CardShared
                  key={i}
                  chartImg={d.chartImg || ""}
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
              // FIXME: substitute with real data!
              data={theBestOfTheWeekData}
              getKey={(d, i) => `${d.timeFrame}-${i}`}
              height={310}
              renderItem={(d, i) => (
                <CardShared
                  key={i}
                  chartImg={d.chartImg || ""}
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
              // FIXME: substitute with real data!
              data={theBestOfTheMonthData}
              getKey={(d, i) => `${d.timeFrame}-${i}`}
              height={310}
              renderItem={(d, i) => (
                <CardShared
                  key={i}
                  chartImg={d.chartImg || ""}
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
        )
      }
    </div>
  );
}
