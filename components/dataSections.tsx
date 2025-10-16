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

//import DataNews from "@/mockData/dataNews";
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import GraphAndBalance from "@/components/graph-and-balance";
import { useAdjustArticleWidth } from "@/hooks/useAdjustArticleWidth";
import CardMyStrategies from "@/components/cards/my-strategies";
import CardShared from "@/components/cards/card-shared";
import CardNews from "@/components/cards/news";
import { clampText, formatDate } from "@/lib/utils";
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
  const [tradeSystems, setTradeSystems] = useState<News[]>([]);
  const [newsData, setNewsData] = useState<News[]>([]);
  const [worldLeadersData, setWorldLeadersData] = useState<UniversalEquity[]>(
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
                `/api${innerItems.balance.equity.chart.href}`,
              ),
              // MOCK DATA:// FIXME: use real data (apiFetch)
              apiFetch2<TDataTopPerforming[]>("dataTopPerforming"),
              apiFetch<News[]>(`/api/${routeAliases.news}`),
            ]);

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
              `/api${siteConfig.innerItems.trade_systems.href}`,
            ),
            apiFetch2<TDataTheBestOfTheDay[]>("dataTopPerforming"),
            apiFetch2<TDataTheBestOfTheWeek[]>("dataTopPerforming"),
            apiFetch2<TDataTheBestOfTheMonth[]>("dataTopPerforming"),
          ]);

          if (!tradeSystems.length) {
            const promises = dataTradeSystems.map((ts) =>
              apiFetch<UniversalEquity>(
                `/api${innerItems.equity.href}?systemId=${ts.id}&start_from_first_trade=true`,
              ),
            );
            const results = await Promise.all(promises);
            const dwl: UniversalEquity[] = [];

            results.forEach((res) => dwl.push(res));
            setWorldLeadersData(dwl);
            console.log("dataWorldLeaders", dwl);
          }
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
  // FIXME: remove as test period is over
  /* useEffect(() => {
    console.log("dataSections", allStrategies);
  }, [allStrategies]); */

  {
    /* <h1>{chart?.data.currentBalance}</h1> */
  }

  return (
    <>
      {status !== "success" ? (
        <LoadingIndicator {...{ status }} />
      ) : (
        <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
          {section === routeAliases.home && (
            <GraphAndBalance chart={chart} wrapper={true} />
          )}
          {
            // home, // home/strategies
            section === routeAliases.home && userSubscriptions?.length && (
              <>
                <SectionData
                  data={userSubscriptions} // My Strategies
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
                  data={newsData as News[]} // Data News
                  getKey={(d, i) => `${d.title}-${i}`}
                  height={378}
                  renderItem={(d, i) => (
                    <CardNews
                      key={i}
                      author={d.author}
                      date={formatDate(d.timestamp)}
                      id={d.id}
                      imageBase64={d.imageBase64 || null}
                      img={d.img || null}
                      text={clampText(d.content)}
                      title={d.title}
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
                {worldLeadersData.length && (
                  <SectionData
                    // FIXME: substitute with real data!
                    data={worldLeadersData} // World leaders
                    getKey={(d, i) => `${d.entity_id}-${i}`}
                    height={310}
                    renderItem={(d, i) => (
                      <CardShared
                        key={i}
                        //chartImg={d.chartImg}
                        chart={d.daily_pnl_curve}
                        risk={d.performance.risk}
                        roi={d.performance.roi.percent}
                        timeFrame="6 Months"
                        userImg={/* d.userImg */ ""}
                        username={/* d.username */ "username"}
                      />
                    )}
                    seeAllHref="/top"
                    title="World leaders"
                  />
                )}
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
      )}
    </>
  );
}
