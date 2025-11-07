"use client";
import type { status } from "@/types/ui";
import type {
  ChartData,
  Strategy,
  TDataTopPerforming,
  News,
  TDataTheBestOfTheDay,
  TDataTheBestOfTheWeek,
  TDataTheBestOfTheMonth,
  UserSubscription,
  TradeSystems,
  UniversalEquity,
} from "@/types/apiData";

import { useEffect, useState } from "react";

import { routeAliases, siteConfig } from "@/config/site";
import userImages from "@/mockData/user-images.json";
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import GraphAndBalance from "@/components/graph-and-balance";
import { useAdjustArticleWidth } from "@/hooks/useAdjustArticleWidth";
import CardMyStrategy from "@/components/cards/my-strategy";
import CardShared from "@/components/cards/card-shared";
import CardNews from "@/components/cards/news";
import { clampText, formatDate, makeSlug } from "@/lib/utils";
import { apiFetch, apiFetch2 } from "@/lib/api";
import LoadingIndicator from "@/components/loading-indicator";
// FIXME: remove apiFetch as data is real
import "@/styles/style-sections.css";

export default function HomeSections({
  section,
  userSubscriptions,
  allStrategies,
}: {
  section: string;
  userSubscriptions?: UserSubscription[];
  allStrategies?: Strategy[];
}) {
  useAdjustArticleWidth();
  const [status, setStatus] = useState<status>("idle");
  const [chart, setChart] = useState<ChartData>({});
  const [topPerformingData, setTopPerformingData] = useState<
    TDataTopPerforming[]
  >([]);
  //const [tradeSystems, setTradeSystems] = useState<News[]>([]);
  const [newsData, setNewsData] = useState<News[]>([]);
  const [worldLeadersData, setWorldLeadersData] = useState<UniversalEquity[]>(
    []
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

  const innerItems = siteConfig.innerItems;

  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");

        if (section === routeAliases.home) {
          const [chartsApiData, topPerformingApiData, newsApiData] =
            await Promise.all([
              // TODO: Define API routes as constants
              apiFetch<ChartData>(
                `/api${innerItems.balance.equity.chart.href}`
              ),
              // MOCK DATA:// FIXME: use real data (apiFetch)
              apiFetch2<TDataTopPerforming[]>("dataTopPerforming"),
              apiFetch<News[]>(`/api/${routeAliases.news}`),
            ]);

          console.log("%cchartsApiData", "color: violet", chartsApiData);

          setChart(chartsApiData);
          setTopPerformingData(topPerformingApiData);
          setNewsData(newsApiData);
        } else if (section === routeAliases.strategies) {
          const [
            dataTradeSystems,
            dataTheBestOfTheDay,
            dataTheBestOfTheWeek,
            dataTheBestOfTheMonth,
          ] = await Promise.all([
            // INFO: World leaders: universal-equity?systemId=[trade-systems.id]
            //apiFetch2<TDataWorldLeaders[]>("dataTopPerforming"),
            apiFetch<TradeSystems[]>(
              `/api${siteConfig.innerItems.trade_systems.href}`
            ),
            apiFetch2<TDataTheBestOfTheDay[]>("dataTopPerforming"),
            apiFetch2<TDataTheBestOfTheWeek[]>("dataTopPerforming"),
            apiFetch2<TDataTheBestOfTheMonth[]>("dataTopPerforming"),
          ]);

          //if (!tradeSystems.length) {
          const promises = dataTradeSystems.map((ts) =>
            apiFetch<UniversalEquity>(
              `/api${innerItems.equity.href}?systemId=${ts.id}&start_from_first_trade=true`
            )
          );
          const results = await Promise.all(promises);
          const dwl: UniversalEquity[] = [];

          results.forEach((res) => dwl.push(res));
          setWorldLeadersData(dwl);
          //console.log("dataWorldLeaders", dwl);
          //}
          setTheBestOfTheDayData(dataTheBestOfTheDay);
          setTheBestOfTheWeekData(dataTheBestOfTheWeek);
          setTheBestOfTheMonthData(dataTheBestOfTheMonth);
        }
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
      console.log("%cSTATUS", "color: green", status);
    })();
  }, []);

  /* useEffect(() => {
    console.groupCollapsed(
      "%cChecking data for dataSections",
      "color: lightblue",
    ); 
    console.log({
      homeData: {
        userSubscriptions,
        topPerformingData,
        newsData,
      },
      strategiesData: {
        worldLeadersData,
        theBestOfTheDayData,
        theBestOfTheWeekData,
        theBestOfTheMonthData,
      },
    }); 

    console.groupEnd();
  }, [
    userSubscriptions,
    topPerformingData,
    newsData,
    worldLeadersData,
    theBestOfTheDayData,
    theBestOfTheWeekData,
    theBestOfTheMonthData,
  ]); */

  return (
    <>
      {status === "loading" ? (
        <LoadingIndicator {...{ status }} />
      ) : (
        <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
          {(section === routeAliases.home && (
            <GraphAndBalance chart={chart} wrapper={true} />
          )) ||
            null}
          {
            // home, // home/strategies
            (section === routeAliases.home && userSubscriptions?.length && (
              <>
                <SectionData
                  data={userSubscriptions} // My Strategies
                  getKey={(d, i) => `${d.strategyName}-${i}`}
                  height={95}
                  renderItem={(d, i) => (
                    // FIXME: Draft implementation, needs the real image
                    <CardMyStrategy
                      key={i}
                      changeDynamics={[0, 0]}
                      direction={"?"}
                      invested={d.amount}
                      proRata={"?"}
                      strategyId={d.strategyId}
                      strategyName={d.strategyName}
                      userImg={d.userImage || userImages[i].img}
                    />
                  )}
                  title="My Strategies"
                />
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
                      strategyId={d.strategyId}
                      strategyName={d.strategy}
                      strategyStoredName="top-performing" // Alex's Strategy
                      timeFrame={d.timeFrame}
                      userImg={d.userImg || userImages[i].img}
                      username={d.username || userImages[i].name}
                    />
                  )}
                  seeAllHref="/top"
                  title="Top Performing"
                />
                <SectionData
                  // FIXME: substitute with real data!
                  data={newsData as News[]} // Data News
                  getKey={(d, i) => `${d.title}-${i}`}
                  height={378}
                  renderItem={(d, i) => (
                    <CardNews
                      key={i}
                      author={d.author}
                      date={formatDate(d.timestamp)}
                      id={d.id}
                      imageBase64={d.imageBase64}
                      img={d.img}
                      slug={makeSlug(d.title)}
                      text={clampText(d.content)}
                      title={d.title}
                    />
                  )}
                  seeAllHref="/top"
                  title="News"
                />
              </>
            )) ||
              null
          }
          {
            //strategies
            (section === routeAliases.strategies && (
              <>
                {(worldLeadersData.length && (
                  <SectionData
                    // FIXME: substitute with real data!
                    data={worldLeadersData} // World leaders
                    getKey={(d, i) => `${d.entity_id}-${i}`}
                    height={310}
                    renderItem={(d, i) => (
                      <CardShared
                        chart={d.daily_pnl_curve}
                        risk={d.performance.risk}
                        roi={d.performance.roi.percent}
                        strategyStoredName="world-leaders"
                        timeFrame="6 Months"
                        userImg={d.userImg || userImages[i].img}
                        username={d.username || userImages[i].name}
                        key={i}
                        //strategyName={d.system_id}
                        strategyId={d.system_id}
                      />
                    )}
                    seeAllHref="/top"
                    title="World leaders"
                  />
                )) ||
                  null}
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
                      strategyId={d.strategyId}
                      strategyName={d.strategy}
                      strategyStoredName="the-best-of-the-day"
                      timeFrame={d.timeFrame}
                      userImg={d.userImg || userImages[i].img}
                      username={d.username || userImages[i].name}
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
                      strategyId={d.strategyId}
                      strategyName={d.strategy}
                      strategyStoredName="the-best-of-the-week"
                      timeFrame={d.timeFrame}
                      userImg={d.userImg || userImages[i].img}
                      username={d.username || userImages[i].name}
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
                      strategyId={d.strategyId}
                      strategyName={d.strategy}
                      strategyStoredName="the-best-of-the-month"
                      timeFrame={d.timeFrame}
                      userImg={d.userImg || userImages[i].img}
                      username={d.username || userImages[i].name}
                    />
                  )}
                  seeAllHref="/top"
                  title="The best of the month"
                />
              </>
            )) ||
              null
          }
        </div>
      )}
    </>
  );
}
