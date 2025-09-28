"use client"; // TODO: check if it should be a client component
import { useState, useEffect } from "react";
import Image from "next/image";
//import { useRouter } from "next/navigation";

import HomeSections from "@/components/dataSections";
import AddAccount from "@/components/pop-ups/add-account";
import AccountAdded from "@/components/pop-ups/account-added";
import { apiFetch } from "@/lib/api";
import {
  UserAccount,
  TradeSystems,
  UserSubscription,
  ChartData,
} from "@/types/apiData";

export default function Home() {
  //const router = useRouter();

  const [isAddAccountOpen, setAddAccount] = useState<boolean | null>(null);
  const [isAccountAddOpen, setAccountAddOpen] = useState<boolean | null>(null);
  const [addedData, setAddedData] = useState<{
    accountNumber: string;
    broker: string;
    platform?: string;
  } | null>(null);

  const [userAccounts, setUserAccounts] = useState<UserAccount[] | null>(null);
  const [allStrategies, setAllStrategies] = useState<TradeSystems[] | null>(
    null,
  );
  const [userSubscriptions, setUserSubscription] = useState<
    UserSubscription[] | null
  >(null);
  const [chart, setChart] = useState<ChartData[] | null>(null);

  function addAddAccount() {
    setAddAccount(true);
  }
  function closeAddAccount(
    accountNumber?: string,
    broker?: string,
    platform?: string,
  ) {
    setAddAccount(null);
    setAccountAddOpen(true);
    if (accountNumber && broker) {
      setAddedData({ accountNumber, broker, platform });
    }
  }
  function closeAccountAddedAndRedirect() {
    setAccountAddOpen(false);
    //router.push("/home/strategies");
  }

  useEffect(() => {
    (async () => {
      const [accounts, tradeSystems, subscriptions, charts] = await Promise.all(
        [
          apiFetch<UserAccount[]>("/api/trading-accounts/user-accounts"),
          apiFetch<TradeSystems[]>("/api/trade-systems"),
          apiFetch<UserSubscription[]>("/api/subscriptions/user-subscriptions"),
          apiFetch<ChartData[]>("/api/balance/equity/chart"),
        ],
      );

      console.log({ accounts, tradeSystems, subscriptions, charts });
      setUserAccounts(accounts);
      setAllStrategies(tradeSystems);
      setUserSubscription(userSubscriptions);
      setChart(charts);
    })();
  }, []);

  const AccountInfoBlock = ({
    userAccounts,
  }: {
    userAccounts: UserAccount[] | null;
  }) => {
    if (!userAccounts) return null;

    return (
      <>
        <h2 className="text-lg font-medium">
          You{" "}
          {userAccounts.length > 0
            ? `have ${userAccounts.length}`
            : "don't have any"}{" "}
          strategies at the moment.
        </h2>
        <div className="my-[10px]">
          Add your {userAccounts.length > 0 ? "next" : "first"} strategy
        </div>
      </>
    );
  };

  return (
    <>
      <section className="mx-auto py-[80px]">
        <div className="mx-auto flex w-full max-w-[370px] flex-col text-center">
          <AccountInfoBlock userAccounts={userAccounts} />
          <button className="text-center" onClick={addAddAccount}>
            <Image
              alt="Add your first strategy"
              className="mx-auto"
              height="45"
              src="/assets/images/cross/plus.svg"
              style={{ cursor: "pointer" }}
              width="45"
            />
          </button>
        </div>
      </section>
      <HomeSections section="home" />
      {(isAddAccountOpen && (
        <AddAccount
          onClose={closeAddAccount}
          onCloseModal={() => setAddAccount(false)}
        />
      )) ||
        null}
      {isAccountAddOpen && (
        <AccountAdded
          accountNumber={addedData?.accountNumber}
          broker={addedData?.broker}
          platform={addedData?.platform}
          onClick={closeAccountAddedAndRedirect}
          onClose={closeAccountAddedAndRedirect}
        />
      )}
    </>
  );
}
