"use client"; // TODO: check if it should be a client component
import { useState, useEffect } from "react";
import Image from "next/image";
//import { useRouter } from "next/navigation";

import HomeSections from "@/components/dataSections";
import AddAccount from "@/components/pop-ups/add-account";
import AccountAdded from "@/components/pop-ups/account-added";
import { apiFetch } from "@/lib/api";
import { UserAccount, UserSubscription } from "@/types/apiData";
import { ButtonRoundedBlue } from "@/components/button-rounded";

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
  const [userSubscriptions, setUserSubscription] = useState<
    UserSubscription[] | []
  >([]);
  //const [chart, setChart] = useState<ChartData[] | null>(null);

  function addAddAccount() {
    setAddAccount(true);
  }
  function closeAddAccount(
    accountNumber?: string,
    broker?: string,
    platform?: string
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
      const [accounts, strategies] = await Promise.all([
        apiFetch<UserAccount[]>("/api/trading-accounts/user-accounts"),
        apiFetch<UserSubscription[]>("/api//subscriptions/user-subscriptions"),
      ]);

      setUserSubscription(strategies);
      setUserAccounts(accounts);
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
        <div className="flex flex-col items-center gap-5">
          {(!userAccounts.length && (
            <>
              <h1 className="leading-none">Connect Your Account</h1>
              <p>Start trading by connecting your first account</p>
              <ButtonRoundedBlue
                bgColor="bg-blue-second"
                btnText="Add account"
                padding="p-5"
                width="w-fit"
                onClick={addAddAccount}
              />{" "}
            </>
          )) ||
            null}
        </div>
        {userAccounts.length > 0 && (
          <div className="mt-4">
            <h5 className="font-base text-lg">
              You
              {userSubscriptions.length > 0
                ? ` have ${userSubscriptions.length} `
                : " don't have any "}
              strategies at the moment.
            </h5>
            <div className="my-[10px]">
              Add your {userSubscriptions.length > 0 ? "next" : "first"}{" "}
              strategy
            </div>
            <button className="text-center">
              <Image
                alt="Add your strategy"
                className="mx-auto"
                height="45"
                src="/assets/images/cross/plus.svg"
                style={{ cursor: "pointer" }}
                width="45"
              />
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <section className="mx-auto py-[80px]">
        <div className="mx-auto flex w-full max-w-[370px] flex-col text-center">
          <AccountInfoBlock userAccounts={userAccounts} />
        </div>
      </section>
      {/* allStrategies?.length && "My Strategies:"} {allStrategies?.length */}
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
