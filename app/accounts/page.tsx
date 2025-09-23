"use client";
import type { UserAccounts } from "@/types/auth";

import { useEffect } from "react";

import CardShared from "@/components/cards/card-shared";
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import { useAdjustArticleWidth } from "@/hooks/useAdjustArticleWidth";
import { apiFetch } from "@/lib/api";
import allStrategies from "@/mockData/accounts";

// TODO: clarify is this all strategies or accounts
export default function AllStrategies() {
  useAdjustArticleWidth();

  useEffect(() => {
    (async () => {
      const accounts: UserAccounts[] = await apiFetch(
        "/api/trading-accounts/user-accounts",
      );

      console.log("accounts", accounts);
    })();
  }, []);

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
        rowClassName="w-full gap-y-2.5 flex"
        seeAllHref="/top"
      />
    </div>
  );
}
