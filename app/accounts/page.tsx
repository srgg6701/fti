"use client";

import { useEffect, useState } from "react";

import CardShared from "@/components/cards/card-shared";
import { SectionData } from "@/components/sectionsWrapper/sectionData";
import { useAdjustArticleWidth } from "@/hooks/useAdjustArticleWidth";
// FIXME: remove it as real data is accessible
import allStrategies, { type MockAccounts } from "@/mockData/accounts";

// TODO: clarify is this all strategies or accounts
export default function AllStrategies() {
  useAdjustArticleWidth();

  const [accounts_data, setAccountsData] = useState<MockAccounts[]>([]);

  useEffect(() => {
    /* if (false) {
      (async () => {
        const accounts: UserAccounts[] = await apiFetch(
          "/api/trading-accounts/user-accounts",
        );
        
        console.log("accounts", accounts);
        setAccountsData(accounts);
      })();
      
    } else { */
    setAccountsData(allStrategies);
    //};
  }, []);

  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      <SectionData
        data={accounts_data as MockAccounts[]}
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
